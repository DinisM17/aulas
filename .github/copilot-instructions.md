This repository is a small static site used for course material (two lesson folders: `aula03`, `aula04`).

Keep instructions brief and actionable for an AI coding assistant working in this codebase.

1) Big-picture
- This is a static HTML site. There is no build system, package.json, or server-side code.
- Content is organized by lesson directories at the repo root: `aula03/` and `aula04/`.
- Key pages to reference when making changes: `aula03/index.html`, `aula03/entradas.html`, `aula03/reservas.html`, `aula04/index.html`.

2) Editing rules and patterns (explicit, discoverable)
- Images are stored beside the HTML that uses them (e.g. `aula03/ameijoas.png`); keep that pattern when adding assets.
- Use relative links between lesson pages. Example: from root `index.html` to lesson page use `aula03/index.html` or relative `aula03/index.html` depending on context.
- Preserve existing lowercase, dash/underscore-free filename style. If you rename an asset, update every `src`/`href` reference in HTML files.

3) Preview & developer workflow (Windows PowerShell)
- There is no build step. To preview locally, run a simple static server from the repo root.

  # Using Python (ships on most systems)
  python -m http.server 8000

  # Or using npx http-server (requires Node.js)
  npx http-server -p 8000

- Then open http://localhost:8000/aula03/index.html (or `/aula04/index.html`) in a browser.
- When editing, refresh the browser; consider using the VS Code Live Server extension if you prefer automatic reloads.

4) Common small tasks — exact examples
- Add a new lesson folder `aula05/` with `index.html` and put images inside the same folder. Link it from the site by editing whichever root index you want.
- To update the reservations page in `aula03/reservas.html`, edit HTML directly — there are no templating files.

5) Conventions and gotchas
- No centralized CSS/JS currently — if adding global assets, add a `assets/` or `static/` folder at repo root and update links accordingly.
- Because pages are static, dynamic behaviour should be implemented with client-side JS only.
- Avoid absolute system paths in HTML (`C:\...`). Use relative paths so the site works on a hosted server.

6) What the AI should do and avoid
- Do: make minimal, conservative edits that preserve relative links; when adding/removing files, update references across the repo.
- Do: suggest preview steps and include exact PowerShell commands as above.
- Avoid: introducing frameworks or build tools unless the user explicitly asks — this repo is intentionally simple.

7) Where to look for examples
- `aula03/` shows the canonical pattern for images next to pages and simple internal navigation.

If any part of the site is meant to be transformed into a build-based project, ask the user before introducing new toolchains. Ask for clarification when edits require cross-folder refactors (e.g., moving to `assets/`), and list the files you'll change before making the edits.

Please review this guidance and tell me if you want: stricter commit message rules, a chosen static server, or a minimal linter/formatter to add.
