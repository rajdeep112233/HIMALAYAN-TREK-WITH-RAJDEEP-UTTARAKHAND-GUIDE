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

const reviews = [
  {
    text: "“Rajdeep is an excellent guide. He knows the mountains like the back of his hand and made our trek safe and memorable!”",
    name: "Naturalist Lakshman Singh"
  },
  {
    text: "“A calm and knowledgeable guide who made our Himalayan trip comfortable, informative and genuinely enjoyable.”",
    name: "Vicram Singh"
  },
  {
    text: "“The route planning and local knowledge were excellent. We discovered beautiful places away from the crowded trails.”",
    name: "Jaybardhan Shah"
  }
];

let reviewIndex = 0;
const reviewText = document.getElementById("reviewText");
const reviewName = document.getElementById("reviewName");

function renderReview() {
  if (reviewText && reviewName && reviews[reviewIndex]) {
    reviewText.textContent = reviews[reviewIndex].text;
    reviewName.textContent = reviews[reviewIndex].name;
  }
}

const prevReview = document.getElementById("prevReview");
const nextReview = document.getElementById("nextReview");

if (prevReview) {
  prevReview.addEventListener("click", () => {
    reviewIndex = (reviewIndex - 1 + reviews.length) % reviews.length;
    renderReview();
  });
}

if (nextReview) {
  nextReview.addEventListener("click", () => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    renderReview();
  });
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    reviewIndex = (reviewIndex + 1) % reviews.length;
    renderReview();
  }, 5000);
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
  { src: "images/treks/chandrashila.jpeg", alt: "Chandrashila summit trail in Himalayan mountains", title: "Above the Clouds", location: "Chopta, Uttarakhand", category: "Mountains", categories: ["Trekking", "Mountains", "Trek Experiences"], description: "A calm sunrise climb above the alpine ridgelines, where the Himalayan sky opens wide and the trail feels endless." },
  { src: "images/treks/kartik swami.jpeg", alt: "Kartik Swami temple trail in Rudraprayag", title: "Kartik Swami", location: "Rudraprayag, Uttarakhand", category: "Trekking", categories: ["Trekking", "Nature", "Villages", "Trek Experiences"], description: "The temple trail offers a spiritual climb, valley views and a deeply memorable Himalayan ascent." },
  { src: "images/treks/kedarnath.jpeg", alt: "Kedarnath trek route across steep Himalayan terrain", title: "Kedarnath", location: "Kedarnath Valley, Uttarakhand", category: "Trekking", categories: ["Trekking", "Mountains", "Nature", "Trek Experiences"], description: "A sacred Himalayan route shaped by faith, snowline weather and unforgettable mountain drama." },
  { src: "images/treks/badhanitaal.jpeg", alt: "Badhani Tal lake surrounded by forests and hills", title: "Badhani Tal", location: "Chamoli, Uttarakhand", category: "Nature", categories: ["Nature", "Trekking", "Trek Experiences"], description: "Quiet lakeside moments surrounded by forest edges and wide Himalayan horizons." },
  { src: "images/treks/madhyameshwar.jpeg", alt: "Madhyameshwar valley in a forested Himalayan landscape", title: "Madhyameshwar", location: "Madhyameshwar Valley, Uttarakhand", category: "Villages", categories: ["Nature", "Villages", "Trekking", "Trek Experiences"], description: "A scenic route through green valleys and village landscapes where mountain living feels close and real." },
  { src: "images/treks/triyuginarayan.jpeg", alt: "Triyuginarayan sacred valley and Himalayan ridges", title: "Triyuginarayan", location: "Triyuginarayan, Uttarakhand", category: "Villages", categories: ["Villages", "Mountains", "Nature", "Trek Experiences"], description: "The valley carries stories, temples and wide open views framed by ancient Himalayan geography." },
  { src: "images/treks/tungnath.jpeg", alt: "Tungnath ridge view with mountain backdrop", title: "Tungnath Ridge", location: "Tungnath, Uttarakhand", category: "Mountains", categories: ["Trekking", "Mountains", "Nature"], description: "High-altitude trails and open ridgelines create some of the most scenic Himalayan moments." },
  { src: "images/hero/Rajdeep.jpeg", alt: "Rajdeep standing in the Himalayan landscape", title: "Guide & Trails", location: "Rudraprayag, Uttarakhand", category: "Wildlife", categories: ["Wildlife", "Nature", "Bird Watching"], description: "A portrait of local guiding, mountain knowledge and the personal connection to Himalayan trails." },
  { src: "images/profile/rajdeep-portrait.jpeg", alt: "Portrait of Rajdeep Himalayan guide", title: "Local Story", location: "Kamsal, Uttarakhand", category: "Villages", categories: ["Villages", "Nature", "Wildlife"], description: "A quiet look into the local Himalayan storyteller behind every trail and guiding experience." },
  { src: "images/treks/deoriatal.jpeg", alt: "Deoriatal lake with mountain reflections", title: "Deoriatal", location: "Deoria Tal, Uttarakhand", category: "Nature", categories: ["Nature", "Trekking", "Trek Experiences"], description: "A still mountain lake, clean air and a reflection of the sky that feels almost unreal." },
  { src: "images/birds/golu.jpeg", alt: "Birding trail in the Himalayan forest", title: "Birding Morning", location: "Forest trails, Uttarakhand", category: "Bird Watching", categories: ["Bird Watching", "Wildlife", "Nature"], description: "The first light invites Himalayan birds to move through the forest canopy and river edges." },
  { src: "images/gallery/kkkk.jpeg", alt: "Himalayan valley sunrise with warm daylight", title: "Early Morning Glow", location: "Upper Himalayas, Uttarakhand", category: "Nature", categories: ["Nature", "Mountains", "Trek Experiences"], description: "Morning light lengthens shadows and turns the valley into a quiet, golden Himalayan theatre." }
];

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
    description: "A view from the Himalayan trail collection."
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
    const sizeClass = index === 0
      ? "masonry-card masonry-card--feature"
      : index === 1 || index === 3
        ? "masonry-card masonry-card--portrait"
        : index === 5
          ? "masonry-card masonry-card--wide"
          : "masonry-card";

    return `
      <figure class="${sizeClass}" tabindex="0" role="button" aria-label="Open ${item.alt}" data-index="${index}">
        <img src="${item.src}" alt="${item.alt}" loading="lazy" />
        <figcaption class="masonry-caption">
          <span class="masonry-tag">${item.category}</span>
          <strong>${item.title}</strong>
          <small>${item.location}</small>
        </figcaption>
        <span class="masonry-eye" aria-hidden="true"><i class="fa-solid fa-eye"></i></span>
      </figure>
    `;
  }).join("");

  masonryGallery.querySelectorAll(".masonry-card").forEach((card, index) => {
    card.addEventListener("click", () => openGallery(index));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGallery(index);
      }
    });
  });
}

