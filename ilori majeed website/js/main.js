/* =========================================================
   Ilori Majeed — main script
   Each feature only runs if its section exists on the page,
   so you can delete any section without breaking the rest.
   ========================================================= */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Register features here as they are built (one per phase).
const features = [
  { selector: "[data-loader]", init: initLoader },
  { selector: "[data-header]", init: initHeader },
  { selector: "[data-menu-toggle]", init: initMenu },
  { selector: ".nav__list", init: initNavSpy },
  { selector: "[data-hero]", init: initHero },
  { selector: "[data-highlights]", init: initHighlights },
  { selector: "[data-accordion]", init: initAccordion },
  { selector: "[data-work-gallery]", init: initWorkTilt },
  { selector: "[data-results]", init: initCounters },
  { selector: "[data-testimonials]", init: initTestimonials },
  { selector: "[data-mission]", init: initMission },
  { selector: "[data-skills]", init: initSkills },
  { selector: "[data-contact-form]", init: initContactForm },
  { selector: "[data-placeholder-link]", init: initPlaceholderLinks },
  { selector: "[data-reveal], [data-reveal-group]", init: initReveals },
  { selector: "[data-year]", init: initYear },
];

// Loader: fades out once the page has loaded (max 2.5s wait).
function initLoader([loader], { reduceMotion }) {
  const hide = () => loader.classList.add("is-done");
  if (reduceMotion) return hide();
  const minShow = new Promise((r) => setTimeout(r, 900));
  const loaded = new Promise((r) => (document.readyState === "complete" ? r() : window.addEventListener("load", r, { once: true })));
  const maxWait = new Promise((r) => setTimeout(r, 2500));
  Promise.race([Promise.all([minShow, loaded]), maxWait]).then(hide);
}

// Header: dark glass background after scrolling; hides on scroll down, returns on scroll up.
function initHeader([header]) {
  let lastY = window.scrollY;
  const update = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 20);
    const menuOpen = document.body.classList.contains("menu-open");
    header.classList.toggle("is-hidden", !menuOpen && y > 160 && y > lastY);
    lastY = y;
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

// Mobile menu: full-screen overlay. Closes on link click, Escape, or resizing to desktop.
function initMenu([toggle]) {
  const nav = document.getElementById(toggle.getAttribute("aria-controls"));
  const label = toggle.querySelector(".visually-hidden");
  const setOpen = (open) => {
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    label.textContent = open ? "Close menu" : "Open menu";
  };
  toggle.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
}

// Navigation: indicate the section currently passing through the reading area.
function initNavSpy([nav]) {
  const links = [...nav.querySelectorAll('a[href^="#"]')]
    .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
    .filter((item) => item.section);
  let ticking = false;
  const update = () => {
    const marker = window.scrollY + window.innerHeight * .34;
    let current = null;
    links.forEach((item) => { if (item.section.offsetTop <= marker) current = item; });
    links.forEach((item) => {
      const active = item === current;
      item.link.classList.toggle("is-active", active);
      if (active) item.link.setAttribute("aria-current", "location");
      else item.link.removeAttribute("aria-current");
    });
    ticking = false;
  };
  const queueUpdate = () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  };
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  update();
}

// Hero: reveal on load and move the oversized VOICE AI word through the image on scroll.
function initHero([hero], { reduceMotion }) {
  requestAnimationFrame(() => hero.classList.add("is-ready"));
  if (reduceMotion) return;
  const visual = hero.querySelector("[data-hero-visual]");
  const word = hero.querySelector(".hero__image-word");
  let ticking = false;
  const update = () => {
    const rect = visual.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
    word.style.setProperty("--hero-word-y", `${(1 - progress) * 26}px`);
    word.style.setProperty("--hero-word-opacity", String(.45 + progress * .55));
    ticking = false;
  };
  const queueUpdate = () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  };
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  update();
}

// Highlights: reveal the three cards one after another when they enter the viewport.
function initHighlights([section], { reduceMotion }) {
  const cards = section.querySelectorAll(".highlight-card");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      cards.forEach((card, index) => setTimeout(() => card.classList.add("is-visible"), index * 130));
      observer.disconnect();
    });
  }, { threshold: .2 });
  observer.observe(section);
}

// Process accordion: one focused step is open at a time.
function initAccordion(accordions) {
  accordions.forEach((accordion) => {
    const items = [...accordion.querySelectorAll(".accordion__item")];
    items.forEach((item) => {
      const button = item.querySelector("button");
      button.addEventListener("click", () => {
        const willOpen = !item.classList.contains("is-open");
        items.forEach((entry) => {
          entry.classList.remove("is-open");
          entry.querySelector("button").setAttribute("aria-expanded", "false");
        });
        if (willOpen) {
          item.classList.add("is-open");
          button.setAttribute("aria-expanded", "true");
        }
      });
    });
  });
}

// Work cards: enter with perspective and flatten as they move into view.
function initWorkTilt([gallery], { reduceMotion }) {
  const cards = [...gallery.querySelectorAll("[data-tilt-card]")];
  if (reduceMotion || window.matchMedia("(max-width: 900px)").matches) return;
  let ticking = false;
  const update = () => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * .72)));
      card.style.setProperty("--work-tilt", `${(1 - progress) * 8}deg`);
      card.style.setProperty("--work-scale", String(.95 + progress * .05));
    });
    ticking = false;
  };
  const queueUpdate = () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  };
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  update();
}

// Results: ready for verified values; zero placeholders remain visibly 00.
function initCounters([section], { reduceMotion }) {
  const counters = [...section.querySelectorAll("[data-count]")];
  const run = () => {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.count) || 0;
      if (!target) { counter.textContent = "00"; return; }
      if (reduceMotion) { counter.textContent = String(target); return; }
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };
  if (reduceMotion || !("IntersectionObserver" in window)) return run();
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) { run(); observer.disconnect(); }
  }, { threshold: .3 });
  observer.observe(section);
}

