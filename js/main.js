// Fantasy Tech Developer — main.js
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  function setMenu(open) {
    if (!mobileNav || !menuBtn) return;
    mobileNav.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
  }

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("open");
      setMenu(!isOpen);
    });

    // close on link click
    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });
  }

  // Smooth scroll for anchors
  const header = document.querySelector(".header");
  const headerH = () => (header ? header.offsetHeight : 0);

  document.querySelectorAll("a[href^='#']").forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerH() - 12;
      window.scrollTo({ top, behavior: "smooth" });
      history.replaceState(null, "", id);
    });
  });

  // Back-to-top button
  const toTop = document.getElementById("toTop");
  const toggleTop = () => {
    if (!toTop) return;
    toTop.classList.toggle("show", window.scrollY > 550);
  };
  toggleTop();
  window.addEventListener("scroll", toggleTop);

  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Contact form -> mailto (no backend needed)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      const name = (fd.get("name") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const service = (fd.get("service") || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();

      const subject = encodeURIComponent(`[Project Inquiry] ${service} — ${name}`);
      const body = encodeURIComponent(
`Hello Fantasy Tech Developer,

Name: ${name}
Email: ${email}
Service: ${service}

Project details:
${message}

Thanks!`
      );

      // Change to your real email if needed
      const to = "fantasytechdeveloper@gmail.com";
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }
});
