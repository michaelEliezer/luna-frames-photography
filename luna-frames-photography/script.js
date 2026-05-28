// Luna Frames — interactions

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.classList.toggle("open", isOpen);
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    const navHeight = document.getElementById("nav")?.offsetHeight || 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 14;

    window.scrollTo({ top: targetTop, behavior: "smooth" });
    history.pushState(null, "", href);
  });
});

const revealItems = document.querySelectorAll(".section, .gallery-card, .service-card, .about-card, .contact-inner");
revealItems.forEach((item) => item.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

const form = document.querySelector(".form");
const note = document.getElementById("formNote");

if (form && note) {
  form.addEventListener("submit", () => {
    note.textContent = "Sending inquiry...";
    note.style.color = "var(--accent)";
  });
}
