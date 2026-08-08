---
name: run-quality-gate
description: "Verify the eklipse static site before cPanel deployment. Use for quality gate, release readiness, security checks, responsive checks, or deployment validation."
---

# Run Quality Gate

Run each applicable gate in order and report objective PASS, FAIL, or N/A evidence.

1. **Diagnostics:** collect whole-workspace VS Code diagnostics and fix valid findings.
2. **Build:** run the repository production build and require a clean exit.
3. **Tests:** run all repository tests and require a clean exit.
4. **Link policy:** inspect built HTML and scripts; allow only internal fragments and `https://eklipse-music.bandcamp.com/` project or `/album/` URLs.
5. **Input policy:** verify production output contains no forms, editable controls, comments, authentication, analytics, trackers, or data-submission code.
6. **Asset policy:** verify production assets resolve and no runtime third-party script or iframe is present.
7. **Browser QA:** inspect desktop and mobile rendering, keyboard focus, overflow, image loading, reduced motion, and console errors.
8. **Security:** verify CSP and related static-site security headers are represented in deployable configuration.
9. **Deployment artifact:** verify only intended production files are staged for `/home/eklipse/public_html` and no secrets are present.

Do not suppress failures. Stop at any gate that requires credentials or manual secret entry, and report the smallest next action.
