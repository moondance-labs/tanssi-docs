import os
import yaml
import json
from pathlib import Path
from typing import List, Dict, Any

# --- Load Config ---
def load_config(config_path: str) -> Dict[str, Any]:
    config_path = Path(__file__).parent / config_path
    with open(config_path, "r", encoding="utf-8") as f:
        return json.load(f)

# --- Parse Frontmatter ---
def parse_frontmatter(file_path: Path) -> Dict[str, Any]:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    if content.startswith("---"):
        parts = content.split("---", 2)
        if len(parts) >= 3:
            try:
                frontmatter = yaml.safe_load(parts[1])
                title = frontmatter.get("title", file_path.stem)
                description = frontmatter.get("description", "No description available.").replace("\n", " ").strip()
                categories = frontmatter.get("categories", ["Uncategorized"])
                if isinstance(categories, str):
                    categories = [categories]
                return {
                    "title": title,
                    "description": description,
                    "categories": categories,
                }
            except yaml.YAMLError:
                pass
    return {
        "title": file_path.stem,
        "description": "No description available.",
        "categories": ["Uncategorized"],
    }

# --- Collect Docs ---
def collect_docs(docs_dir: Path) -> List[Dict[str, Any]]:
    markdown_files = list(docs_dir.rglob("*.md")) + list(docs_dir.rglob("*.mdx"))
    results = []
    for md in markdown_files:
        if any(x in md.parts for x in [".snippets", "node_modules", ".git"]):
            continue
        meta = parse_frontmatter(md)
        rel_path = md.relative_to(docs_dir)
        results.append({
            "path": str(rel_path).replace("\\", "/"),
            **meta,
        })
    return results

# --- Format Docs Section ---
def format_docs_section(pages: List[Dict[str, Any]], base_url: str, category_order: List[str]) -> str:
    grouped: Dict[str, List[str]] = {}

    for page in pages:
        for category in page["categories"]:
            grouped.setdefault(category, []).append(
                f"- [{page['title']}]({base_url}/{page['path']}): {page['description']}"
            )

    lines = ["## Docs", "Documentation page title, markdown page URL, and description; organized by category."]
    seen = set()

    for category in category_order:
        if category in grouped:
            lines.append(f"\n### Docs: {category}")
            lines.extend(grouped[category])
            seen.add(category)

    # Catch uncategorized or out-of-order categories
    remaining = sorted([c for c in grouped if c not in seen])
    for category in remaining:
        lines.append(f"\n### Docs: {category}")
        lines.extend(grouped[category])

    return "\n".join(lines)

# --- Other Sections ---
def format_tutorials_section(pages: List[Dict[str, Any]], base_url: str) -> str:
    tutorials = [
        f"- [{p['title']}]({base_url}/{p['path']}): {p['description']}"
        for p in pages if "Tutorial" in p["categories"]
    ]
    if not tutorials:
        return ""
    return "\n## Tutorials\nStep-by-step instructions for building with the project\n" + "\n".join(tutorials)

def format_repos_section(repos: List[Dict[str, str]]) -> str:
    if not repos:
        return ""
    lines = ["## Source Code Repos", "Repository name, GitHub URL, and description for frequently used source code repositories essential to the project/product"]
    for repo in repos:
        lines.append(f"- [{repo['name']}]({repo['url']}): {repo['description']}")
    return "\n".join(lines)

def format_optional_section(pages: List[Dict[str, str]]) -> str:
    if not pages:
        return ""
    lines = ["## Optional", "Additional resources:"]
    for page in pages:
        lines.append(f"- [{page['title']}]({page['url']}): {page['description']}")
    return "\n".join(lines)

# --- Main ---
def generate_llms_txt(config_path: str):
    config = load_config(config_path)
    repo_root = Path(__file__).resolve().parent.parent
    docs_dir = repo_root / config["github"]["docs_path"]
    github = config["github"]
    base_url = f"https://raw.githubusercontent.com/{github['org']}/{github['repo']}/{github['branch']}"
    project_name = config.get("project_name", "Project")
    summary = config.get("summary", "A technical documentation site.")
    category_order = config.get("categories_order", [])

    pages = collect_docs(docs_dir)

    content = [
        f"# {project_name}",
        f"> {summary}",
        "",
        format_docs_section(pages, base_url, category_order),
        "",
        format_repos_section(config.get("source_repos", [])),
        "",
        format_tutorials_section(pages, base_url),
        "",
        format_optional_section(config.get("optional_resources", [])),
    ]

    output_path = Path(config.get("output_path", "llms.txt"))
    with open(output_path, "w", encoding="utf-8") as f:
        f.write("\n".join(content))
    print(f"✅ llms.txt generated at: {output_path}")

# Run it
if __name__ == "__main__":
    import sys
    config_arg = sys.argv[1] if len(sys.argv) > 1 else "llms_config.json"
    generate_llms_txt(config_arg)
