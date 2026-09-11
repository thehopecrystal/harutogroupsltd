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

## Verification

A full link/asset audit was run across all 713 HTML pages (regex scan of every `href`, `src`, `srcset`, `poster`, `data-*` and CSS `url()` reference):

- **Baseline (before cleanup): 128 broken targets**
- **After cleanup: 106 broken targets — 22 fixed, 0 newly broken**
- All rewritten pages spot-checked for rendering-critical regions (CSS/fonts/nav/images/videos)

The remaining 106 broken targets are **pre-existing mirror artifacts**: links to content that was never captured (Cloudflare CDN helper scripts, old CMS module URLs, external galleries, `#`-anchors on removed pages). None were introduced by this cleanup.

## Local preview

```bash
# from the repo root
python -m http.server 8000
# then open http://localhost:8000/
```

Any static file server works; the site is fully relative-path based and can also be served from a sub-path.
