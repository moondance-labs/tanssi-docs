#!/usr/bin/env python3
"""Render translation summary markdown from JSON report."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any


def _format_missing(data: dict[str, list[str]]) -> list[str]:
    lines: list[str] = []
    lines.append("#### Translation coverage")
    if not data:
        lines.append("- No files required translation.")
        return lines
    for lang, paths in sorted(data.items()):
        if not paths:
            lines.append(f"- `{lang}`: ✅ up to date")
        else:
            lines.append(f"- `{lang}`: ❌ missing {len(paths)} file(s)")
            for path in paths[:5]:
                lines.append(f"  - `{path}`")
            if len(paths) > 5:
                lines.append("  - ...")
    return lines


def _format_locale_added(data: dict[str, int]) -> list[str]:
    lines: list[str] = []
    lines.append("#### Locale key additions")
    if not data:
        lines.append("- No new locale keys were added.")
        return lines
    for locale, count in sorted(data.items()):
        lines.append(f"- `{locale}`: {count} new key(s)")
    return lines


def _format_unused(keys: list[str]) -> list[str]:
    lines: list[str] = []
    lines.append("#### Locale keys unused in templates")
    if not keys:
        lines.append("- No unused locale keys detected.")
        return lines
    for key in keys[:10]:
        lines.append(f"- `{key}`")
    if len(keys) > 10:
        lines.append("- ...")
    return lines


def _format_validation(validation: dict[str, Any]) -> list[str]:
    lines: list[str] = []
    lines.append("#### Validation status")
    status = validation.get("status", "unknown")
    issue_count = validation.get("issue_count", len(validation.get("issues", [])))
    issues_by_language = validation.get("issues_by_language", {})

    if status == "passed":
        lines.append("- ✅ Structural validation passed.")
        return lines
    if status not in {"failed", "warning"}:
        lines.append("- ⚠️ Validation status unknown.")
        return lines

    if issue_count:
        lines.append(f"- ❌ {issue_count} issue(s) detected across translations.")
    else:
        lines.append("- ❌ Validation reported issues but no details were captured.")

    if not issues_by_language:
        lines.append("  - No structured issue breakdown available.")
        return lines

    for lang, payload in sorted(issues_by_language.items()):
        lang_count = payload.get("count", 0)
        lines.append(f"  - `{lang}`: {lang_count} issue(s)")
        files = payload.get("files", {})
        for idx, (path, file_issues) in enumerate(sorted(files.items()), start=1):
            if idx > 3:
                lines.append("    - …")
                break
            lines.append(f"    - `{path}`")
            for issue in file_issues[:2]:
                line_hint = f"L{issue.get('line')} · " if issue.get("line") else ""
                lines.append(
                    f"      - {line_hint}[{issue.get('issue_type')}] {issue.get('message')}"
                )
            if len(file_issues) > 2:
                lines.append("      - …")
    return lines


def build_markdown(summary_path: Path) -> str:
    data = json.loads(summary_path.read_text(encoding="utf-8"))
    blocks: list[str] = ["### Translation Summary"]
    blocks.extend(_format_missing(data.get("missing_per_language", {})))
    blocks.append("")
    blocks.extend(_format_locale_added(data.get("locale_added_per_locale", {})))
    blocks.append("")
    blocks.extend(_format_unused(data.get("locale_unused_keys", [])))
    blocks.append("")
    validation_block = data.get("validation") or {
        "status": data.get("validation_status", "unknown"),
        "issues": data.get("validation_issues", []),
    }
    blocks.extend(_format_validation(validation_block))
    return "\n".join(blocks).strip() + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--summary", type=Path, required=True, help="Path to summary_report.json")
    parser.add_argument("--output", type=Path, required=True, help="Markdown output path")
    args = parser.parse_args()

    if not args.summary.exists():
        raise FileNotFoundError(args.summary)

    markdown = build_markdown(args.summary)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(markdown, encoding="utf-8")
    print(markdown)
    return 0


if __name__ == "__main__":  # pragma: no cover
    raise SystemExit(main())
