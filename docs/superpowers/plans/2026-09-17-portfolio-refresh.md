# Portfolio refresh implementation plan

**Goal:** Match the supplied 2026 resume, retain existing projects, and deliver a cinematic, accessible static Netlify portfolio.

**Design:** Dark cinematic engineering, approved by the user. Ink #080d17, slate #141f30, ice #dce9ff, electric blue #79aaff, copper #dca477. A large left-aligned editorial introduction sits beside an interactive CSS 3D orbital sculpture. Project visuals describe the actual product; live screenshots are preferred. Geist is retained to avoid another font dependency. Motion has a pause control and honors reduced motion.

**Architecture:** Keep Next.js and the existing routes, export static HTML to `out`, and use native Netlify Forms with a static detection form and URL-encoded submission. No server, database, or API keys. Keep private repository links off public buttons. All original six projects remain.

## Execution

- [x] Add regression tests for current profile, preservation of projects, correct public links, form encoding and error handling.
- [x] Update `data/portfolio.ts`, metadata, resume PDF, experience, skills, achievements and project links from the resume and verified repository metadata.
- [x] Implement hero sculpture, shared visual tokens, project imagery and cards; retain accessible navigation and all pages.
- [x] Restore contact form with honest sending/success/error states, honeypot and native validation. Document Netlify detection and email notification setup.
- [x] Enable static export, fix discovered type/build/navigation/accessibility defects, and run tests, TypeScript and production build.
- [x] Inspect generated routes/assets and preview desktop/mobile where browser tooling is available. Record any hosting-only verification limits.

## Verification

Run `pnpm test`, `pnpm exec tsc --noEmit`, and `pnpm build`. Tests must verify all original project slugs, current General Motors role, Grand Blanc location, both Discord links, field serialization, failure handling and static Netlify registration. Compare the copied PDF SHA-256 with the provided original. Check all internal links and assets in the exported HTML. A real Netlify submission and inbox delivery require the site deployment and dashboard notification setting; do not claim local tests establish delivery.

## Results

- Five regression tests and seven browser tests passed.
- TypeScript and the production static export passed.
- All internal references across 17 exported HTML files resolved.
- Resume SHA-256 exactly matches the supplied PDF.
- Desktop, mobile, and light-theme screenshots inspected; reduced-motion and keyboard interactions verified.
- Netlify deployment, form detection, email notification configuration, and a real inbox delivery test remain hosting tasks, documented in `docs/netlify-setup.md`.