function updateLightboxImage() {
  if (!galleryViewerImage || !galleryCounter || !filteredGalleryItems.length) return;

  const activeImage = filteredGalleryItems[lightboxIndex];
  if (!activeImage) return;

  galleryViewerImage.src = activeImage.src;
  galleryViewerImage.alt = activeImage.alt;
  galleryCounter.textContent = `${lightboxIndex + 1} / ${filteredGalleryItems.length}`;
  if (galleryViewerTitle) galleryViewerTitle.textContent = activeImage.title;
  if (galleryLocation) galleryLocation.textContent = activeImage.location;
  if (galleryCategory) galleryCategory.textContent = activeImage.category;
  if (galleryDescription) galleryDescription.textContent = activeImage.description;
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
    const focusable = Array.from(galleryViewer.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"));
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

const bookingForm = document.getElementById("bookingForm");
const toast = document.getElementById("toast");
const peopleInput = document.getElementById("people");

const WHATSAPP_NUMBER = "919084738318";

if (peopleInput) {
  peopleInput.addEventListener("input", () => peopleInput.setCustomValidity(""));
}

if (bookingForm && toast) {
  bookingForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const trek = document.getElementById("trek").value;
    const date = document.getElementById("date").value;
    const people = Number(peopleInput.value);
    const message = document.getElementById("message").value.trim();
    const specialRequest = document.getElementById("specialRequest").value.trim();

    if (!Number.isInteger(people) || people < 1 || people > 8) {
      peopleInput.setCustomValidity("Please select between 1 and 8 trekkers.");
      peopleInput.reportValidity();
      return;
    }

    peopleInput.setCustomValidity("");

    const whatsappMessage = `Hello Rajdeep, I want to book a Himalayan trek.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Trek: ${trek}
Date: ${date}
Number of People: ${people}
Message: ${message || "No additional message"}
Special Request: ${specialRequest || "No special request"}

Please share availability, inclusions and final price.`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");

    showToast("Opening WhatsApp booking...");
  });
}

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

const dateInput = document.getElementById("date");
if (dateInput) {
  const today = new Date().toISOString().split("T")[0];
  dateInput.min = today;
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeVideo();

    closeMainNav(true);
  }
});


