# HANDOFF — Ilori Majeed website (read this first)

This file lets a new AI assistant (Antigravity) continue the project exactly where Claude Code stopped. Everything Claude did, decided and remembered is here.

## Latest checkpoint — 2026-10-27
- Phases 1–7 were approved by the owner.
- Phase 8 technical work is complete: SEO/social metadata, Person structured data, favicon, robots.txt, lazy image decoding, inert placeholder links, Vercel security headers, and final responsive/reduced-motion QA.
- `LAUNCH-CHECKLIST.md` lists every missing content item and the deployment decision.
- No deployment has been performed. Do not replace the old site or deploy until the owner explicitly chooses replacement versus a separate Vercel project and approves launch.

## 1. Who and what
- **Owner:** Ilori Majeed — AI voice agent developer and AI automation specialist.
- **Goal of the site:** present services, show work, get visitors to **book a call**.
- **Request:** build a new site that **looks like a screen recording** of a template the owner likes (analysed in section 3), using the owner's content. Do **not** copy the template's text, logos or photos.
- **Owner's rule for images:** wherever an image is needed, **put a labelled placeholder or ask the owner**.
- **Owner's rule for process:** build in **8 phases**; after each phase the owner looks at it and says "approved" before the next phase starts. Do not skip ahead.
- **Owner is non-technical.** Explain simply, give exact steps, keep replies short.

## 2. Where everything is
| What | Path |
|---|---|
| **NEW SITE (work here)** | `C:\Users\HP\Desktop\ilori majeed website\` |
| Old live site (do not change) | `C:\Users\HP\my website\` (index, about, services, portfolio, contact, privacy, 404, css/site.css, js/, vercel.json, assets/) |
| Older abandoned draft (ignore, do not change) | `C:\Users\HP\my website\new-site\` |
| The reference video | `C:\Users\HP\Downloads\Retell AI (5).mp4` (2:18, 1280×672). It shows the Webflow template **"Agencika"** (agencika.webflow.io), not Retell AI's site. |
| Claude's memory folder | `C:\Users\HP\.claude\projects\c--Users-HP-my-website\memory\` (copied into section 9) |

New-site files:
```
ilori majeed website/
  index.html        one long page; sections between <!-- ===== ... ===== --> comments
  css/style.css     tokens at the top (colors, fonts, sizes), then base, layout, type, buttons, placeholders, sections
  js/main.js        feature list; each feature only runs if its [data-...] element exists
  assets/img/       profile.jpg (owner photo), work-1.jpg, work-2.jpg (n8n screenshots, copied from the old site)
  README.md         phase table + "replace before going live" checklist
  HANDOFF.md        this file
