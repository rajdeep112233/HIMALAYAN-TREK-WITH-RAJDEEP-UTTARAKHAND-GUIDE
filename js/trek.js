const detailTrekSections = Array.from(document.querySelectorAll(".detail-trek-section"));

function activeTrekSection(trekKey) {
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

  const activeSection = detailTrekSections.find(section => {
    return String(section.dataset.detailTrek || "").trim().toLowerCase() === trekKey;
  });
  regionValue.textContent = activeSection?.dataset.region || "Rudraprayag";
}

const trekImageMap = {
  kartik: { src: "images/kartik swami.jpeg", alt: "Kartik Swami Trek" },
  kedarnath: { src: "images/kedarnath.jpeg", alt: "Kedarnath Trek" },
  badhani: { src: "images/badhanitaal.jpeg", alt: "Badhani Tal Trek" },
  chandrabadhni: { src: "images/chandrabadhani%20temple.jpeg", alt: "Chandrabadni Trek" },
  deoriatal: { src: "images/deoriatal.jpeg", alt: "Deoriatal Trek" },
  chopta: { src: "images/chandrashila.jpeg", alt: "Chopta Tungnath Chandrashila Trek" },
  madhy: { src: "images/madhyameshwar.jpeg", alt: "Madhyameshwar Trek" },
  triyu: { src: "images/triyuginarayan.jpeg", alt: "Triyuginarayan Trek" }
};

const requestedTrek = new URLSearchParams(window.location.search).get("trek") || "kartik";
activeTrekSection(requestedTrek);
updateTrekRegion(requestedTrek);

const detailImage = document.querySelector(".trek-detail-image img");
if (detailImage) {
  const trek = trekImageMap[requestedTrek] || trekImageMap.kartik;
  detailImage.src = trek.src;
  detailImage.alt = trek.alt;
}
