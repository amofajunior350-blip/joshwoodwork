document.getElementById("year").textContent = new Date().getFullYear();

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".heading, .cards article, .gallery figure, .story-copy, .story-photo, .cta").forEach((x) => {
  x.classList.add("reveal");
});

document.querySelectorAll(".reveal").forEach((x) => io.observe(x));

const stage = document.getElementById("stage");
window.addEventListener("pointermove", (event) => {
  if (!stage || innerWidth < 900) return;

  const x = (event.clientX / innerWidth - 0.5) * 2;
  const y = (event.clientY / innerHeight - 0.5) * 2;

  stage.style.transform = `perspective(1100px) rotateY(${x * 2}deg) rotateX(${y * -1}deg)`;
});

document.querySelectorAll(".gallery figure").forEach((fig) => {
  fig.addEventListener("click", () => {
    const image = fig.querySelector("img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");

    if (image && lightbox && lightboxImg) {
      lightboxImg.src = image.src;
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
    }
  });
});

const lightbox = document.getElementById("lightbox");
const closeLightboxBtn = document.querySelector(".lightbox button");

closeLightboxBtn.addEventListener("click", () => {
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden", "true");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
  }
});

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  const isOpen = nav.dataset.open === "1";
  nav.dataset.open = isOpen ? "0" : "1";
  nav.style.display = isOpen ? "none" : "flex";

  if (!isOpen) {
    nav.style.position = "absolute";
    nav.style.right = "5vw";
    nav.style.top = "70px";
    nav.style.flexDirection = "column";
    nav.style.background = "#17100e";
    nav.style.padding = "18px";
    nav.style.borderRadius = "15px";
    nav.style.boxShadow = "0 18px 40px rgba(0,0,0,.35)";
    hamburger.setAttribute("aria-expanded", "true");
  } else {
    nav.style.position = "";
    nav.style.right = "";
    nav.style.top = "";
    nav.style.flexDirection = "";
    nav.style.background = "";
    nav.style.padding = "";
    nav.style.borderRadius = "";
    nav.style.boxShadow = "";
    hamburger.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      cards.forEach((card) => {
        const shouldShow = filter === "all" || card.dataset.category === filter;
        card.style.display = shouldShow ? "" : "none";
      });
    });
  });
});

