# TabBar Liquid Glass Playground

This fork-only branch keeps the complete Liquid Glass calibration and layer-inspection demos outside the upstream pull request.

## Pages

- Final comparison and calibration: `/mobile.html#/tab-bar/liquid-glass`
- Layer inspector: `/mobile.html#/tab-bar/liquid-glass-inspector`

Both pages are generated from the same TabBar implementation as the pull-request branch. The inspector and optical controls are development tools and are not public component APIs.

## Local build

```bash
npm install
npm run site:playground
```

The static output is written to `_site/`. The Playground build uses a dedicated compile-time flag so the private calibration context remains available in the deployed static site. Normal production builds continue to ignore that context.

## Branch relationship

- Pull-request branch: `codex/tab-bar-liquid-glass`
- Hosted Playground branch: `playground/tab-bar-liquid-glass`

Rebase this branch onto the pull-request branch whenever the implementation changes, then rebuild and publish the new deployment. Record the deployed commit SHA in the pull-request description.
