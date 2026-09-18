# Ansh Raj Suryavanshi — Portfolio

Static Next.js portfolio for a software and AI engineer. Dark cinematic design, an interactive CSS 3D scene, project case studies, current resume, and native Netlify Forms. No backend server or database.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm test
pnpm lint
pnpm build
pnpm test:browser
pnpm preview
```

Browser tests use installed Chrome and Python's static HTTP server. `pnpm build` creates `out/`; `pnpm preview` serves it at http://127.0.0.1:4173. Netlify settings and the one-time email notification step are documented in [Netlify setup](docs/netlify-setup.md).

Content lives in `data/portfolio.ts`. The resume download keeps its existing filename. Project illustrations/captures are in `public/projects/`; the original project entries remain preserved.
