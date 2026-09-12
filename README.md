# Haruto Groups Ltd. — Static Website Mirror

A cleaned-up, self-contained static mirror of `harutogroupsltd.com`, originally captured with HTTrack. All pages have been normalized to load their assets from **relative, canonical paths** so the site works as a fully self-contained static bundle (open directly, or serve from any web root / subdirectory).

## Repository layout

```
index.html                 Homepage
about/                     Corporate pages (team, governance, contact…)
investors/                 Investor pages + media/quotes + videos/
news/                      News releases + articles
projects/                  Project pages by country (brazil/, canada/, …)
assets/
  css/                     Stylesheets (home.css, internal.css, …)
  js/                      Site scripts
  images/                  All images (incl. media/, logos/, photos/)
  documents/               PDFs (reports, presentations, policies)
  fonts/                   Webfonts
  vendor/                  3rd-party libs (jquery, slick, wow, counterup…)
favicon.ico / manifest…
```

## What was cleaned up (mirror normalization)

The original HTTrack capture contained a lot of server-only and mirror-junk references. Everything below was rewritten or removed:

| Before | After |
|---|---|
| `/assets/templates/{1,2,1007,1008}/source/...` (server-side template paths) | `/assets/css|js|images/...` (canonical paths, files moved accordingly) |
| `/assets/lib/...`, `/assets/modules/...`, `/assets/includes/...`, `/assets/scripts/...` | consolidated into `/assets/vendor|js|css/` (dead server dirs deleted) |
| `staging.harutogroupsltd.com/...` absolute staging URLs | relative canonical asset paths |
| `/projects/united_states/...` (underscore URLs) | `/projects/united-states/...` (directory renamed to match canonical links) |
| `/investors/videos/featured--video-N/` (double-dash dirs) | `/investors/videos/featured-video-N/` |
| sibling video links inside `videos/*/` missing `../` | rewritten with correct relative depth |
| `templates/2/source/spacer.html` (saved 404 page used as img src) | `assets/images/spacer.gif` (real 1px spacer) |
| `assets/backup/`, `nul`, HTTrack mirror banners, dead ie/edge CSS blocks, dead hubspot/jquery.cookie script blocks | removed |

## Responsive / mobile navigation fix

The navbar was dead on every page for two stacked reasons, both fixed:

1. **jQuery never loaded** — all 330 pages referenced jQuery via broken local mirror paths (`../../cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js` → 404). Without jQuery, `main.js`'s `$` threw immediately, so the hamburger click handler (`$('.menu-icon').on('click touch', …)`) and the slide-in mobile menu never ran. jQuery 3.1.1 (plus fancybox 3.5.7 and font-awesome 4.7.0, which were equally broken) is now served locally from `assets/vendor/` and all references point there.
2. **The mobile/desktop nav switch was user-agent-only** — `setMobile()` added the `body.mobile` class (which hides the desktop header and shows the mobile hamburger menu) purely by UA sniffing, so a resized desktop window never switched to the mobile nav. It now also switches at the theme's 900px breakpoint (`detectmob() || window.innerWidth <= 900`), in both `main.js` (inner pages) and `home.js` (homepage).

Also fixed as part of the mobile pass:

| Before | After |
|---|---|
| `<meta name="viewport" content="initial-scale=1,user-scalable=no,maximum-scale=1,width=device-width">` (all 330 pages — pinch-zoom disabled) | `<meta name="viewport" content="width=device-width, initial-scale=1">` |
| External CDN references (cdnjs, jsdelivr `403.5.7` mangled path, googleapis) | localized under `assets/vendor/{jquery.min.js, font-awesome/, fancybox3/}` — site now has zero external runtime dependencies |
| Dead mirror comment blocks (`<!-- INCLUDE CSS: … -->`, featherlight/normalize/cookieconsent links) | removed |

## Verification

A full link/asset audit was run across all 713 HTML pages (regex scan of every `href`, `src`, `srcset`, `poster`, `data-*` and CSS `url()` reference):

- **Baseline (before cleanup): 128 broken targets**
- **After cleanup: 106 broken targets — 22 fixed, 0 newly broken**
- **After responsive nav fix: 91 broken targets — 37 fixed in total, 0 newly broken**
- All rewritten pages spot-checked for rendering-critical regions (CSS/fonts/nav/images/videos)

The remaining 91 broken targets are **pre-existing mirror artifacts**: links to content that was never captured (old CMS module URLs, external galleries, dead article cross-links). None were introduced by these changes.

## Local preview

```bash
# from the repo root
python -m http.server 8000
# then open http://localhost:8000/
```

Any static file server works; the site is fully relative-path based and can also be served from a sub-path.
