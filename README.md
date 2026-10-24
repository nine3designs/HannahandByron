# Hannah & Byron — Wedding Website

Wedding website: a "Save the Date" landing page with a direct entrance into the full site
(Home, Our Story, Timeline, Travel, RSVP, FAQ, Contact). Built with plain HTML/CSS/JS so
it works with just VS Code and GitHub Pages - by Nine3 Weddings

---

## 1. File structure

```
wedding-site/
├── index.html          ← Save the Date landing page + Enter site link
├── home.html            ← full site homepage (nav, hero, countdown)
├── our-story.html
├── timeline.html
├── travel.html
├── rsvp.html
├── faq.html
├── contact.html
├── css/
│   └── style.css        ← all styling lives here
├── js/
│   ├── config.js         ← ⭐
│   ├── countdown.js       ← live countdown timer
│   └── main.js            ← mobile nav, FAQ accordion, footer year, demo forms
└── images/
    └── florals.svg        ← reference copy of the botanical illustration (the live
                              pages use the artwork inlined directly in the HTML for
                              maximum browser compatibility — see note below)
```

This file drives the couple's names, wedding date/time, and venue. The countdown reads
the wedding date from it.

```js
const WEDDING_CONFIG = {
  partner1: "Hannah",
  partner2: "Byron",
  weddingDateISO: "2027-05-28T13:00:00",
  venueName: "The Glass House",
  venueLocation: "Staining",
};
```


## Editing content

Everything is plain HTML, so text edits are just... editing the text. A few notes:

- **Countdown & dates**: only `js/config.js` needs updating.
- **Navigation**: the same `<nav class="site-nav">` block is repeated at the top of
  every page (there's no templating system, to keep this dependency-free). If you
  rename a page or add a new one, update the nav in **all** files — use VS Code's
  "Find and Replace in Files" (Ctrl/Cmd+Shift+H) to do this quickly.
- **Colours & fonts**: all defined as CSS variables at the top of `css/style.css`
  under `:root`. Change `--peach`, `--lavender`, `--sage`, `--gold` etc. and the
  whole site updates.
- **Floral illustrations**: these are original hand-built SVG artwork (not a copy of
  any Canva design), inlined directly into `index.html` and `home.html` so they
  always render correctly even when you open the file directly from disk (some
  browsers block loading external SVGs over `file://`, which is why they're not
  linked as separate image files on the pages that use them).

## 5. Forms (RSVP & Contact)

GitHub Pages only serves static files, so submissions need a form service. The RSVP
form currently posts to Formspree (`rsvp.html`); its recipient inbox is configured in
the Formspree account. The Contact page is still a preview-only form (`data-demo-form`)

## 6. Testing locally in VS Code

Because the site avoids anything that needs a build step, you can just open
`index.html` in a browser to preview it. For the smoothest experience (and to avoid
any quirks some browsers have with local files), install the **Live Server** extension
in VS Code, right-click `index.html`, and choose "Open with Live Server."
---

Made for Hannah &amp; Byron, 28.05.27 💛 Nine3 Weddings
