# Translation Workflow Sandbox (now stored inside `tanssi-docs/translation-workflow`)

Everything under this folder ships directly with the MkDocs project so raw
translation payloads, temporary `.po` catalogs, and helper scripts live next to
the content they update while still staying out of normal commits (see
`.gitignore`). You can run every helper locally or in CI without moving files
around.

```
translation-workflow/
├─ translations/                  # ignored staging area for payloads
│  ├─ payload.json                # real payload from n8n (not committed)
│  └─ payload.sample.json         # tiny example to test the scripts
├─ scripts/
│  ├─ extract_strings.py          # creates staging files + .po catalogs
│  ├─ inject_translations.py      # copies translated Markdown into docs/
│  ├─ cleanup_tmp.py              # wipes tmp/i18n between runs
│  └─ collect_diff_sets.py        # records {start,end} blocks per file
│  └─ rose_pipeline.py            # orchestrates diff → n8n → inject → build
│  └─ validate_translations.py    # compares English vs translated structure
├─ tmp/i18n/<lang>/LC_MESSAGES/   # generated catalogs (ignored)
└─ .github/workflows/ingest-translations.yml
```

The sandbox now lives inside the docs repo:

```
tanssi-docs/
├─ translation-workflow/          # this folder
├─ assets/, learn/, scripts/, …   # English + localized Markdown
└─ locale/                        # locale keys
```

## Payload contract (matches Rose ⇄ n8n hand-off)

Every entry inside `translations/payload.json` must include:

- `kind`: `file` for full-document entries, `block` for the `{start,end}` slices.
- `source_path`: English file path inside the repo (also used for logging).
- `target_path`: Optional override for the localized path (automatically derived otherwise).
- `source_language` / `target_language`: Locale codes (e.g. `EN`, `ES`).
- `content_original`: The exact English slice for the `{start,end}` range.
- `content_tagged`: The tagged English slice (matches the n8n symbol scheme).
- `content`: The translated Markdown returned by n8n after all QA passes.
- `range`: `{ "start": <line>, "end": <line> }` describing the addition that
  triggered the translation (used for audits and validation output).

`payload.sample.json` documents the shape and can be used for dry runs.
`rose_pipeline.py` writes the actual payload automatically before staging.

## Local workflow

If you want a fully automated run, call `rose_pipeline.py`:

   ```bash
   cd translation-workflow
   python scripts/rose_pipeline.py \
  --base origin/main \
  --head HEAD \
  --n8n-webhook https://n8n.example/webhook/xyz \
  --languages es fr pt
```

This script captures the diff windows, builds the English payload, sends it to
n8n, waits for the translated payload (or uses the immediate response), then
runs extract → inject → format → validate → cleanup.

To perform each stage manually instead, follow the steps below.

1. **Extract staging files + temp catalogs**

   ```bash
   cd translation-workflow
   python scripts/extract_strings.py --payload translations/payload.json
   ```

   - Writes the English sources to `translations/en/...` and every locale to
     `translations/<lang>/...`.
   - Generates `tmp/i18n/<lang>/LC_MESSAGES/messages.po` (handy if you still
     want to inspect gettext catalogs during CI).

2. **Inject translations into the MkDocs repo**

   ```bash
   python scripts/inject_translations.py --payload translations/payload.json \
     --languages es fr pt
   ```

   - Creates/updates `tanssi-docs/<lang>/...` files so MkDocs sees
     the new locales immediately.

3. **Clean artifacts** (optional locally, mandatory in CI)

   ```bash
   cd ../translation-workflow
   python scripts/cleanup_tmp.py
   ```

## Contract between `.po` catalogs and Markdown

`extract_strings.py` mirrors each English chunk to `translations/en/...` and
adds it to a Babel catalog (`tmp/i18n/en/LC_MESSAGES/messages.po`). When the
same script sees translated content, it writes those strings into per-locale
catalogs (`tmp/i18n/<lang>/LC_MESSAGES/messages.po`). Each message is keyed by
the relative file path and the literal text slice, so the catalog always knows
which block in the English document must be swapped. `inject_translations.py`
replays that mapping: for every entry it copies the catalog’s `msgstr` back into
`tanssi-docs/<lang>/...` so the localized Markdown preserves the same structure,
frontmatter, and table layout as the English source.

## Validation coverage

`validate_translations.py` compares the English block and its translation line by
line. It raises an error when any of the following differ:

- Line counts and blank-line positions
- URL counts per line
- Number/placement of headers, bullet items, images, and frontmatter keys
- HTML/Jinja tag usage (for `.html` / `.jinja*` templates)
- YAML structure (for `.nav.yml` or other YAML files)
- Table structure (pipes, dash rows, and row counts)

The validator is intentionally strict so reviewers immediately see structural
drift in the Action logs and PR comments.

## Reporting + PR feedback

- `translations/summary_report.json` now records coverage gaps, locale key
  churn, and a structured validation block (`status`, `issue_count`, and
  `issues_by_language`). `render_summary.py` converts that JSON into
  `translations/summary.md`, which the workflow adds to the job summary and
  drops as a single PR comment when `pr_number` is provided.
- `translations/validation_report.json` stores the per-file/per-language issue
  list (line numbers, issue types, and relevant details). The GitHub Action reads
  this file to leave inline review comments (up to 20) pointing at the affected
  localized files so reviewers can jump straight to the drift.