```
Plain HTML/CSS/JS. **No build step.** Node and Python are NOT installed on this PC.

## 3. Design reference (what the video showed)
Dark agency template. Pages in the video: Home → About → Services → Works → Packages → Contact → Terms → Privacy.

### Home, top to bottom
1. **Loader:** dark grey screen, logo centered, fades out.
2. **Navbar:** logo half solid / half outlined; uppercase letter-spaced links; outlined pill "EXPLORE →"; cart icon.
3. **Hero:** big rounded photo card, black circular badge with **spinning text** ("LEARN MORE"); on scroll a giant word (DESIGN) appears with the **photo visible inside the letters**.
4. **3 feature cards** slide up one after another (big "DE/SIGN/ER" card, "360°", "HARDWORK ↗").
5. **Logo strip:** grey brand names scrolling sideways in a loop.
6. **Bento grid:** photos + dark cards; each card has a small label ("CONCEPT") and a big word half solid / half outlined ("RE**IMAGINE**").
7. **Services:** giant "SERVICES" heading. **Cards stack over each other on scroll**; each has a photo, title, grey tag pill and "VIEW MORE →". Behind them huge ghost-grey text "FROM CONCEPT TO CREATION".
8. **Featured Works:** giant "WORKS". Big project images **tilt in 3D as they scroll in**, then flatten; one card slides over the next.
9. **Testimonial slider:** big quote marks, uppercase quote, round avatar + name/title, 3 dots.
10. **Stats:** 4 dark cards (Projects 76, Clients 98, Awards 16, Designers 12); numbers **count up**, some solid, some outlined.
11. **Skills:** photo left; list right (Web Design 70%, Development 80%, UX/UI 90%, Branding 65%) with thin **progress bars that fill**.
12. **CTA:** "LET'S WORK TOGETHER" (solid line + outlined line) over a dark photo with tilted floating images; outlined "CONTACT" pill.
13. **Footer:** logo, 3 social icons, tagline, 3 link columns (Main / Pages / Utilities), divider, copyright row.

### Other pages
- **About:** "ABOUT" + paragraph + outlined "US"; full-width image; mission sentence that **turns grey→white word by word on scroll**; team slider; "Core Values" accordion (white bar "/01 HARDWORK ↗"); awards list with icons and years.
- **Packages:** "BUNDLES" heading; one rounded card with price and cyan "GET STARTED" button.
- **Contact:** dark form (Name, Email, Phone, Message) left; info cards with cyan round icons right (email, location, phone); FAQ accordion with "+" icons.

### Style
- **Colors:** background `#000`, cards `#141414`, ghost text `#3A3A3A`, muted `#A3A3A3`, white text, **single accent cyan `#1BA8D8`** (buttons, icons, link hover).
- **Font:** bold wide uppercase sans → **Archivo** (Google Fonts). Signature: **half the word solid, half outlined** (`.outline` class, `-webkit-text-stroke`).
- **Spacing:** huge headings (≈120–180px desktop), lots of black space, 16–20px radius.
- **Buttons:** outlined pill with arrow, or solid cyan rounded button.
- **Animations:** loader, spinning badge, text-with-image-inside, staggered slide-up, endless logo strip, stacking cards, 3D tilt, count-up, filling bars, word-by-word reveal, sliders, accordions, cyan hover.
- **Mobile:** not shown in the video. Design it ourselves: hamburger menu, one-column cards, smaller headings, turn off 3D tilt.

## 4. The owner's version (agreed content plan)
Single long page, sections in this order:
1. Loader — "ILORI MAJEED"
2. Navbar — logo **ILORI** solid + **MAJEED** outlined · Services · Process · Work · About · Contact · **BOOK A CALL →**
3. **Hero** — headline about AI voice agents/automation, subline, cyan **Book a call** button, large image card, spinning "BOOK A CALL" badge, giant **VOICE AI** word with image inside on scroll
4. Highlight cards — "24/7 answering", "Under 1s replies", "Hours saved weekly" (placeholder numbers)
5. Tools strip — n8n, Make, Retell, Vapi, Twilio, OpenAI, GoHighLevel, HubSpot (plain text, scrolling)
6. **Services** (`#services`) — stacking cards: **AI Voice Agents**, **AI Automation Workflows**, **Chatbot & CRM Integrations**
7. **How it works** (`#process`) — 4 steps as accordion: /01 Discovery call → /02 Build → /03 Test & launch → /04 Support
8. **Work** (`#work`) — tilting project cards: the 2 real n8n screenshots (`work-1.jpg`, `work-2.jpg`) + 2 placeholders
9. Results — count-up stats (placeholders)
10. Testimonials — slider, 3 placeholders
11. **About me** (`#about`) — heading, owner photo `profile.jpg`, word-by-word mission sentence, skill bars
12. FAQ (`#faq`) — 4–5 questions
13. **Contact / Book** (`#contact`) — "LET'S WORK TOGETHER", Book a call, short form, email + WhatsApp cards
14. Footer — name, social links (LinkedIn, X, YouTube, Instagram), quick links, copyright

**Left out on purpose:** shopping cart, team slider, awards list, pricing/packages (owner did not answer; default = skip).
**Defaults used because owner didn't answer:** one long page; placeholder booking link; no pricing section.

## 5. The 8 phases and status
| # | Phase | Status |
|---|---|---|
| 1 | Foundation — files, colors, font, buttons, placeholders, README | ✅ Approved |
| 2 | Site shell — loader, navbar + mobile menu, footer | ✅ **Built and tested. WAITING FOR OWNER'S "Phase 2 approved"** |
| 3 | Hero — headline, Book a call, image card, spinning badge, giant VOICE AI word, highlight cards, tools strip | ⏳ next |
| 4 | Services (stacking cards) + How it works (4-step accordion) | ⏳ |
| 5 | Work (tilt cards) + Results (counters) + Testimonials (slider) | ⏳ |
| 6 | About + FAQ + Contact / booking | ⏳ |
| 7 | Polish — hover effects, animation timing, reduced-motion, mobile/tablet fixes | ⏳ |
| 8 | Testing (phone/tablet/desktop), speed, SEO title/description, final replace-list, then deploy to Vercel **only with owner's approval** | ⏳ |

