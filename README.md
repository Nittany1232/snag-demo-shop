# snag-demo-shop

A small storefront used to show [Snag](https://snag.ac) end to end: a user hits the
broken checkout button, Snag captures the bug from the page, and the Snag agent opens a
pull request here with the fix.

Pull requests in this repo are real agent output. Nothing is auto-merged; a human
reviews every one.

## The planted bug

The app is a one-product checkout for "Aurora Pro". Tick **Introduce a bug** to expire
the session, then click **Pay**. The click handler in
[`src/checkout/PayButton.tsx`](src/checkout/PayButton.tsx) reads `session.token`
without checking that a session exists, so it throws:

```
TypeError: Cannot read properties of null (reading 'token')
```

Nothing visible happens on the page, which is the bug. The charge call
(`POST /api/checkout/charge`, in `src/checkout/api.ts`) has no backend on static hosting
and 404s, so captures also carry a real failed network request.

The Snag capture tag sits in `index.html`. After the bug fires, click **Report**
(bottom right) to file it.

## Run it

```sh
npm i && npm run dev
```

`npm test` runs the unit tests, `npm run build` produces `dist/`. Pushes to `main`
deploy to GitHub Pages via `.github/workflows/pages.yml`.

## Try Snag on your own site

https://snag.ac/try
