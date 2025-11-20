#!/usr/bin/env python3
"""Copy translated Markdown into tanssi-docs/<lang>/..."""
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from ruamel.yaml import YAML
from ruamel.yaml.comments import CommentedMap, CommentedSeq

from paths import DOCS_ROOT, REPO_ROOT, repo_relative

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_PAYLOAD = ROOT / "translations" / "payload.json"
LOCALE_DIR = DOCS_ROOT / "locale"
EN_LOCALE = LOCALE_DIR / "en.yml"

YAML_PARSER = YAML()
YAML_PARSER.indent(mapping=2, sequence=4, offset=2)
YAML_PARSER.preserve_quotes = True


def _normalize_lang(code: str) -> str:
    return code.strip().lower().replace("-", "_")


def _derive_target_path(source_path: str, language: str) -> Path:
    try:
        path = repo_relative(source_path)
    except ValueError:
        path = Path(source_path)
    parts = list(path.parts)

    if parts and parts[0] == "locale":
        rest = parts[1:]
        if not rest:
            return Path("locale", f"{language}.yml")
        filename = Path(rest[-1])
        suffix = filename.suffix or ".yml"
        new_name = f"{language}{suffix}"
        return Path("locale", *rest[:-1], new_name)

    if ".translations" in parts:
        idx = parts.index(".translations")
        before = parts[: idx + 1]
        rest = parts[idx + 1 :]
        filename = rest[-1] if rest else "en.json"
        suffix = Path(filename).suffix or ".json"
        new_name = f"{language}{suffix}"
        return Path(*before, *rest[:-1], new_name)

    if parts and parts[0] == language:
        return path
    if parts and parts[0] == "en":
        parts = parts[1:]
    return Path(language, *parts)


def _load_payload(path: Path) -> list[dict]:
    if not path.exists():
        raise FileNotFoundError(f"Payload file not found: {path}")
    with path.open("r", encoding="utf-8") as handle:
        data = json.load(handle)
    if not isinstance(data, list):
        raise ValueError("Payload root must be a list")
    return data


COLON_PATTERN = re.compile(r'^(\s*[^:\n]+):[ \t]*([^\n]+)$', re.MULTILINE)
EXCLUDED_VALUE_PREFIXES = ('"', "'", '|', '>', '[', '{', '#')
INLINE_COLON_REGEX = re.compile(r'(?<=\w):(?=\s)')
INLINE_CODE_PATTERN = re.compile(r'`([^`\n]+)`')


def _sanitize_locale_text(text: str) -> str:
    def repl(match: re.Match[str]) -> str:
        key = match.group(1)
        value = match.group(2)
        stripped = value.lstrip()
        if not value or stripped.startswith(EXCLUDED_VALUE_PREFIXES):
            return match.group(0)
        sanitized = INLINE_COLON_REGEX.sub('', value)
        return f"{key}: {sanitized}"

    return COLON_PATTERN.sub(repl, text)


def _restore_code_fences(english: list[str], translated: list[str]) -> None:
    max_len = max(len(english), len(translated))
    if len(translated) < max_len:
        translated.extend([""] * (max_len - len(translated)))
    for idx, line in enumerate(english):
        stripped = line.strip()
        if stripped.startswith("```") or stripped.startswith("~~~"):
            translated[idx] = line


def _restore_inline_code(english: str, translated: str) -> str:
    tokens = INLINE_CODE_PATTERN.findall(english)
    for token in tokens:
        pattern = re.compile(rf"(?<!`){re.escape(token)}(?!`)")
        if f"`{token}`" in translated or not pattern.search(translated):
            continue
        translated = pattern.sub(rf"`{token}`", translated, count=1)
    return translated


def _restore_markdown_structure(path: Path, english: str, translated: str) -> str:
    if path.suffix.lower() not in {".md", ".markdown", ".mkd"}:
        return translated
    eng_lines = english.splitlines()
    trans_lines = translated.splitlines()
    _restore_code_fences(eng_lines, trans_lines)
    restored = "\n".join(trans_lines)
    restored = _restore_inline_code(english, restored)
    return restored


def _overlay_locale(base, override):
    if isinstance(base, CommentedMap):
        result = CommentedMap()
        override_map = override if isinstance(override, dict) else CommentedMap()
        for key in base.keys():
            result[key] = _overlay_locale(base[key], override_map.get(key))
        for key, value in override_map.items():
            if key not in result:
                result[key] = value
        return result
    if isinstance(base, CommentedSeq):
        if isinstance(override, list):
            return override
        return base
    if override in (None, ""):
        return base
    return override


def _write_locale_translation(target: Path, translated_text: str) -> None:
    base_data = YAML_PARSER.load(EN_LOCALE.read_text(encoding="utf-8"))
    dest = REPO_ROOT / target
    if dest.exists():
        existing = YAML_PARSER.load(dest.read_text(encoding="utf-8")) or CommentedMap()
    else:
        existing = CommentedMap()
    try:
        override_data = YAML_PARSER.load(translated_text) or CommentedMap()
    except Exception:
        override_data = CommentedMap()

    merged = _overlay_locale(base_data, existing)
    merged = _overlay_locale(merged, override_data)

    dest = REPO_ROOT / target
    dest.parent.mkdir(parents=True, exist_ok=True)
    with dest.open("w", encoding="utf-8") as handle:
        YAML_PARSER.dump(merged, handle)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--payload",
        type=Path,
        default=DEFAULT_PAYLOAD,
        help="Path to the JSON payload produced by n8n",
    )
    parser.add_argument(
        "--languages",
        nargs="*",
        help="Optional whitelist of languages to inject (e.g. es fr pt)",
    )
    args = parser.parse_args()

    payload = _load_payload(args.payload)
    if not DOCS_ROOT.exists():
        raise FileNotFoundError(f"Docs root not found: {DOCS_ROOT}")

    requested = None
    if args.languages:
        requested = {_normalize_lang(lang) for lang in args.languages}

    written = {}

    for entry in payload:
        if entry.get("kind") == "block":
            continue
        lang_code = _normalize_lang(entry.get("target_language", ""))
        if not lang_code:
            raise ValueError("target_language missing in payload entry")
        if requested and lang_code not in requested:
            continue

        path_hint = entry.get("target_path") or entry.get("source_path")
        if not path_hint:
            raise ValueError("Payload entry missing source_path/target_path")
        target = _derive_target_path(path_hint, lang_code)
        translated_value = (
            entry.get("translated_content")
            or entry.get("content")
            or ""
        )
        translated = translated_value.rstrip() + "\n"
        if str(target).startswith("locale/"):
            translated = _sanitize_locale_text(translated)
            _write_locale_translation(target, translated)
        else:
            english_text = (
                entry.get("content_original")
                or entry.get("content")
                or ""
            )
            if english_text:
                translated = _restore_markdown_structure(target, english_text, translated)
            translated = translated.rstrip("\n") + "\n"
            dest = REPO_ROOT / target
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(translated, encoding="utf-8")
        entry["translated_content"] = translated.rstrip("\n")
        written.setdefault(lang_code, 0)
        written[lang_code] += 1

    if not written:
        print("No files injected (check languages filter or payload)")
    else:
        for lang, count in sorted(written.items()):
            print(f"Injected {count} file(s) into {DOCS_ROOT/lang}")

    args.payload.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    return 0


if __name__ == "__main__":  # pragma: no cover
    raise SystemExit(main())