Loop for every phase: build → test in Chrome at desktop and mobile → owner looks → owner approves → next.

## 6. What exists in the code right now (Phase 1 + 2)
**index.html**
- `<html class="js">` flag set by an inline script (loader is hidden when JS is off).
- `.loader[data-loader]` — logo + cyan progress bar.
- `header.site-header[data-header]` — logo, `nav#site-nav[data-nav]` (5 links + mobile-only CTA), desktop `.header__cta`, `button.menu-toggle[data-menu-toggle]`.
- `<main id="top">` — currently holds a **temporary "style preview" section** (swatches, type samples, buttons, a card, an `.ph` placeholder, profile photo). **Delete it in Phase 3 when the Hero is added.** Phase 3–6 spots are marked with comments. Nav links point to `#services #process #work #about #contact`, and the footer to `#faq`; these anchors do not exist yet, so the links do nothing until Phases 4–6.
- `footer.site-footer` — logo, 4 social SVG icons (all `href="#"`), tagline, 3 columns, bottom row with `<span data-year>`.
- Marked placeholders: `REPLACE: booking link`, `REPLACE: social links`, `REPLACE: email, WhatsApp, location` (email is `you@example.com`).

**css/style.css** sections: 1 Design tokens (`:root` vars), 2 Base, 3 Layout helpers (`.container`, `.section`, `.grid`, `.visually-hidden`), 4 Typography (`.display`, `.h2`, `.h3`, `.eyebrow`, `.muted`, `.ghost-text`, `.outline`, `.outline--dark`), 5 Buttons (`.btn`, `.btn--accent`, `.btn--outline`, `.tag`), 6 Image placeholders (`.ph` — dashed box that says IMAGE NEEDED), 7 Sections (logo, loader, header/nav/mobile menu at ≤900px, footer, temporary preview styles). `--header-h` is 84px (72px under 560px); `main` has top padding for the fixed header; `[id]` has `scroll-margin-top`.

**js/main.js:** `features = [{selector, init}]` registry run on DOMContentLoaded; `reduceMotion` passed to each. Built: `initLoader` (min 900ms, max 2.5s), `initHeader` (glass background after 20px scroll; hides on scroll-down after 160px, returns on scroll-up), `initMenu` (toggle, closes on link click / Esc / resize to desktop; sets `body.menu-open`), `initYear`. **Add each new animation as a new entry in `features`.**

**Rules to keep:** respect `prefers-reduced-motion`; each JS feature must silently do nothing if its section is deleted; keep tokens in `:root`; use `.ph` placeholders instead of fake images; add every new placeholder to README "Replace before going live".

## 7. Testing notes (important — the environment is awkward)
- **Chrome extension tools could not open local files or localhost.** `http://localhost:5500` does NOT work for this site: no server is running and Claude's sandbox blocked starting a PowerShell HTTP server outside the sandbox. VS Code **Live Server is not installed**.
- **What worked:** headless Chrome screenshots:
  `"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --disable-gpu --hide-scrollbars --user-data-dir=<temp> --virtual-time-budget=4000 --window-size=W,H --screenshot=<out.png> file:///C:/Users/HP/Desktop/ilori%20majeed%20website/index.html`
  Run it with `Start-Process … -PassThru` and `WaitForExit(40000)`, otherwise the command hangs. Minimum window width is ~500–600px; 390px renders wider than asked, so phone layout was checked at 600px.
