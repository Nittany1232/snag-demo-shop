# snag-demo-shop

A small storefront used to show [Snag](https://snag.ac) end to end: a user hits the
broken checkout button, Snag captures the bug from the page, and the Snag agent opens a
pull request here with the fix.

Pull requests in this repo are real agent output. Nothing is auto-merged; a human
reviews every one.

## The planted bugs

The app is a one-product checkout for "Aurora Pro". The **Introduce a bug** picker at
the bottom of the card arms one scenario at a time; each puts the page into a state a
real user could reach, and that state trips a defect in the app's own code. Nothing in
the picker is the bug itself.

| Scenario | What a user sees | Where to look |
|---|---|---|
| Expired session | Click **Pay** and nothing happens. The console shows `TypeError: Cannot read properties of null (reading 'token')`. | `src/checkout/PayButton.tsx`, `src/session.ts` |
| Euro pricing | The whole card disappears the moment prices switch to euros; the console shows a `RangeError` from `Intl.NumberFormat`. | `src/lib/money.ts` |
| Promo code | Enter `LAUNCH10`, click **Apply**, nothing happens. The console shows `TypeError: PROMOS.find is not a function`. | `src/checkout/promos.ts` |
| More licenses | Pick any quantity and the card disappears; the console shows a `RangeError` about a non-integer amount of cents. | `src/checkout/Quantity.tsx`, `src/checkout/licenses.ts` |

The charge call (`POST /api/checkout/charge`, in `src/checkout/api.ts`) has no backend
on static hosting and 404s, so captures from the first scenario also carry a real failed
network request. A reload resets every scenario.

The Snag capture tag sits in `index.html`. After a bug fires, click **Report**
(bottom right) to file it.

## Run it

```sh
npm i && npm run dev
```

`npm test` runs the unit tests, `npm run build` produces `dist/`. Pushes to `main`
deploy to GitHub Pages via `.github/workflows/pages.yml`.

## Try Snag on your own site

https://snag.ac/try