// Testimonial slider: buttons and dots update one accessible slide at a time.
function initTestimonials([section], { reduceMotion }) {
  const track = section.querySelector("[data-slider-track]");
  const slides = [...section.querySelectorAll("[data-slide]")];
  const dots = [...section.querySelectorAll("[data-slide-dot]")];
  const previous = section.querySelector("[data-slide-prev]");
  const next = section.querySelector("[data-slide-next]");
  let index = 0;
  let timer;

  const show = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, slideIndex) => slide.setAttribute("aria-hidden", String(slideIndex !== index)));
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === index);
      if (dotIndex === index) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });
  };
  const stop = () => clearInterval(timer);
  const start = () => {
    if (!reduceMotion) timer = setInterval(() => show(index + 1), 6500);
  };
  previous.addEventListener("click", () => { show(index - 1); stop(); start(); });
  next.addEventListener("click", () => { show(index + 1); stop(); start(); });
  dots.forEach((dot) => dot.addEventListener("click", () => { show(Number(dot.dataset.slideDot)); stop(); start(); }));
  section.addEventListener("mouseenter", stop);
  section.addEventListener("mouseleave", start);
  section.addEventListener("focusin", stop);
  section.addEventListener("focusout", start);
  show(0);
  start();
}

// Mission: words move from grey to white as the statement crosses the viewport.
function initMission([mission], { reduceMotion }) {
  const words = [...mission.querySelectorAll(".mission__word")];
  if (reduceMotion) {
    words.forEach((word) => word.classList.add("is-active"));
    return;
  }
  let ticking = false;
  const update = () => {
    const rect = mission.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, (window.innerHeight * .78 - rect.top) / (rect.height * .72)));
    const activeCount = Math.ceil(progress * words.length);
    words.forEach((word, index) => word.classList.toggle("is-active", index < activeCount));
    ticking = false;
  };
  const queueUpdate = () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  };
  window.addEventListener("scroll", queueUpdate, { passive: true });
  window.addEventListener("resize", queueUpdate);
  update();
}

// Skills: fill each bar once it enters view. Values remain labelled placeholders until confirmed.
function initSkills([section], { reduceMotion }) {
  const bars = [...section.querySelectorAll("[data-level]")];
  const fill = () => bars.forEach((bar) => bar.style.setProperty("--level", `${bar.dataset.level}%`));
  if (reduceMotion || !("IntersectionObserver" in window)) return fill();
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) { fill(); observer.disconnect(); }
  }, { threshold: .25 });
  observer.observe(section);
}

// Contact form: validate, submit to the verified Web3Forms destination, and show inline status.
function initContactForm(forms) {
  forms.forEach((form) => {
    const button = form.querySelector('button[type="submit"]');
    const label = form.querySelector("[data-submit-label]");
    const status = form.querySelector("[data-form-status]");
    const idleLabel = label.textContent;
    let sending = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (sending) return;
      if (!form.checkValidity()) { form.reportValidity(); return; }

      const data = new FormData(form);
      if (data.get("botcheck")) {
        form.reset();
        status.textContent = "Thank you. Your inquiry has been received.";
        return;
      }

      sending = true;
      button.disabled = true;
      label.textContent = "Sending…";
      status.className = "form-status";
      status.textContent = "";

      try {
        const response = await fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || "Submission failed");
        form.reset();
        status.classList.add("is-success");
        status.textContent = "Thank you — your inquiry has been sent.";
      } catch (error) {
        console.error("Inquiry not sent:", error);
        status.classList.add("is-error");
        status.textContent = "Your message could not be sent. Please use the email or WhatsApp option beside the form.";
      } finally {
        sending = false;
        button.disabled = false;
        label.textContent = idleLabel;
        status.focus();
      }
    });
  });
}

// General section reveals, with a stagger for grouped cards or accordion rows.
function initReveals(elements, { reduceMotion }) {
  const reveal = (element) => {
    if (element.dataset.revealed === "true") return;
    element.dataset.revealed = "true";
    if (element.hasAttribute("data-reveal-group")) {
      [...element.children].forEach((child, index) => {
        child.style.setProperty("--reveal-delay", `${index * 75}ms`);
        child.classList.add("is-revealed");
      });
    } else {
      element.classList.add("is-revealed");
    }
  };
  if (reduceMotion || !("IntersectionObserver" in window)) {
    elements.forEach(reveal);
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      reveal(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -6%" });
  elements.forEach((element) => observer.observe(element));

  // IntersectionObserver can miss an instant anchor jump in some local-file browsers.
  // This lightweight fallback also covers restored scroll positions on page load.
  let ticking = false;
  const revealVisible = () => {
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * .94 && rect.bottom > 0) {
        reveal(element);
        observer.unobserve(element);
      }
    });
    ticking = false;
  };
  const queueReveal = () => {
    if (!ticking) { requestAnimationFrame(revealVisible); ticking = true; }
  };
  window.addEventListener("scroll", queueReveal, { passive: true });
  window.addEventListener("resize", queueReveal);
  requestAnimationFrame(revealVisible);
}

// Unfinished external links stay inert until their real URLs are supplied.
function initPlaceholderLinks(links) {
  links.forEach((link) => link.addEventListener("click", (event) => event.preventDefault()));
}

function initYear(els) {
  els.forEach((el) => { el.textContent = new Date().getFullYear(); });
}

document.addEventListener("DOMContentLoaded", () => {
  features.forEach(({ selector, init }) => {
    const els = document.querySelectorAll(selector);
    if (els.length) init(els, { reduceMotion });
  });
});
