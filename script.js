// ==============================
// HIMALAYAN WILDLIFE JOURNEY
// Main JavaScript
// ==============================

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
const navLinks = Array.from(document.querySelectorAll(".main-nav a:not(.nav-cta)"));

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

setInterval(() => {
  reviewIndex = (reviewIndex + 1) % reviews.length;
  renderReview();
}, 5000);

const videoModal = document.getElementById("videoModal");
const watchVideo = document.getElementById("watchVideo");
const closeVideoButton = document.getElementById("closeVideo");

function closeVideo() {
  if (videoModal) {
    videoModal.classList.remove("show");
    videoModal.setAttribute("aria-hidden", "true");
  }
}

if (watchVideo && videoModal) {
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
  { src: "images/treks/chandrashila.jpeg", alt: "Chandrashila summit trail", title: "Above the Clouds", categories: ["Trekking", "Mountains", "Sunrise & Sunset"] },
  { src: "images/treks/kartik swami.jpeg", alt: "Kartik Swami temple trail", title: "Kartik Swami", categories: ["Trekking", "Nature", "Villages"] },
  { src: "images/treks/kedarnath.jpeg", alt: "Kedarnath mountain trail", title: "Kedarnath", categories: ["Trekking", "Mountains", "Nature"] },
  { src: "images/treks/badhanitaal.jpeg", alt: "Badhani Tal lake trail", title: "Badhani Tal", categories: ["Nature", "Trekking", "Sunrise & Sunset"] },
  { src: "images/treks/madhyameshwar.jpeg", alt: "Madhyameshwar valley trail", title: "Madhyameshwar", categories: ["Nature", "Villages", "Trekking"] },
  { src: "images/treks/triyuginarayan.jpeg", alt: "Triyuginarayan sacred valley", title: "Triyuginarayan", categories: ["Villages", "Mountains", "Nature"] },
  { src: "images/treks/tungnath.jpeg", alt: "Tungnath alpine trail", title: "Tungnath", categories: ["Trekking", "Mountains", "Birds"] },
  { src: "images/hero/Rajdeep.jpeg", alt: "Rajdeep in the Himalayas", title: "Guide & Trails", categories: ["Wildlife", "Nature", "Birds"] },
  { src: "images/profile/rajdeep-portrait.jpeg", alt: "Rajdeep portrait", title: "Local Story", categories: ["Villages", "Nature", "Wildlife"] },
  { src: "images/treks/deoriatal.jpeg", alt: "Deoriatal lake view", title: "Deoriatal", categories: ["Nature", "Sunrise & Sunset", "Trekking"] },
  { src: "images/birds/golu.jpeg", alt: "Birding trail in the Himalayas", title: "Birding Morning", categories: ["Birds", "Wildlife", "Nature"] },
  { src: "images/gallery/kkkk.jpeg", alt: "Himalayan valley sunrise", title: "Early Morning Glow", categories: ["Sunrise & Sunset", "Mountains", "Nature"] }
];

const galleryModal = document.getElementById("galleryModal");
const galleryViewerImage = document.getElementById("galleryViewerImage");
const galleryCounter = document.getElementById("galleryCounter");
const galleryClose = document.getElementById("galleryClose");
const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const masonryGallery = document.getElementById("masonryGallery");
const galleryFilterButtons = Array.from(document.querySelectorAll(".filter-btn"));

let activeGalleryFilter = "All";
let lightboxIndex = 0;
let filteredGalleryItems = [...galleryItems];

function getVisibleGalleryItems(filter) {
  if (filter === "All") return [...galleryItems];
  return galleryItems.filter(item => item.categories.includes(filter));
}

function renderGalleryCards(filter = "All") {
  activeGalleryFilter = filter;
  filteredGalleryItems = getVisibleGalleryItems(filter);

  if (!masonryGallery) return;

  masonryGallery.innerHTML = filteredGalleryItems.map((item, index) => `
    <figure class="masonry-card" tabindex="0" role="button" aria-label="Open ${item.alt}" data-index="${index}">
      <img src="${item.src}" alt="${item.alt}" />
      <figcaption class="masonry-caption">
        <span class="masonry-tag">${item.categories[0]}</span>
        <strong>${item.title}</strong>
      </figcaption>
    </figure>
  `).join("");

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
}

function openGallery(index = 0) {
  if (!galleryModal || !filteredGalleryItems.length) return;

  lightboxIndex = (index + filteredGalleryItems.length) % filteredGalleryItems.length;
  updateLightboxImage();
  galleryModal.classList.add("show");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("gallery-open");
}

function closeGallery() {
  if (!galleryModal) return;

  galleryModal.classList.remove("show");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("gallery-open");
}

if (galleryFilterButtons.length) {
  galleryFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      galleryFilterButtons.forEach(item => item.classList.toggle("active", item === button));
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

document.addEventListener("keydown", event => {
  if (!galleryModal?.classList.contains("show")) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") openGallery(lightboxIndex - 1);
  if (event.key === "ArrowRight") openGallery(lightboxIndex + 1);
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

const detailTrekSections = Array.from(document.querySelectorAll(".detail-trek-section"));

function activeTrekSection(trekKey) {
  if (!detailTrekSections.length) return;

  const normalizedKey = String(trekKey || "").trim().toLowerCase();
  detailTrekSections.forEach(section => {
    const sectionKey = String(section.dataset.detailTrek || "").trim().toLowerCase();
    section.classList.toggle("active", sectionKey === normalizedKey);
    section.style.display = sectionKey === normalizedKey ? "block" : "none";
  });
}

function updateTrekRegion(trekKey) {
  const regionValue = document.getElementById("trekRegion");
  if (!regionValue) return;

  const normalizedKey = String(trekKey || "").trim().toLowerCase();
  const activeSection = detailTrekSections.find(section => {
    const sectionKey = String(section.dataset.detailTrek || "").trim().toLowerCase();
    return sectionKey === normalizedKey;
  });

  regionValue.textContent = activeSection?.dataset.region || "Rudraprayag";
}

const trekImageMap = {
  kartik: { src: "images/treks/kartik swami.jpeg", alt: "Kartik Swami Trek" },
  kedarnath: { src: "images/treks/kedarnath.jpeg", alt: "Kedarnath Trek" },
  badhani: { src: "images/treks/badhanitaal.jpeg", alt: "Badhani Tal Trek" },
  deoriatal: { src: "images/treks/deoriatal.jpeg", alt: "Deoriatal Trek" },
  chopta: { src: "images/treks/chandrashila.jpeg", alt: "Chopta Tungnath Chandrashila Trek" },
  madhy: { src: "images/treks/madhyameshwar.jpeg", alt: "Madhyameshwar Trek" },
  triyu: { src: "images/treks/triyuginarayan.jpeg", alt: "Triyuginarayan Trek" }
};

function updateTrekImage(trekKey) {
  const detailImage = document.querySelector(".trek-detail-image img");
  if (!detailImage) return;

  const trek = trekImageMap[trekKey] || trekImageMap.kartik;
  detailImage.src = trek.src;
  detailImage.alt = trek.alt;
}

const params = new URLSearchParams(window.location.search);
const requestedTrek = params.get("trek") || "kartik";
activeTrekSection(requestedTrek);
updateTrekRegion(requestedTrek);
updateTrekImage(requestedTrek);

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeVideo();

    if (mainNav) {
      mainNav.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }
  }
});


