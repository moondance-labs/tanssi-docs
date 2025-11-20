#!/usr/bin/env python3
"""End-to-end orchestration for Rose's translation workflow."""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import shlex
import sys
import time
import subprocess
import tempfile
import shutil
from pathlib import Path
from typing import Any, Iterable, Set
from urllib import request

CURRENT_DIR = Path(__file__).resolve().parent
ROOT = CURRENT_DIR.parent
sys.path.append(str(CURRENT_DIR))
try:
    from collect_diff_sets import _run_git_diff, _collect_sets  # type: ignore
except Exception as exc:  # pragma: no cover
    raise RuntimeError("Unable to import collect_diff_sets helper") from exc

from paths import REPO_ROOT, repo_path, repo_relative, repo_relative_str

TRANSLATION_STAGE = ROOT / "translations"
PAYLOAD_PATH = TRANSLATION_STAGE / "payload.json"
CHANGES_PATH = TRANSLATION_STAGE / "changed_segments.json"
ALLOWED_EXTENSIONS = {".md", ".markdown", ".mkd", ".html", ".jinja", ".jinja2", ".j2", ".tpl", ".yml", ".yaml"}
TAGGER_PATH = CURRENT_DIR / "tagger.js"
LOCALE_SYNC = CURRENT_DIR / "locale_sync.py"
LOCALE_REPORT = TRANSLATION_STAGE / "locale_report.json"
COVERAGE_REPORT = TRANSLATION_STAGE / "summary_report.json"
VALIDATION_REPORT = TRANSLATION_STAGE / "validation_report.json"


def _read_lines(path: Path) -> list[str]:
    return path.read_text(encoding="utf-8").splitlines()


def _slice_block(lines: list[str], start: int, end: int) -> str:
    start_idx = max(start - 1, 0)
    end_idx = min(end, len(lines))
    block = lines[start_idx:end_idx]
    return "\n".join(block).rstrip() + "\n"


def _is_allowed_file(rel_path: str) -> bool:
    return Path(rel_path).suffix.lower() in ALLOWED_EXTENSIONS


def _is_code_only(block: str) -> bool:
    lines = block.splitlines()
    meaningful = []
    in_fence = False
    for raw_line in lines:
        stripped = raw_line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if stripped == "":
            continue
        if raw_line.startswith("    ") or raw_line.startswith("\t"):
            continue
        meaningful.append(stripped)
    text = " ".join(meaningful)
    alpha_chars = sum(ch.isalpha() for ch in text)
    return alpha_chars == 0


def _resolve_target_path(entry: dict[str, Any]) -> Path | None:
    lang = entry.get("target_language")
    source_path = entry.get("source_path")
    if not lang or not source_path:
        return None
    target_path = entry.get("target_path") or _derive_target_path(source_path, lang)
    try:
        return repo_relative(target_path)
    except ValueError:
        return Path(target_path)


def _collect_target_files(translations: Any) -> list[Path]:
    files: list[Path] = []
    if isinstance(translations, dict) and "entries" in translations:
        iterable = translations["entries"]
    else:
        iterable = translations
    if not isinstance(iterable, list):
        return files
    for entry in iterable:
        if not isinstance(entry, dict):
            continue
        resolved = _resolve_target_path(entry)
        if resolved and resolved not in files:
            files.append(resolved)
    return files


def _normalize_path(path: str) -> str:
    """Return a repo-relative, posix-style path for comparison."""
    raw = path.strip()
    if not raw:
        return ""
    try:
        return repo_relative(raw).as_posix()
    except ValueError:
        return Path(raw).as_posix()


