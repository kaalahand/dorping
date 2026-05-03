#!/usr/bin/env python3
"""
Export all n8n workflows to JSON files and push to GitHub.
Usage: python3 export_n8n_workflows.py

Reads credentials from ~/.config/reminology/secrets
Pushes to: https://github.com/RemiAdmin/n8n_workflow
"""

import json
import os
import subprocess
import sys
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime

SECRETS_FILE = Path.home() / ".config/reminology/secrets"
EXPORT_DIR = Path(__file__).parent.parent / "n8n_workflows"
GITHUB_REPO = "https://github.com/RemiAdmin/n8n_workflow"


def load_secrets():
    secrets = {}
    with open(SECRETS_FILE) as f:
        for line in f:
            line = line.strip()
            if "=" in line and not line.startswith("#"):
                key, _, val = line.partition("=")
                secrets[key.strip()] = val.strip()
    return secrets


def n8n_get(path, api_key, base_url):
    req = urllib.request.Request(
        f"{base_url.rstrip('/')}{path}",
        headers={"X-N8N-API-KEY": api_key},
    )
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)


def export_workflows(api_key, base_url, output_dir):
    output_dir.mkdir(parents=True, exist_ok=True)

    data = n8n_get("/api/v1/workflows", api_key, base_url)
    workflows = data.get("data", [])

    print(f"Found {len(workflows)} workflows")

    for wf in workflows:
        wf_id = wf["id"]
        full = n8n_get(f"/api/v1/workflows/{wf_id}", api_key, base_url)

        safe_name = (
            wf["name"]
            .replace("/", "-")
            .replace(" ", "_")
            .replace(":", "")
            .replace("[", "")
            .replace("]", "")
        )
        filename = f"{safe_name}__{wf_id}.json"
        filepath = output_dir / filename

        with open(filepath, "w") as f:
            json.dump(full, f, indent=2)

        status = "✅ active" if wf["active"] else "⏸ inactive"
        print(f"  {status}  {filename}")

    # Write summary index
    index = {
        "exported_at": datetime.utcnow().isoformat() + "Z",
        "n8n_instance": base_url,
        "workflows": [
            {
                "id": w["id"],
                "name": w["name"],
                "active": w["active"],
            }
            for w in workflows
        ],
    }
    with open(output_dir / "index.json", "w") as f:
        json.dump(index, f, indent=2)

    print(f"\nExported to: {output_dir}")
    return len(workflows)


def git_push(output_dir, github_token=None):
    repo_dir = output_dir

    if not (repo_dir / ".git").exists():
        print("\nInitialising git repo and linking to GitHub...")
        subprocess.run(["git", "init"], cwd=repo_dir, check=True)
        remote_url = (
            f"https://{github_token}@github.com/RemiAdmin/n8n_workflow.git"
            if github_token
            else f"{GITHUB_REPO}.git"
        )
        subprocess.run(
            ["git", "remote", "add", "origin", remote_url],
            cwd=repo_dir,
            check=True,
        )

    subprocess.run(["git", "add", "-A"], cwd=repo_dir, check=True)
    result = subprocess.run(
        ["git", "status", "--porcelain"], cwd=repo_dir, capture_output=True, text=True
    )
    if not result.stdout.strip():
        print("No changes to commit.")
        return

    msg = f"Export n8n workflows — {datetime.utcnow().strftime('%Y-%m-%d %H:%M')} UTC"
    subprocess.run(["git", "commit", "-m", msg], cwd=repo_dir, check=True)

    push_result = subprocess.run(
        ["git", "push", "-u", "origin", "main"],
        cwd=repo_dir,
        capture_output=True,
        text=True,
    )
    if push_result.returncode != 0:
        # Try master branch fallback
        subprocess.run(
            ["git", "push", "-u", "origin", "master"],
            cwd=repo_dir,
            check=True,
        )

    print("Pushed to GitHub.")


def main():
    secrets = load_secrets()
    api_key = secrets.get("n8n_API_KEY")
    base_url = secrets.get("n8n_URL", "https://n8n.reminology.com")
    github_token = secrets.get("GITHUB_TOKEN")  # optional

    if not api_key:
        print("ERROR: n8n_API_KEY not found in secrets file")
        sys.exit(1)

    count = export_workflows(api_key, base_url, EXPORT_DIR)

    if "--no-push" in sys.argv:
        print(f"\nExport complete ({count} workflows). Skipped git push (--no-push).")
        return

    if not github_token:
        print(
            "\nNo GITHUB_TOKEN in secrets file — skipping push.\n"
            "Add GITHUB_TOKEN=<your-pat> to ~/.config/reminology/secrets to enable auto-push.\n"
            "Or run: git -C n8n_workflows push manually after cloning the repo there."
        )
        return

    git_push(EXPORT_DIR, github_token)
    print(f"\nDone. {count} workflows exported and pushed to {GITHUB_REPO}")


if __name__ == "__main__":
    main()
