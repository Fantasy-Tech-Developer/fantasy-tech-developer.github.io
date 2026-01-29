/* =========================================================
   Fantasy Tech Developer - main.js
   Purpose: lightweight UI interactions for GitHub Pages
   Features:
   1) Smooth scroll for internal anchors
   2) Active nav link highlight on scroll (ScrollSpy)
   3) Sticky header shadow on scroll
   4) Back-to-top button
   5) Simple reveal-on-scroll animation
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Config ----------
  const header = document.querySelector(".navbar");
  const navLinks = Array.from(document.querySelectorAll(".navbar a[href^='#']"));
  const sections = navLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  // ---------- 1) Smooth scroll ----------
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      const headerH = header ? header.offsetHeight : 0;
      const top = targetEl.getBoundingClientRect().top + window.pageYOffset - headerH - 12;

      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", targetId);
    });
  });

  // ---------- 2) ScrollSpy (active nav link) ----------
  function setActiveLink() {
    const scrollPos = window.scrollY + (header ? header.offsetHeight : 0) + 60;

    let currentId = null;
    for (const section of sections) {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        currentId = `#${section.id}`;
        break;
      }
    }

    navLinks.forEach((a) => {
      const isActive = a.getAttribute("href") === currentId;
      a.classList.toggle("active", isActive);
    });
  }

  // ---------- 3) Header shadow on scroll ----------
  function updateHeaderShadow() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  }

  // ---------- 4) Back-to-top button ----------
  const backToTop = document.createElement("button");
  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.textContent = "↑";
  document.body.appendChild(backToTop);

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function toggleBackToTop() {
    backToTop.classList.toggle("show", window.scrollY > 500);
  }

  // ---------- 5) Reveal on scroll (simple animation) ----------
  const revealTargets = document.querySelectorAll("section, .grid > div, footer");
  revealTargets.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealTargets.forEach((el) => io.observe(el));

  // ---------- Initial run + listeners ----------
  setActiveLink();
  updateHeaderShadow();
  toggleBackToTop();

  window.addEventListener("scroll", () => {
    setActiveLink();
    updateHeaderShadow();
    toggleBackToTop();
  });

  window.addEventListener("resize", setActiveLink);
});