def _filter_diff_map(diff_map: dict[str, list[dict[str, Any]]], include: set[str]) -> dict[str, list[dict[str, Any]]]:
    if not include:
        return diff_map
    normalized_lookup: dict[str, str] = {}
    for rel_path in diff_map:
        normalized_lookup[_normalize_path(rel_path)] = rel_path
    filtered: dict[str, list[dict[str, Any]]] = {}
    for normalized, original in normalized_lookup.items():
        if normalized in include:
            filtered[original] = diff_map[original]
    missing = sorted(include - set(normalized_lookup.keys()))
    if missing:
        print("Requested file(s) not present in this diff:")
        for path in missing:
            print(f"  - {path}")
    return filtered


def _report_missing_translations(english_files: Set[str], languages: list[str]) -> dict[str, list[str]]:
    coverage: dict[str, list[str]] = {}
    if not english_files:
        return coverage
    print("Translation coverage report:")
    for lang in languages:
        missing: list[str] = []
        for rel_path in english_files:
            target = _derive_target_path(rel_path, lang)
            target_rel = repo_relative(target)
            if not (REPO_ROOT / target_rel).exists():
                missing.append(target_rel.as_posix())
        coverage[lang] = missing
        if not missing:
            print(f"  {lang}: OK")
        else:
            print(f"  {lang}: missing {len(missing)} file(s)")
            for path in missing[:10]:
                print(f"    - {path}")
            if len(missing) > 10:
                print("    ...")
    return coverage


def _report_locale_findings(report_path: Path) -> dict[str, Any]:
    if not report_path.exists():
        return {"added_per_locale": {}, "unused_keys": []}
    data = json.loads(report_path.read_text(encoding="utf-8"))
    added = data.get("added_per_locale", {})
    unused = data.get("unused_keys", [])
    if added:
        print("Locale key additions:")
        for locale, count in sorted(added.items()):
            print(f"  {locale}: {count} key(s)")
    if unused:
        print("Locale keys unused in templates:")
        for key in unused[:20]:
            print(f"  - {key}")
        if len(unused) > 20:
            print("  ...")
    return {"added_per_locale": added, "unused_keys": unused}


def _load_validation_findings(report_path: Path) -> dict[str, Any]:
    if not report_path.exists():
        return {"status": "unknown", "issues": []}
    return json.loads(report_path.read_text(encoding="utf-8"))


def _build_document_records(entries: list[dict[str, Any]]) -> list[dict[str, str]]:
    documents: list[dict[str, str]] = []
    seen_paths: set[str] = set()
    for entry in entries:
        if entry.get("kind") != "file":
            continue
        source_path = entry.get("source_path")
        if not source_path:
            continue
        normalized = repo_relative_str(source_path)
        if normalized in seen_paths:
            continue
        seen_paths.add(normalized)
        content = entry.get("content") or ""
        checksum = hashlib.sha256(content.encode("utf-8")).hexdigest()
        path_for_doc = Path(normalized)
        documents.append(
            {
                "path": path_for_doc.as_posix(),
                "language": entry.get("source_language", "EN").lower(),
                "checksum": checksum,
                "content": content,
            }
        )
    return documents


def _collect_target_languages(entries: list[dict[str, Any]]) -> list[str]:
    langs: set[str] = set()
    for entry in entries:
        for lang in entry.get("target_languages") or []:
            langs.add(str(lang).lower())
    return sorted(langs)


def _resolve_commit(ref: str) -> str:
    result = subprocess.run(
        ["git", "-C", str(REPO_ROOT), "rev-parse", ref],
        capture_output=True,
        text=True,
        check=False,
    )
    if result.returncode != 0:
        return ref
    return result.stdout.strip()


def _inject_full_file_entries(diff_map: dict[str, list[dict[str, Any]]], include_files: set[str]) -> None:
    for rel_path in include_files:
        if rel_path in diff_map:
            continue
        abs_path = repo_path(rel_path)
        if not abs_path.exists():
            print(f"Requested include file not found on disk: {rel_path}")
            continue
        lines = _read_lines(abs_path)
        entry = {
            "set_id": len(diff_map.get(rel_path, [])) + 1,
            "added": {"start": 1, "end": len(lines)},
        }
        diff_map.setdefault(rel_path, []).append(entry)
        print(f"Added full-file translation entry for {rel_path}")


