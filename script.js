const artworks = [
  {
    title: "Hiyam — Thesis Film",
    type: "Film Visual",
    category: "Film",
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/disp_webp/46c7da230892629.692ff627ec6ed.png",
  },
  {
    title: "ALLAT WA AL'UZZA",
    type: "Character Concept",
    category: "Illustration",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/8c72ed244007575.Y3JvcCw3MTAsNTU1LDI0NCwxMzA.png",
  },
  {
    title: "Palestinian Digital Paintings",
    type: "Digital Painting",
    category: "Illustration",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/296225174001165.Y3JvcCwxMDA2LDc4NywwLDEyMTA.png",
  },
  {
    title: "Procrastination",
    type: "Animated Short",
    category: "Film",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/5d1a1d177407121.Y3JvcCw4NTYsNjcwLDU1LDA.png",
  },
  {
    title: "City of Happiness",
    type: "Illustration",
    category: "Illustration",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/65527c168669749.Y3JvcCw2NjEsNTE3LDIwNiww.jpeg",
  },
  {
    title: "Bon Alameed Redesign",
    type: "Branding",
    category: "Branding",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/45f857189664341.Y3JvcCw1OTcsNDY3LDM3OCwxNzk.png",
  },
];

const gallery = document.getElementById("gallery");
const filters = document.getElementById("filters");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxMeta = document.getElementById("lightboxMeta");
const closeBtn = document.getElementById("closeBtn");
const cursorOrb = document.getElementById("cursorOrb");

const categories = ["All", ...new Set(artworks.map((item) => item.category))];
let currentCategory = "All";

function renderFilters() {
  filters.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.toggle("active", category === currentCategory);

    button.addEventListener("click", () => {
      currentCategory = category;
      renderFilters();
      renderGallery();
    });

    filters.appendChild(button);
  });
}

function renderGallery() {
  gallery.innerHTML = "";
  const filtered = artworks.filter(
    (item) => currentCategory === "All" || item.category === currentCategory,
  );

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card reveal";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" loading="lazy" />
      <h3>${item.title}</h3>
      <p>${item.type}</p>
    `;

    card.addEventListener("click", () => {
      lightboxImage.src = item.image;
      lightboxTitle.textContent = item.title;
      lightboxMeta.textContent = `${item.type} · ${item.category}`;
      lightbox.showModal();
    });

    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    gallery.appendChild(card);
  });

  observeReveal();
}

function observeReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

renderFilters();
renderGallery();
observeReveal();

closeBtn.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.open) lightbox.close();
});

window.addEventListener("pointermove", (event) => {
  cursorOrb.style.opacity = "1";
  cursorOrb.style.left = `${event.clientX}px`;
  cursorOrb.style.top = `${event.clientY}px`;
});
