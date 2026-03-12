# BA Cognitive Assessment App

Single-page React assessment that simulates a contained Business Analyst project for return-to-work evaluation. The app runs entirely in the browser, stores no persistent data, and produces a clinician dashboard at the end of each session.

## What the app includes

- Module 1: HR email intake plus a requirement-gathering form with tracked source-material references.
- Module 2: Drag-and-drop process mapping with exact-order scoring.
- Module 3: Action-items handoff and two user-story builders.
- Module 4: Randomized interruption modal with response and recovery telemetry.
- Clinician dashboard: total session time, per-module times, idle events, reference clicks, accuracy, and interruption metrics.

## Local development

```bash
npm install
npm run dev
```

The dev server starts on the default Vite port. For deterministic local QA and Playwright runs, open `/?e2e=1`.

## Testing

```bash
npm test
npm run test:e2e
```

- `npm test` runs the Vitest unit and component suite.
- `npm run test:e2e` runs Playwright against the live Vite dev server.

## Production build

```bash
npm run build
npm run preview
```

To validate the GitHub Pages path locally, set the base path before building:

```bash
$env:VITE_BASE_PATH='/your-repo-name/'
npm run build
```

## Deployment

Deployment is configured for GitHub Pages through [deploy.yml](/C:/Business-analist/.github/workflows/deploy.yml).

- Push to `main`.
- GitHub Actions installs dependencies, runs Vitest, installs Playwright Chromium, runs the Chromium end-to-end suite, builds the static app, and deploys `dist/` to Pages.
- The build uses `VITE_BASE_PATH` derived from the repository name so the same bundle works on Pages without hard-coded paths.

## Privacy note

All session data stays in memory only. Refreshing or closing the tab clears the assessment state.