def _post_json(url: str, payload: dict[str, Any]) -> dict[str, Any]:
    data = json.dumps(payload).encode("utf-8")
    req = request.Request(url, data=data, headers={"Content-Type": "application/json"})
    with request.urlopen(req) as resp:  # nosec B310
        body = resp.read().decode("utf-8")
    return json.loads(body)


def _as_bool(value: str) -> bool:
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _should_skip_path(rel_path: str, languages: list[str], skip_llms: bool, skip_ai: bool) -> bool:
    normalized = repo_relative_str(rel_path)
    lower = normalized.lower()
    if skip_llms and "llms" in lower:
        return True
    if skip_ai and "/.ai" in lower:
        return True
    parts = Path(normalized).parts
    if not _is_allowed_file(normalized):
        return True
    # Skip files already under a locale directory
    for lang in languages:
        if parts and parts[0] == lang:
            return True
    return False


def _run_tagger(text: str) -> str:
    if not TAGGER_PATH.exists():
        raise FileNotFoundError(f"Tagger script missing: {TAGGER_PATH}")
    with tempfile.NamedTemporaryFile("w", delete=False, encoding="utf-8") as src:
        src.write(text)
        src_path = src.name
    with tempfile.NamedTemporaryFile("r", delete=False, encoding="utf-8") as dst:
        dst_path = dst.name
    try:
        subprocess.run(
            ["node", str(TAGGER_PATH), src_path, dst_path],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        with open(dst_path, "r", encoding="utf-8") as handle:
            return handle.read()
    finally:
        Path(src_path).unlink(missing_ok=True)
        Path(dst_path).unlink(missing_ok=True)


def _derive_target_path(rel_path: str, language: str) -> str:
    try:
        path = repo_relative(rel_path)
    except ValueError:
        path = Path(rel_path)
    parts = list(path.parts)

    if parts and parts[0] == "locale":
        rest = parts[1:]
        if not rest:
            return str(Path("locale", f"{language}.yml"))
        filename = Path(rest[-1])
        new_name = f"{language}{filename.suffix or '.yml'}"
        return str(Path("locale", *rest[:-1], new_name))

    # Handle material-overrides/.translations/<lang>.json
    if ".translations" in parts:
        idx = parts.index(".translations")
        before = parts[: idx + 1]
        filename = parts[-1] if parts else ""
        stem, suffix = Path(filename).stem, Path(filename).suffix
        new_name = f"{language}{suffix or '.json'}"
        new_parts = before + parts[idx + 1 : -1] + [new_name]
        return str(Path(*new_parts))

    if parts and parts[0] == language:
        return str(path)
    if parts and parts[0] == "en":
        parts = parts[1:]
    return str(Path(language, *parts))

    return str(path)


def _build_payload_entries(
    diff_map: dict[str, list[dict[str, Any]]],
    languages: list[str],
    skip_llms: bool,
    skip_ai: bool,
) -> tuple[list[dict[str, Any]], Set[str]]:
    entries: list[dict[str, Any]] = []
    english_files: Set[str] = set()
    for rel_path, ranges in diff_map.items():
        normalized_path = repo_relative_str(rel_path)
        if _should_skip_path(normalized_path, languages, skip_llms, skip_ai):
            continue
        abs_path = repo_path(normalized_path)
        if not abs_path.exists():
            continue
        english_text = abs_path.read_text(encoding="utf-8")
        lines = _read_lines(abs_path)
        english_files.add(normalized_path)
        tagged_full = _run_tagger(english_text)
        file_entry = {
            "kind": "file",
            "source_path": normalized_path,
            "source_language": "EN",
            "target_languages": languages,
            "content": english_text,
            "content_original": english_text,
            "content_tagged": tagged_full,
            "range": {"start": 1, "end": len(lines)},
        }
        entries.append(file_entry)
        for entry in ranges:
            range_info = entry.get("added")
            if not range_info:
                continue
            block_text = _slice_block(lines, range_info["start"], range_info["end"])
            if _is_code_only(block_text):
                continue
            block_entry = {
                "kind": "block",
                "source_path": normalized_path,
                "source_language": "EN",
                "set_id": entry["set_id"],
                "range": range_info,
                "target_languages": languages,
                "content": block_text,
                "content_original": block_text,
                "content_tagged": _run_tagger(block_text),
            }
            entries.append(block_entry)
    return entries, english_files


def _poll_for_result(url: str, interval: int, timeout: int) -> dict[str, Any]:
    deadline = time.time() + timeout
    while True:
        with request.urlopen(url) as resp:  # nosec B310
            body = resp.read().decode("utf-8")
        data = json.loads(body)
        if data.get("ready"):
            return data
        if time.time() > deadline:
            raise TimeoutError("Timed out waiting for n8n response")
        time.sleep(interval)


def _run_cmd(cmd: list[str]) -> None:
    result = os.spawnvp(os.P_WAIT, cmd[0], cmd)
    if result != 0:
        raise SystemExit(result)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", required=True, help="Base git ref (e.g., origin/main)")
    parser.add_argument("--head", default="HEAD", help="Head ref to compare against base")
    parser.add_argument("--paths", nargs="*", default=["."], help="Paths to inspect")
    parser.add_argument("--languages", nargs="+", default=["es", "fr", "pt"], help="Target language codes")
    parser.add_argument("--n8n-webhook", required=True, help="n8n webhook URL that accepts English payloads")
    parser.add_argument("--filter-llms", default="true", help="Skip files whose path contains 'llms' (true/false)")
    parser.add_argument("--filter-ai-dir", default="true", help="Skip files under .ai directories (true/false)")
    parser.add_argument(
        "--include-files",
        nargs="*",
        default=[],
        help="Optional list of repo-relative files to translate (overrides diff results)",
    )
    parser.add_argument(
        "--include-full",
        action="store_true",
        help="When used with --include-files, translate the entire file even if no diff exists",
    )
    args = parser.parse_args()

    _reset_translation_stage()
    try:
        return _run_pipeline(args)
    finally:
        _cleanup_translation_stage()
        _cleanup_pycache()

def _reset_translation_stage() -> None:
    if TRANSLATION_STAGE.exists():
        shutil.rmtree(TRANSLATION_STAGE)
    TRANSLATION_STAGE.mkdir(parents=True, exist_ok=True)


def _cleanup_translation_stage() -> None:
    if TRANSLATION_STAGE.exists():
        shutil.rmtree(TRANSLATION_STAGE)


def _cleanup_pycache() -> None:
    for cache_dir in CURRENT_DIR.rglob("__pycache__"):
        try:
            shutil.rmtree(cache_dir)
        except OSError:
            pass


def _run_pipeline(args: argparse.Namespace) -> int:

    env_include_files = os.environ.get("ROSE_INCLUDE_FILES")
    if env_include_files and not args.include_files:
        args.include_files = [
            entry.strip()
            for chunk in env_include_files.splitlines()
            for entry in chunk.split(",")
            if entry.strip()
        ]

    include_files = {_normalize_path(path) for path in args.include_files if path.strip()}
    if include_files:
        print("Restricting translation to the following file(s):")
        for rel_path in sorted(include_files):
            print(f"  - {rel_path}")

    # Run locale sync before diff collection so locale keys stay in sync
    subprocess.run(
        ["python", str(LOCALE_SYNC), "--report", str(LOCALE_REPORT)],
        check=True,
    )

    diff_text = _run_git_diff(args.base, args.head, args.paths)
    diff_map = _collect_sets(diff_text)
    if include_files:
        diff_map = _filter_diff_map(diff_map, include_files)
        if args.include_full:
            _inject_full_file_entries(diff_map, include_files)
        if not diff_map:
            print("No diff entries matched include-files filter; exiting.")
            return 0

    CHANGES_PATH.write_text(json.dumps(diff_map, indent=2), encoding="utf-8")

    entries, english_files = _build_payload_entries(
        diff_map,
        args.languages,
        _as_bool(args.filter_llms),
        _as_bool(args.filter_ai_dir),
    )
    if not entries:
        print("No eligible additions detected; exiting cleanly.")
        return 0

    documents = _build_document_records(entries)
    metadata_languages = _collect_target_languages(entries)
    commit_sha = _resolve_commit(args.head)
    n8n_payload = {
        "jobs": entries,
        "head_ref": args.head,
        "documents": documents,
        "target_languages": metadata_languages,
        "branch": args.head,
        "commit": commit_sha,
    }
    response = _post_json(args.n8n_webhook, n8n_payload)

    if isinstance(response, list):
        if not response:
            print("n8n webhook returned an empty list; exiting.")
            return 1
        response_payload = response[0]
    else:
        response_payload = response

    translations = (
        response_payload.get("translations")
        or response_payload.get("entries")
        or response_payload
    )
    PAYLOAD_PATH.write_text(json.dumps(translations, indent=2, ensure_ascii=False), encoding="utf-8")

    _run_cmd(["python", "-m", "pip", "install", "ruamel.yaml"])
    _run_cmd(["python", str(CURRENT_DIR / "extract_strings.py"), "--payload", str(PAYLOAD_PATH)])
    _run_cmd(
        [
            "python",
            str(CURRENT_DIR / "inject_translations.py"),
            "--payload",
            str(PAYLOAD_PATH),
            "--languages",
            *args.languages,
        ]
    )

    _run_cmd(["python", str(CURRENT_DIR / "format_locale_yaml.py")])

    target_files = _collect_target_files(translations)
    markdown_suffixes = {".md", ".markdown", ".mkd"}
    mdformat_targets = [
        path for path in target_files if path.suffix.lower() in markdown_suffixes
    ]
    if mdformat_targets:
        file_args = " ".join(shlex.quote(str(path)) for path in mdformat_targets)
        repo_root_quoted = shlex.quote(str(REPO_ROOT))
        _run_cmd(["python", "-m", "pip", "install", "mdformat"])
        _run_cmd(
            [
                "bash",
                "-lc",
                f"cd {repo_root_quoted} && mdformat {file_args}",
            ]
        )

    _run_cmd(["python", "-m", "pip", "install", "PyYAML"])
    validation_cmd = [
        "python",
        str(CURRENT_DIR / "validate_translations.py"),
        "--payload",
        str(PAYLOAD_PATH),
        "--report",
        str(VALIDATION_REPORT),
    ]
    validation_result = subprocess.run(validation_cmd, check=False)
    if validation_result.returncode != 0:
        print("Structural validation reported issues; continuing so translations stay available.")
    _run_cmd(["python", str(CURRENT_DIR / "cleanup_tmp.py")])

    missing_report = _report_missing_translations(english_files, args.languages)
    locale_summary = _report_locale_findings(LOCALE_REPORT)
    validation_summary = _load_validation_findings(VALIDATION_REPORT)
    validation_block = {
        "status": validation_summary.get("status", "unknown"),
        "issue_count": validation_summary.get(
            "issue_count",
            len(validation_summary.get("issues", [])),
        ),
        "issues_by_language": validation_summary.get("issues_by_language", {}),
    }
    summary_payload = {
        "missing_per_language": missing_report,
        "locale_added_per_locale": locale_summary.get("added_per_locale", {}),
        "locale_unused_keys": locale_summary.get("unused_keys", []),
        "validation": validation_block,
        "validation_status": validation_block["status"],
        "validation_issue_count": validation_block["issue_count"],
        "validation_issues": validation_summary.get("issues", []),
    }
    COVERAGE_REPORT.write_text(
        json.dumps(summary_payload, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print("Rose pipeline completed successfully.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
