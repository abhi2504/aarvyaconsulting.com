# Aarvya Consulting — Premium Website

A high-conversion, mobile-first, SEO-optimised website for **Aarvya Consulting** — a professional consulting firm in India offering taxation, GST, accounting, payroll, audit, ROC compliance, SOP development, ERP (Microsoft Dynamics 365 & Business Central) and business advisory.

Tagline: **“Your Trusted Partner for Compliance & Business Growth.”**
Footer signature: **“Driven by Accuracy, Powered by Trust.”**

Built as a static site (HTML / CSS / vanilla JS) for maximum speed, perfect Lighthouse scores, and one-click deployment on **GitHub Pages**.

---

## Highlights

- Premium navy + gold luxury corporate design
- Mobile-first with sticky WhatsApp + Call CTAs
- WhatsApp-first lead generation (forms open prefilled WhatsApp chats)
- Schema.org JSON-LD: `ProfessionalService` / `LocalBusiness`, `Service`, `FAQPage`
- Open Graph + Twitter Card meta on every page
- Animated counters, glassmorphic hero card, accessible FAQ accordion
- **Dedicated ERP spotlight** — D365 + Business Central as a key differentiator
- **Industries Served** section (8 industries)
- **Mission / Vision** clearly placed
- 10 pages: Home, About, Services, 4 service detail pages (GST, ITR, Business Reg, ERP), Contact, Privacy, Terms + 404
- ~30 KB CSS, ~3 KB JS — no build step required
- Custom domain ready (`CNAME`, `sitemap.xml`, `robots.txt` included)

---

## Project structure

```
AarvyaConsulting/
├── index.html                    Homepage
├── about.html                    Who We Are + Mission + Vision + values
├── services.html                 All 10 service categories + Industries
├── contact.html                  Form + map + WhatsApp
├── privacy.html
├── terms.html
├── 404.html
├── services/
│   ├── gst-filing.html
│   ├── itr-filing.html
│   ├── company-registration.html
│   └── erp-consulting.html       ⭐ D365 + Business Central
├── assets/
│   ├── css/styles.css            Single tokenized stylesheet
│   └── js/main.js                Nav, FAQ, counters, lead form
├── CNAME                         aarvyaconsulting.com
├── robots.txt
├── sitemap.xml
├── README.md                     This file
└── DEPLOYMENT.md                 Step-by-step GitHub Pages + GoDaddy guide
```

---

## ⚡ Before you go live — what's wired in vs what to update

### ✅ Already wired in (no action needed)

| Item | Value |
|---|---|
| Phone | `+91 92117 19725` |
| WhatsApp | `+91 92117 19725` (link: `https://wa.me/919211719725`) |
| Email | `aarvyaconsulting@gmail.com` |
| Domain | `aarvyaconsulting.com` (via `CNAME`) |
| Brand identity, services, mission/vision | Set per client brief |

### ⚠️ Replace before publishing

| Placeholder | Where | Replace with |
|---|---|---|
| `Office address line, City, State – PIN, India` | `index.html`, `contact.html` | Your real office address |
| Map `iframe src="https://www.google.com/maps?q=India&output=embed"` | `index.html`, `contact.html` | Your real Google Maps embed URL — get it from [maps.google.com](https://maps.google.com) → Share → Embed map |
| Social media links (`href="#"` on LinkedIn / Facebook / Instagram) | `index.html` footer | Your real social profile URLs (or remove unused icons) |
| Schema.org `address` block in `index.html` `<head>` JSON-LD | `index.html` | Real `streetAddress`, `addressLocality`, `addressRegion`, `postalCode` |
| Testimonials | `index.html` | Optional: replace placeholder names/quotes with real client testimonials once collected |

**Tip:** In VS Code, press `Ctrl+Shift+H` (Find & Replace across files), enter `Office address line`, and replace with your real address.

---

## Local preview

Just open `index.html` in your browser — no build step, no dependencies.

For best results (relative paths, fonts, etc.) serve via a local web server:

```powershell
# from the project folder
python -m http.server 8080
# then open http://localhost:8080
```

Or use the **VS Code Live Server** extension — right-click `index.html` → “Open with Live Server”.

---

## Deployment & domain

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for the full step-by-step guide:

1. Upload the project to GitHub
2. Enable GitHub Pages
3. Connect your `aarvyaconsulting.com` domain via GoDaddy DNS
4. Verify HTTPS / SSL

Beginner-friendly with clear, screenshot-style instructions.

---

## Customisation cheat-sheet

| Want to change | File | Where |
|---|---|---|
| Brand colors | `assets/css/styles.css` | `:root { --navy-800, --gold-500, ... }` at the top |
| Headline copy | `index.html` | `<section class="hero">` |
| Add / remove a service category | `services.html`, also reflect in `index.html` services grid + footer + nav submenu | Look for `.svc-block` (services.html) and `.svc-card` (homepage) |
| Mission / Vision text | `about.html`, `index.html` | Search for `Our Mission` and `Our Vision` |
| Industries Served | `index.html`, `services.html` | Look for `industries-grid` |
| Testimonials | `index.html` | Section with `t-card` |
| FAQ questions | `index.html`, service pages | Search for `faq__item` (also update FAQ JSON-LD in `<head>`) |
| Footer links | every page | Search for `class="footer__list"` |
| Working hours | every page topbar | Search for `Mon–Sat · 10:00–19:00` |
| Tagline / sub-brand | every page | Search for `Tax · Compliance · ERP` |

---

## Future roadmap (Phase 4)

The current site is a fast, conversion-focused brochure. Once leads start flowing, you can layer on:

1. **Blog** — drop in any static-site generator (Eleventy, Astro, Hugo) into a `/blog` folder; the design tokens in `styles.css` are reusable.
2. **Online appointment booking** — embed Calendly / Cal.com on the Contact page (one `<iframe>`).
3. **Client portal** — add a separate authenticated app at `portal.aarvyaconsulting.com` (Next.js + Supabase). Static marketing site stays as-is.
4. **Payments** — Razorpay Payment Pages link from service pages once pricing is finalised.
5. **Form backend** — replace the WhatsApp-redirect form with a real backend (Formspree, Web3Forms, or a Cloudflare Worker) to also email leads to `aarvyaconsulting@gmail.com`.
6. **Analytics** — add Plausible or GA4 in `<head>` of each page (we deliberately ship without trackers for speed and privacy).

---

## Tech & licence

- **Tech**: HTML5, CSS3 (custom properties, grid, flex), vanilla JS, Google Fonts (Plus Jakarta Sans + Playfair Display).
- **No frameworks**, no build tools, no `node_modules`.
- **Browser support**: all modern evergreen browsers; graceful degradation on older browsers.
- **Accessibility**: semantic landmarks, focus states, reduced-motion support, ARIA labels on interactive elements.

Code authored for Aarvya Consulting — adapt freely for your own deployment.