- `rose_pipeline.py` keeps the workflow non-blocking: `validate_translations.py`
  still reports failures in the logs and JSON reports, but the orchestrator
  continues so localized files always land. Downstream automation can rely on
  the structured reports (or the PR comments) without re-running validation.

## GitHub Action blueprint

`translation-workflow/.github/workflows/ingest-translations.yml` wraps the exact
commands above so the pipeline can run unattended once n8n drops a payload. The
job does the following:

1. `actions/checkout` the repo that contains `tanssi-docs/` (this folder already
   lives at `translation-workflow/` inside the repo).
2. Restore or download `translations/payload.json` (artifact from n8n, S3, etc.)
   into this directory.
3. Run `scripts/extract_strings.py` to materialize staging files and catalogs.
4. Run `scripts/inject_translations.py --languages …` to write the localized
   Markdown underneath `tanssi-docs/`.
5. Format the updated Markdown with `mdformat`, then
6. Run `scripts/validate_translations.py` to ensure structure parity.
7. `scripts/cleanup_tmp.py` to remove `tmp/i18n` so no `.po` files leak into the
   repo history.
8. Use `peter-evans/create-pull-request` (or any bot you prefer) to open a PR
   with the updated files.

Because `.gitignore` already excludes `translations/` and `tmp/`, you can run
this workflow locally without worrying about polluting commits.

## Node-to-script mapping cheat sheet

| n8n node | What it guarantees | How the sandbox uses it |
| --- | --- | --- |
| `Tagger` + `Slicer` + `batch` | Wraps text in `[§…]` markers, builds `translate_view`, passes metadata | The markers stay embedded in `content_original`/`content`; scripts treat the entire Markdown file as the unit to keep layout intact. |
| `Translate a language`, `Restoration`, `Validation`, `Duplicate removal`, `list_fix`, `postProcessing` | Produce the polished Markdown per locale | `inject_translations.py` copies `content` verbatim into `tanssi-docs/<lang>/...`. |
| `verifyContent` | Ensures placeholders/fences survived | Fail the workflow upstream before the Action runs; no extra logic needed here. |

If you tweak any node (e.g., add new QA flags), only the payload JSON changes.
As long as `content_original` and `content` remain present, the sandbox scripts
keep working without modification.

## Tips

- Need to support additional locales? Just include them in the payload; the
  scripts detect new `target_language` values automatically.
- To dry-run a single locale, pass `--languages es` (or whichever code) to
  `inject_translations.py`.
- When you migrate this folder into the real repo, keep the relative paths
  identical so the GitHub Action works without edits.

## End-to-end translation + QA flow (Nathan + Rose)

1. **Lint before merge (Nathan).** Run the agreed Markdown linter on every `.md`
   that is heading to PR so we start from clean, predictable spacing.
2. **Merge the feature PR.** Once the branch lands in the mainline, switch to the
   latest commit for the next steps.
3. **Collect `{start,end}` windows (Rose).** Run
   `python scripts/collect_diff_sets.py --base origin/main --head HEAD` to write
   `translations/changed_segments.json`. Each entry contains the
   `Source_file: set# {start, end}` referenced in the workflow.
4. **Validate removed lines.** Using the baseline (the version at `origin/main`),
   inspect each `removed` block to confirm the content is intentionally gone and
   the surrounding headers/line breaks remain coherent. If something was removed
   accidentally, open a quick PR against the branch that just merged to restore
   it before translations start.
5. **Decide which diffs require translation.** For each changed block, skip
   diffs that only tweak URLs, code fences, or terminal snippets. Everything
   else should be flagged for translation.
6. **Snapshot the baseline per file.** Record the content and line-break pattern
   for every affected file. These snapshots are used later to confirm line break
   fidelity (Step 10).
7. **Assemble the translation payload.** Combine the filtered diff sets with the
   cleaned English Markdown (`content_original`) and push them into
   `translations/payload.json` so the n8n workflow knows exactly which regions
   to translate.
8. **Run the translation workflow.** n8n uses the provided ranges to send only
   the relevant sections to providers. The payload we get back still includes
   the original `Source_file` and `{start,end}` metadata.
9. **Post-translation lint.** Run the same Markdown linter (plus any bespoke
   checks) over the translated Markdown to confirm the formatting matches the
   English baseline.
10. **Reconcile line breaks/content.** Compare each translated block against the
    baseline snapshot. If line breaks drift, delete and retry the translation; if
    the content drifts, emit a warning so humans can review before shipping.
11. **Inject files.** Use `scripts/inject_translations.py` together with the
    `changed_segments.json` metadata to drop each translation into the matching
    file/section inside `tanssi-docs/<lang>/...`.
12. **Verify language coverage.** Confirm that every locale folder affected by
    the change received an updated file. If a locale is missing, trigger a retry
    before continuing.
13. **Update template/localized strings.** If the diff touched HTML/Jinja
    overrides, update the locale `.yml` files plus `hooks.py` runtime strings so
    MkDocs renders the new text through the translation hook.
14. **Open the downstream PR.** Branch off the latest merge commit, add the
    localized Markdown plus any locale updates, and open the PR back to the
    branch that was recently merged.
