// ==============================
// HIMALAYAN WILDLIFE JOURNEY
// Main JavaScript
// ==============================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
let lastMenuTrigger = null;

function closeMainNav(restoreFocus = false) {
  if (!mainNav || !menuToggle) return;

  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';

  if (restoreFocus && lastMenuTrigger) {
    lastMenuTrigger.focus();
    lastMenuTrigger = null;
  }
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';

    if (open) {
      lastMenuTrigger = menuToggle;
      mainNav.querySelector("a")?.focus();
    } else {
      lastMenuTrigger = null;
    }
  });

  document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", () => {
      closeMainNav();
    });
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && mainNav.classList.contains("open")) {
      closeMainNav(true);
    }
  });

  document.addEventListener("click", event => {
    if (
      mainNav.classList.contains("open") &&
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMainNav();
    }
  });
}

const navLinks = Array.from(document.querySelectorAll(".main-nav a:not(.nav-cta)"))
  .filter(link => link.hash);
const sections = navLinks
  .map(link => document.querySelector(link.hash))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length && navLinks.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove("active"));
          const active = document.querySelector(`#mainNav a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach(section => observer.observe(section));
}

const videoModal = document.getElementById("videoModal");
const watchVideo = document.getElementById("watchVideo");
const closeVideoButton = document.getElementById("closeVideo");

function closeVideo() {
  if (videoModal) {
    videoModal.classList.remove("show");
    videoModal.setAttribute("aria-hidden", "true");
  }
}

if (watchVideo?.tagName === "BUTTON" && videoModal) {
  watchVideo.addEventListener("click", () => {
    videoModal.classList.add("show");
    videoModal.setAttribute("aria-hidden", "false");
  });
}

if (closeVideoButton) {
  closeVideoButton.addEventListener("click", closeVideo);
}

if (videoModal) {
  videoModal.addEventListener("click", e => {
    if (e.target === videoModal) closeVideo();
  });
}

const galleryItems = [
  { src: "images/chandrashila.jpeg", alt: "Mountain trail photograph associated with the Chopta–Tungnath–Chandrashila trek", title: "Chandrashila Trek", location: "Exact photo location to be confirmed", category: "Himalayan Treks", categories: ["Himalayan Treks", "Mountain Landscapes", "Camping and Trekking Experiences"], description: "A photograph from the existing trek collection. Exact photo location and date are to be confirmed.", trekKey: "chopta" },
  { src: "images/kartik swami.jpeg", alt: "Kartik Swami trek photograph from the existing collection", title: "Kartik Swami Trek", location: "Exact photo location to be confirmed", category: "Himalayan Treks", categories: ["Himalayan Treks", "Camping and Trekking Experiences", "Local Villages and Himalayan Culture"], description: "A photograph associated with the Kartik Swami route. Exact photo location and date are to be confirmed.", trekKey: "kartik" },
  { src: "images/kedarnath.jpeg", alt: "Kedarnath trek photograph from the existing collection", title: "Kedarnath Trek", location: "Exact photo location to be confirmed", category: "Himalayan Treks", categories: ["Himalayan Treks", "Mountain Landscapes", "Camping and Trekking Experiences", "Local Villages and Himalayan Culture"], description: "A photograph associated with the Kedarnath route. Exact photo location and date are to be confirmed.", trekKey: "kedarnath" },
  { src: "images/badhanitaal.jpeg", alt: "Badhani Tal landscape photograph from the existing collection", title: "Badhani Tal", location: "Exact photo location to be confirmed", category: "Mountain Landscapes", categories: ["Himalayan Treks", "Mountain Landscapes", "Wildlife and Nature", "Camping and Trekking Experiences"], description: "A landscape photograph associated with Badhani Tal. Exact photo location and date are to be confirmed.", trekKey: "badhani" },
  { src: "images/madhyameshwar.jpeg", alt: "Madhyamaheshwar trek landscape photograph from the existing collection", title: "Madhyamaheshwar Trek", location: "Exact photo location to be confirmed", category: "Himalayan Treks", categories: ["Himalayan Treks", "Mountain Landscapes", "Camping and Trekking Experiences", "Local Villages and Himalayan Culture"], description: "A photograph associated with the Madhyamaheshwar route. Exact photo location and date are to be confirmed.", trekKey: "madhy" },
  { src: "images/triyuginarayan.jpeg", alt: "Triyuginarayan trek photograph from the existing collection", title: "Triyuginarayan Trek", location: "Exact photo location to be confirmed", category: "Himalayan Treks", categories: ["Himalayan Treks", "Mountain Landscapes", "Camping and Trekking Experiences", "Local Villages and Himalayan Culture"], description: "A photograph associated with the Triyuginarayan route. Exact photo location and date are to be confirmed.", trekKey: "triyu" },
  { src: "images/tungnath.jpeg", alt: "Tungnath mountain and trail photograph from the existing collection", title: "Tungnath Trail", location: "Exact photo location to be confirmed", category: "Mountain Landscapes", categories: ["Himalayan Treks", "Mountain Landscapes", "Camping and Trekking Experiences"], description: "A mountain photograph from the existing trekking collection. Exact photo location and date are to be confirmed.", trekKey: "chopta" },
  { src: "images/Rajdeep.jpeg", alt: "Photograph of Rajdeep from the existing website collection", title: "Rajdeep", location: "Exact photo location to be confirmed", category: "Himalayan Treks", categories: ["Himalayan Treks", "Camping and Trekking Experiences"], description: "A guide photograph from the existing website collection. Exact photo location and date are to be confirmed." },
  { src: "images/rajdeep-portrait.jpeg", alt: "Portrait photograph of Rajdeep from the existing website collection", title: "Rajdeep", location: "Exact photo location to be confirmed", category: "Himalayan Treks", categories: ["Himalayan Treks", "Camping and Trekking Experiences"], description: "A guide portrait from the existing website collection. Exact photo location and date are to be confirmed." },
  { src: "images/deoriatal.jpeg", alt: "Deoriatal trek landscape photograph from the existing collection", title: "Deoriatal Trek", location: "Exact photo location to be confirmed", category: "Mountain Landscapes", categories: ["Himalayan Treks", "Mountain Landscapes", "Wildlife and Nature", "Camping and Trekking Experiences"], description: "A photograph associated with the Deoriatal route. Exact photo location and date are to be confirmed.", trekKey: "deoriatal" },
  { src: "images/golu.jpeg", alt: "Bird and nature photograph from the existing collection; identification unverified", title: "Bird Photo", location: "Exact photo location to be confirmed", category: "Bird Watching", categories: ["Bird Watching", "Wildlife and Nature"], description: "Bird species, scientific name, location, date and photo provenance are to be confirmed." },
  { src: "images/kkkk.jpeg", alt: "Himalayan landscape photograph from the existing collection", title: "Mountain Landscape", location: "Exact photo location to be confirmed", category: "Mountain Landscapes", categories: ["Mountain Landscapes", "Wildlife and Nature", "Camping and Trekking Experiences"], description: "A landscape photograph from the existing collection. Exact location and date are to be confirmed." },
  { src: "images/aerial insectivores.jpeg", alt: "Bird photograph from the existing collection; species identification unverified", title: "Bird Photo", location: "Exact photo location to be confirmed", category: "Bird Watching", categories: ["Bird Watching", "Wildlife and Nature"], description: "Bird species, scientific name, location, date and photo provenance are to be confirmed." },
  { src: "images/bird that live in bushes.jpeg", alt: "Bird photograph from the existing collection; species identification unverified", title: "Bird Photo", location: "Exact photo location to be confirmed", category: "Bird Watching", categories: ["Bird Watching", "Wildlife and Nature"], description: "Bird species, scientific name, location, date and photo provenance are to be confirmed." },
  { src: "images/bird that live in tree.jpeg", alt: "Bird photograph from the existing collection; species identification unverified", title: "Bird Photo", location: "Exact photo location to be confirmed", category: "Bird Watching", categories: ["Bird Watching", "Wildlife and Nature"], description: "Bird species, scientific name, location, date and photo provenance are to be confirmed." },
  { src: "images/birds of prey.jpeg", alt: "Bird photograph from the existing collection; species identification unverified", title: "Bird Photo", location: "Exact photo location to be confirmed", category: "Bird Watching", categories: ["Bird Watching", "Wildlife and Nature"], description: "Bird species, scientific name, location, date and photo provenance are to be confirmed." },
  { src: "images/ground-foraging birds.jpeg", alt: "Bird photograph from the existing collection; species identification unverified", title: "Bird Photo", location: "Exact photo location to be confirmed", category: "Bird Watching", categories: ["Bird Watching", "Wildlife and Nature"], description: "Bird species, scientific name, location, date and photo provenance are to be confirmed." },
  { src: "images/himalayan monal.jpeg", alt: "Bird photograph from the existing collection; species identification unverified", title: "Bird Photo", location: "Exact photo location to be confirmed", category: "Bird Watching", categories: ["Bird Watching", "Wildlife and Nature"], description: "Bird species, scientific name, location, date and photo provenance are to be confirmed." },
  { src: "images/water birds.jpeg", alt: "Bird photograph from the existing collection; species identification unverified", title: "Bird Photo", location: "Exact photo location to be confirmed", category: "Bird Watching", categories: ["Bird Watching", "Wildlife and Nature"], description: "Bird species, scientific name, location, date and photo provenance are to be confirmed." },
  { src: "images/chandrabadhani temple.jpeg", alt: "Chandrabadni trek and temple photograph from the existing collection", title: "Chandrabadni Trek", location: "Exact photo location to be confirmed", category: "Himalayan Treks", categories: ["Himalayan Treks", "Mountain Landscapes", "Camping and Trekking Experiences", "Local Villages and Himalayan Culture"], description: "A photograph associated with the Chandrabadni route. Exact photo location and date are to be confirmed.", trekKey: "chandrabadhni" }
];

const galleryImageDimensions = {
  "images/chandrashila.jpeg": [720, 900],
  "images/kartik swami.jpeg": [736, 919],
  "images/kedarnath.jpeg": [736, 920],
  "images/badhanitaal.jpeg": [1080, 1008],
  "images/madhyameshwar.jpeg": [735, 919],
  "images/triyuginarayan.jpeg": [678, 452],
  "images/tungnath.jpeg": [736, 981],
  "images/Rajdeep.jpeg": [1445, 739],
  "images/rajdeep-portrait.jpeg": [1254, 1254],
  "images/deoriatal.jpeg": [670, 430],
  "images/golu.jpeg": [1088, 1445],
  "images/kkkk.jpeg": [1280, 720],
  "images/aerial insectivores.jpeg": [736, 552],
  "images/bird that live in bushes.jpeg": [736, 487],
  "images/bird that live in tree.jpeg": [628, 416],
  "images/birds of prey.jpeg": [660, 449],
  "images/ground-foraging birds.jpeg": [640, 457],
  "images/himalayan monal.jpeg": [736, 552],
  "images/water birds.jpeg": [1280, 853],
  "images/chandrabadhani temple.jpeg": [1076, 1172]
};

const galleryModal = document.getElementById("galleryModal");
const galleryViewerImage = document.getElementById("galleryViewerImage");
const galleryCounter = document.getElementById("galleryCounter");
const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const masonryGallery = document.getElementById("masonryGallery");
const galleryFilterButtons = Array.from(document.querySelectorAll(".filter-btn"));
const galleryViewerTitle = document.getElementById("galleryViewerTitle");
const galleryLocation = document.getElementById("galleryLocation");
const galleryCategory = document.getElementById("galleryCategory");
const galleryDescription = document.getElementById("galleryDescription");
const gallerySection = masonryGallery?.closest(".gallery-premium");
const galleryViewer = galleryModal?.querySelector(".gallery-viewer");
let lastGalleryTrigger = null;
const trekGalleryGrid = document.querySelector(".trek-gallery .gallery-grid");
const trekGalleryImages = Array.from(trekGalleryGrid?.querySelectorAll("img") || []);

let activeGalleryFilter = "All";
let lightboxIndex = 0;
let filteredGalleryItems = [...galleryItems];

if (!masonryGallery && trekGalleryImages.length) {
  filteredGalleryItems = trekGalleryImages.map(image => ({
    src: image.currentSrc || image.src,
    alt: image.alt,
    title: image.alt.replace(/ Trek$/, ""),
    location: "Uttarakhand",
    category: "Trek Experience",
    description: "A view from the Himalayan trail collection.",
    width: Number(image.getAttribute("width")) || image.naturalWidth,
    height: Number(image.getAttribute("height")) || image.naturalHeight
  }));
}

function getVisibleGalleryItems(filter) {
  if (filter === "All") return [...galleryItems];
  return galleryItems.filter(item => item.categories.includes(filter));
}

function renderGalleryCards(filter = "All") {
  activeGalleryFilter = filter;
  filteredGalleryItems = getVisibleGalleryItems(filter);

  const galleryLimit = Number(gallerySection?.dataset.galleryLimit);
  if (galleryLimit > 0) filteredGalleryItems = filteredGalleryItems.slice(0, galleryLimit);

  if (!masonryGallery) return;

  masonryGallery.innerHTML = filteredGalleryItems.map((item, index) => {
    const imageDimensions = galleryImageDimensions[item.src];
    const sizeClass = index === 0
      ? "masonry-card masonry-card--feature"
      : index === 1 || index === 3
        ? "masonry-card masonry-card--portrait"
        : index === 5
          ? "masonry-card masonry-card--wide"
          : "masonry-card";

    return `
      <figure class="${sizeClass}" data-index="${index}">
        <button class="masonry-image-button" type="button" aria-label="Preview ${item.alt}">
          <img src="${encodeURI(item.src)}" alt="${item.alt}" ${imageDimensions ? `width="${imageDimensions[0]}" height="${imageDimensions[1]}"` : ""} loading="lazy" decoding="async" />
        </button>
        <figcaption class="masonry-caption">
          <span class="masonry-tag">${item.category}</span>
          <strong>${item.title}</strong>
          <small>${item.location}</small>
          ${item.trekKey ? `<span class="masonry-card-links"><a href="treks.html?trek=${encodeURIComponent(item.trekKey)}">View trek details</a><a href="booking.html?trek=${encodeURIComponent(item.trekKey)}">Book this trek</a></span>` : ""}
        </figcaption>
      </figure>
    `;
  }).join("");

  masonryGallery.querySelectorAll(".masonry-image-button").forEach((button, index) => {
    button.addEventListener("click", () => openGallery(index));
  });

  const emptyMessage = gallerySection?.querySelector(".gallery-empty");
  if (emptyMessage) {
    emptyMessage.hidden = filteredGalleryItems.length > 0;
  }

  galleryFilterButtons.forEach(button => {
    const isActive = button.dataset.filter === filter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (gallerySection) {
    gallerySection.setAttribute("aria-label", `${filter} photographs`);
  }
}

function updateLightboxImage() {
  if (!galleryViewerImage || !galleryCounter || !filteredGalleryItems.length) return;

  const activeImage = filteredGalleryItems[lightboxIndex];
  if (!activeImage) return;

  galleryViewerImage.src = activeImage.src;
  galleryViewerImage.alt = activeImage.alt;
  const imageDimensions = galleryImageDimensions[activeImage.src] ||
    (activeImage.width && activeImage.height ? [activeImage.width, activeImage.height] : null);
  if (imageDimensions) {
    galleryViewerImage.width = imageDimensions[0];
    galleryViewerImage.height = imageDimensions[1];
  } else {
    galleryViewerImage.removeAttribute("width");
    galleryViewerImage.removeAttribute("height");
  }
  galleryCounter.textContent = `${lightboxIndex + 1} / ${filteredGalleryItems.length}`;
  if (galleryViewerTitle) galleryViewerTitle.textContent = activeImage.title;
  if (galleryLocation) galleryLocation.textContent = activeImage.location;
  if (galleryCategory) galleryCategory.textContent = activeImage.category;
  if (galleryDescription) {
    galleryDescription.textContent = activeImage.description;
    const detailsLink = document.getElementById("galleryTrekDetails");
    const bookLink = document.getElementById("galleryBookTrek");
    if (detailsLink && bookLink && activeImage.trekKey) {
      detailsLink.href = `treks.html?trek=${encodeURIComponent(activeImage.trekKey)}`;
      bookLink.href = `booking.html?trek=${encodeURIComponent(activeImage.trekKey)}`;
      detailsLink.hidden = false;
      bookLink.hidden = false;
    } else {
      if (detailsLink) detailsLink.hidden = true;
      if (bookLink) bookLink.hidden = true;
    }
  }
}

function openGallery(index = 0) {
  if (!galleryModal || !filteredGalleryItems.length) return;

  if (document.activeElement instanceof HTMLElement && document.activeElement.closest(".masonry-gallery")) {
    lastGalleryTrigger = document.activeElement;
  }

  lightboxIndex = (index + filteredGalleryItems.length) % filteredGalleryItems.length;
  updateLightboxImage();
  galleryModal.classList.add("show");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("gallery-open");
  galleryClose?.focus();
}

function closeGallery() {
  if (!galleryModal) return;

  galleryModal.classList.remove("show");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("gallery-open");
  lastGalleryTrigger?.focus();
  lastGalleryTrigger = null;
}

if (galleryFilterButtons.length) {
  galleryFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      galleryFilterButtons.forEach(item => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      renderGalleryCards(button.dataset.filter || "All");
    });
  });
}

if (galleryClose) galleryClose.addEventListener("click", closeGallery);
if (galleryPrev) galleryPrev.addEventListener("click", () => openGallery(lightboxIndex - 1));
if (galleryNext) galleryNext.addEventListener("click", () => openGallery(lightboxIndex + 1));
if (galleryModal) galleryModal.addEventListener("click", event => {
  if (event.target === galleryModal) closeGallery();
});

trekGalleryImages.forEach((image, index) => {
  image.setAttribute("tabindex", "0");
  image.addEventListener("click", () => openGallery(index));
  image.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openGallery(index);
    }
  });
});

document.querySelector(".gallery-carousel-prev")?.addEventListener("click", () => {
  trekGalleryGrid?.scrollBy({ left: -trekGalleryGrid.clientWidth, behavior: "smooth" });
});

document.querySelector(".gallery-carousel-next")?.addEventListener("click", () => {
  trekGalleryGrid?.scrollBy({ left: trekGalleryGrid.clientWidth, behavior: "smooth" });
});

document.addEventListener("keydown", event => {
  if (!galleryModal?.classList.contains("show")) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") openGallery(lightboxIndex - 1);
  if (event.key === "ArrowRight") openGallery(lightboxIndex + 1);

  if (event.key === "Tab" && galleryViewer) {
    const focusable = Array.from(galleryViewer.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"))
      .filter(element => !element.hasAttribute("hidden") && element.getClientRects().length > 0);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

renderGalleryCards(activeGalleryFilter);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeVideo();

    closeMainNav(true);
  }
});
