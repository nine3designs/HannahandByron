# Hannah &amp; Byron — Wedding Website

A from-scratch, no-build-tools wedding website: a "Save the Date" landing page with a
password-gated entrance into the full site (Home, Our Story, Timeline, Travel, RSVP, FAQ,
Contact). Built with plain HTML/CSS/JS so it works with just VS Code and GitHub Pages —
no frameworks, no npm install.

---

## 1. File structure

```
wedding-site/
├── index.html          ← Save the Date landing page + envelope password gate
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
│   ├── config.js         ← ⭐ edit this first — names, date, venue, password
│   ├── lock.js            ← envelope open/close + password check + page gate
│   ├── countdown.js       ← live countdown timer
│   └── main.js            ← mobile nav, FAQ accordion, footer year, demo forms
└── images/
    └── florals.svg        ← reference copy of the botanical illustration (the live
                              pages use the artwork inlined directly in the HTML for
                              maximum browser compatibility — see note below)
```

## 2. Before you do anything else: edit `js/config.js`

This is the one file that drives the couple's names, wedding date/time, venue, and the
guest password. Everything else (the countdown, the lock screen) reads from it.

```js
const WEDDING_CONFIG = {
  partner1: "Hannah",
  partner2: "Byron",
  weddingDateISO: "2027-05-28T13:00:00",
  venueName: "The Glass House",
  venueLocation: "Staining",
  guestPassword: "hannahandbyron",
};
```

## 3. How the envelope / password gate works

- `index.html` is always public — it's the "Save the Date" teaser, safe for search
  engines and safe to share before you're ready to reveal the full site.
- Clicking the wax seal opens the envelope. Enter the password from `config.js` and
  you're taken to `home.html`.
- Every other page (`home.html`, `our-story.html`, etc.) has `data-gated` on its
  `<body>` tag. `js/lock.js` checks on page load whether this browser has already
  unlocked the site (stored in `sessionStorage`, so it resets each new browser
  session); if not, it bounces the visitor back to `index.html`.

**Important security note:** this is a *soft* lock, not real security. The password
lives in plain text in `js/config.js`, which anyone can view via "View Source." It's
good enough to stop the full site turning up in Google before launch, or a link being
idly guessed — not good enough to protect anything sensitive. When you're ready to go
fully live, either:
- **Remove the gate entirely** — delete the `data-gated` attribute from every page's
  `<body>` tag (or delete the whole "gate for full site" block at the bottom of
  `js/lock.js`), or
- **Use real protection** if you want to keep it private for longer — most static
  hosts (Netlify, Cloudflare Pages) offer password protection or "basic auth" as a
  built-in feature, which is properly secure. GitHub Pages itself doesn't support
  this natively, so if real protection matters, that's a reason to host elsewhere
  until launch day, then move to GitHub Pages (or keep it there — see hosting notes
  below).

## 4. Editing content

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

GitHub Pages only serves static files — it can't receive form submissions on its own.
Right now both forms show a friendly "thanks, but this is a preview" message on submit
(see `main.js`) so you can test the design. Before launch, wire them up to a free form
backend, e.g.:

- **[Formspree](https://formspree.io)** — add `action="https://formspree.io/f/YOUR_ID"`
  and `method="POST"` to the `<form>` tag, remove the `data-demo-form` attribute.
- **Netlify Forms** — if you end up hosting on Netlify instead of GitHub Pages, add
  `data-netlify="true"` to the `<form>` tag and it just works.

## 6. Testing locally in VS Code

Because the site avoids anything that needs a build step, you can just open
`index.html` in a browser to preview it. For the smoothest experience (and to avoid
any quirks some browsers have with local files), install the **Live Server** extension
in VS Code, right-click `index.html`, and choose "Open with Live Server."

## 7. Deploying with GitHub Pages

1. In GitHub Desktop, create a new repository from this folder (or add these files to
   an existing repo).
2. Commit and push to GitHub.
3. On GitHub.com, go to your repository → **Settings** → **Pages**.
4. Under "Build and deployment," set **Source** to "Deploy from a branch," pick your
   main branch and the `/ (root)` folder, then save.
5. GitHub will give you a URL like `https://yourusername.github.io/your-repo-name/` —
   that's your live site within a minute or two.

## 8. Adding your custom domain later

Once you've bought your domain:

1. In your repo: **Settings → Pages → Custom domain**, enter your domain, save. This
   creates a `CNAME` file in your repo automatically.
2. At your domain registrar, add the DNS records GitHub's docs specify (either an
   `ALIAS`/`ANAME`/`A` record setup for an apex domain like `hannahandbyron.com`, or a
   `CNAME` record for a subdomain like `wedding.hannahandbyron.com`) — GitHub's Pages
   settings page shows you exactly which records it's expecting once you save the
   domain.
3. Tick "Enforce HTTPS" once it becomes available (can take a little while after DNS
   propagates).

## 9. Photos

Every "photo coming soon" placeholder (in `our-story.html` and the empty `.story-art`
blocks) is just a styled empty box — replace it with an `<img src="images/your-photo.jpg">`
tag once you have real photos, and add an `object-fit: cover; width:100%; height:100%;`
style so it fills the frame nicely.

---

Made for Hannah &amp; Byron, 28.05.27 💛
