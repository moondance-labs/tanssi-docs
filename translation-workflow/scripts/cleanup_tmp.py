#!/usr/bin/env python3
"""Remove tmp/i18n artifacts so nothing leaks into git."""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TMP_ROOT = ROOT / "tmp"


def main() -> int:
    if TMP_ROOT.exists():
        shutil.rmtree(TMP_ROOT)
        print(f"Removed temporary directory: {TMP_ROOT}")
    else:
        print("tmp/ already clean")
    return 0


if __name__ == "__main__":  # pragma: no cover
    raise SystemExit(main())
