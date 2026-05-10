# Deployment Guide — Aarvya Consulting

This guide takes you from **a fresh GitHub account** to a **live website at https://aarvyaconsulting.com** with HTTPS — even if you’ve never used Git or GitHub before.

Total time: **20–40 minutes** (most of it is waiting for DNS to propagate).

---

## What you need before you start

| Item | Where to get it |
|---|---|
| GitHub account | [github.com](https://github.com) — free |
| The website code | This folder (`AarvyaConsulting`) |
| GoDaddy domain | You already own `aarvyaconsulting.com` |
| Git installed (optional) | [git-scm.com/download](https://git-scm.com/download) — only needed for command-line upload |

---

## Step 1 — Replace all placeholders in the code

Before deploying, update the placeholder phone, email and address. See the **README.md** “Before you go live” section.

Quick checklist:

- [ ] Replace `+91 70428 33440` with real phone everywhere
- [ ] Replace `917042833440` (no `+`) with real WhatsApp number everywhere
- [ ] Replace `aarvyaconsulting@gmail.com` with real email everywhere
- [ ] Replace office address with real address (in `index.html` and `contact.html`)
- [ ] Replace Google Maps `iframe src` with your real embed URL

Use VS Code’s **Find & Replace across files** (`Ctrl+Shift+H`) — fastest way.

---

## Step 2 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in.
2. Click the **`+`** icon (top right) → **New repository**.
3. Fill in:
   - **Repository name:** `aarvyaconsulting.com` (or any name — `aarvya-website` is fine)
   - **Visibility:** **Public** *(GitHub Pages on free accounts requires public repos for custom domains)*
   - Leave **Add a README** unchecked (we already have one)
4. Click **Create repository**.

---

## Step 3 — Upload the website files to GitHub

You have two options. Pick whichever is easier for you.

### Option A — Drag & drop in the browser (no Git needed) ⭐ recommended for beginners

1. On your new empty repo page, click the **“uploading an existing file”** link (or drag-drop area).
2. Open File Explorer at `D:\AarvyaConsulting`. **Select all files and folders** (Ctrl+A) — including hidden files.
3. **Drag everything** into the GitHub upload area in your browser.
4. Wait for all files to finish uploading (status bars at the bottom).
5. Scroll down. In the **Commit changes** box, type a message like *“Initial site launch”* and click **Commit changes**.

> **Tip:** if drag-drop misses subfolders, use the **“choose your files”** link instead and select the entire folder.

### Option B — Command line with Git (if you prefer)

Open PowerShell in `D:\AarvyaConsulting` and run:

```powershell
git init
git add .
git commit -m "Initial site launch"
git branch -M main
git remote add origin https://github.com/abhi2504/aarvyaconsulting.com.git
git push -u origin main
```

(GitHub will prompt for login the first time.)

---

## Step 4 — Enable GitHub Pages

1. In your repo, click the **Settings** tab (top-right).
2. Scroll down to **Pages** in the left sidebar.
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
   - Click **Save**.
5. GitHub will start publishing. Wait 1–3 minutes.

After a moment, the page will show:

> **Your site is live at** `https://abhi2504.github.io/aarvyaconsulting.com/`

Click that URL — you should see your homepage. ✅

> If it doesn’t load yet, refresh after another minute. First publish can take up to 5 minutes.

---

## Step 5 — Connect your custom domain `aarvyaconsulting.com`

This has **two halves** — telling GitHub the domain, and telling GoDaddy where to point it.

### 5a. Tell GitHub the custom domain

1. In your repo: **Settings → Pages**.
2. Under **Custom domain**, enter: `aarvyaconsulting.com`
3. Click **Save**.

> A `CNAME` file with your domain is already in this project. GitHub will use it automatically.

You’ll see a banner saying *“DNS check in progress”* — that’s expected. We’ll fix DNS in the next step.

### 5b. Configure DNS in GoDaddy

1. Sign in to [godaddy.com](https://godaddy.com).
2. Click your profile (top right) → **My Products**.
3. Find `aarvyaconsulting.com` → click **DNS** (or **Manage DNS**).
4. You will see a table of DNS records. **Delete any existing `A` records pointing the apex (`@`) elsewhere**, and any existing `CNAME` for `www`.
5. **Add four `A` records** pointing the apex (`@`) to GitHub Pages:

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 1 hour |
| A | `@` | `185.199.109.153` | 1 hour |
| A | `@` | `185.199.110.153` | 1 hour |
| A | `@` | `185.199.111.153` | 1 hour |

6. **Add one `CNAME` record** for `www`:

| Type | Host / Name | Value | TTL |
|---|---|---|---|
| CNAME | `www` | `abhi2504.github.io` | 1 hour |

> Replace `YOUR-USERNAME` with your actual GitHub username. **Do not include `https://` or a trailing slash.** GoDaddy may add a trailing dot — that’s fine.

7. Click **Save** for each record.

### 5c. Wait for DNS propagation

DNS changes can take **5 minutes to 24 hours** to spread worldwide. Most of the time it’s under an hour.

While waiting, check progress at:
- [dnschecker.org](https://dnschecker.org) — enter `aarvyaconsulting.com` and choose `A`
- You should eventually see all four IPs (`185.199.108.153` etc.) in green across most regions.

---

## Step 6 — Enable HTTPS (free SSL)

1. Go back to your repo: **Settings → Pages**.
2. Under **Custom domain**, the *“DNS check”* will eventually turn green ✅.
3. Once green, the **Enforce HTTPS** checkbox becomes available — **tick it**.

That’s it. Your site is now served over `https://aarvyaconsulting.com` with a valid SSL certificate (auto-renewed by GitHub forever, free).

---

## Step 7 — Final test

Visit each of these URLs and confirm they load:

- [ ] `https://aarvyaconsulting.com/`
- [ ] `https://www.aarvyaconsulting.com/` *(should auto-redirect to the apex)*
- [ ] `https://aarvyaconsulting.com/services.html`
- [ ] `https://aarvyaconsulting.com/services/gst-filing.html`
- [ ] `https://aarvyaconsulting.com/contact.html`

Test on mobile too — use your phone’s real network (not Wi-Fi) to confirm DNS is propagated globally.

Click the WhatsApp button on mobile — it should open the WhatsApp app with your prefilled message.

---

## Updating the website later

Whenever you change anything (a service price, a phone number, a testimonial):

### Browser method
1. Open the file in your GitHub repo.
2. Click the ✏️ pencil icon (top right of the file viewer).
3. Edit, scroll down, click **Commit changes**.
4. GitHub Pages auto-rebuilds in 1–2 minutes.

### Git method
```powershell
git add .
git commit -m "Update phone number"
git push
```

The live site updates automatically.

---

## Common issues & fixes

| Problem | Fix |
|---|---|
| “There isn’t a GitHub Pages site here” | Wait 3-5 min after first commit. Re-check **Settings → Pages**. Make sure repo is **Public**. |
| `aarvyaconsulting.com` shows GoDaddy parking page | DNS hasn’t propagated yet. Wait, then flush local DNS: `ipconfig /flushdns` in PowerShell. |
| HTTPS checkbox is greyed out | DNS check is still failing. Confirm your A records exactly match the four IPs above. |
| `www` works but apex `aarvyaconsulting.com` doesn’t | You forgot one or more `A` records. All four are required. |
| WhatsApp link opens to wrong number | You missed a placeholder. Search the codebase for `917042833440` and replace. |
| Form submits but nothing happens | Form opens WhatsApp by design. To capture leads to email, integrate Formspree or Web3Forms (see README → Future roadmap). |

---

## Maintenance summary

| Task | Frequency | How |
|---|---|---|
| Update phone / email / address | As needed | Edit the relevant HTML, commit |
| Add a new service | When you add a service line | Copy a `.svc-card` block in `services.html` and paste a new entry |
| Add a blog post | Future (Phase 4) | See README → Future roadmap |
| Renew domain | Yearly via GoDaddy | GoDaddy auto-renew recommended |
| Renew SSL | Never (GitHub handles it for free, forever) | — |

---

You’re live. 🎉

If anything in this guide is unclear, message us on WhatsApp — we’ll happily walk you through it.