- To test the open mobile menu: copy `index.html` to a temp file, add `<base href="file:///C:/Users/HP/Desktop/ilori%20majeed%20website/">` after `<head>` and `class="menu-open"` on `<body>`, then screenshot.
- **How the owner views the site:** double-click `index.html` (or `Start-Process` it). Link: `file:///C:/Users/HP/Desktop/ilori%20majeed%20website/index.html`.
- **ffmpeg is installed** (winget Gyan.FFmpeg 9.0.2) at `C:\Users\HP\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-9.0.2-full_build\bin\` (not on PATH in running shells). Contact sheets of the video are in Claude's scratchpad: `C:\Users\HP\AppData\Local\Temp\claude\c--Users-HP-my-website\f40ac13d-1736-4cae-818d-6899908c83ac\scratchpad\sheets\` (sheet_01…17.png, one frame per 2s; zoom_*.png for the hero/works moments). If gone, re-extract with: `ffmpeg -i "Retell AI (5).mp4" -vf "fps=1/2,scale=960:-1,tile=2x2" sheet_%02d.png`.
- A copy of the video is at `…\scratchpad\video\retell.mp4`.
- Anything that downloads or installs needs the owner's explicit yes (they said yes to ffmpeg only; they have NOT answered whether to install Live Server).

## 8. Open items / questions for the owner
1. **"Phase 2 approved"?** (nothing is confirmed until they say so)
2. Install VS Code **Live Server** so `localhost:5500` works? (offered; no answer)
3. Real **booking link** (Calendly / Cal.com)?
4. Real **email, WhatsApp, city, social URLs**?
5. **Hero image** (1800×1100, dark/blue-toned) and any project images; testimonials, stats, about text?
6. Pricing/packages section? (default: skip)
7. Replace the old site (`C:\Users\HP\my website`) or deploy separately? (default: keep the old one untouched until the new one is approved; Phase 8 deploys to Vercel only with approval)

## 9. Claude's stored memory (verbatim, so nothing is lost)

**MEMORY.md (index)**
```
- [Local link after changes](local-link-after-changes.md) — end every reply that edits the site with http://localhost:5500
- [New site project](new-site-project.md) — fresh build on Desktop\ilori majeed website, 8 approval-gated phases
```

**local-link-after-changes.md**
```
---
name: local-link-after-changes
description: End every response that changes the website project with the local preview link http://localhost:5500
metadata:
  type: feedback
---
Whenever I make changes or code updates to the "my website" project, end the response with the local link `http://localhost:5500`.

Why: The user asked for this explicitly (2026-10-23) so they can open the updated site quickly in Chrome.

How to apply: Put the link last in any reply that edits project files. The site is served by a PowerShell static server script (not Live Server/npx — Node and Python aren't installed); if the server isn't running, restart it before giving the link. See [[website-contact-form-web3forms]].

Exception (2026-10-27): for the new Desktop site ([[new-site-project]]) the localhost link failed for the user — that server isn't running and starting one was blocked by the sandbox. For that project, open `index.html` in their browser with `Start-Process` and tell them the file path instead of giving the localhost link.
```
(The old site had a Web3Forms contact form — memory `website-contact-form-web3forms` is referenced but was not opened in this session; see `C:\Users\HP\my website\js\inquiry-form.js` and `contact.html` if the form should be reused.)

**new-site-project.md**
```
---
name: new-site-project
description: Ilori Majeed's new website is being built fresh on the Desktop in 8 approval-gated phases, styled after the Agencika Webflow template
metadata:
  type: project
---
New site lives at C:\Users\HP\Desktop\ilori majeed website (user asked for a fresh folder they can see; NOT my website\new-site, which is an older draft to leave alone). Built in 8 phases; the status table is in that folder's README.md. User approves each phase before the next.

Why: The user wants a "super solid process" and to see it on their Desktop.
How to apply: Continue from the next pending phase in README.md. Style reference is the dark Agencika template from the screen recording (black, Archivo, half-solid/half-outlined words, cyan #1BA8D8). Use "IMAGE NEEDED" .ph placeholders wherever images are missing, and ask when real content is needed.
```

## 10. How to continue (for Antigravity)
1. Read this file, then `README.md`, `css/style.css` (tokens + sections), `js/main.js`, `index.html`.
2. Do **not** start Phase 3 until the owner says Phase 2 is approved. If they ask to proceed, build **Phase 3 only**: remove the temporary style-preview section, add Hero (headline + subline + cyan Book a call button, `.ph` image card "Hero image 1800×1100", spinning circular badge, giant `VOICE AI` word with image-inside-text effect and a placeholder fallback), 3–4 highlight cards, scrolling tools strip. Add JS features to the `features` array. Update README status and replace-list.
3. Test with headless Chrome (section 7), show the owner, wait for approval, repeat.
4. Keep the owner's tone: short, plain, step-by-step. Give the file path to open the site (the localhost link does not work unless Live Server is installed and running).
