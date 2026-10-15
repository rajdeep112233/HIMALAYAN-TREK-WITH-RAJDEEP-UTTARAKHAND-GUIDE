const treks = {
  kartik: {
    name: "Kartik Swami Trek",
    description: "Explore the Kartik Swami Trek in Uttarakhand with Rajdeep. Review the listed trip details and confirm the route, dates and arrangements before travelling.",
    duration: "2 days",
    difficulty: "Easy",
    price: "₹4,999",
    width: 736,
    height: 919,
    image: "images/kartik%20swami.jpeg",
    alt: "Kartik Swami temple and surrounding Himalayan landscape"
  },
  chopta: {
    name: "Chopta–Tungnath–Chandrashila Trek",
    description: "Explore the Chopta–Tungnath–Chandrashila Trek in Uttarakhand with Rajdeep. Confirm route conditions, dates and trip arrangements before travel.",
    duration: "3 days",
    difficulty: "Easy to Moderate",
    price: "₹6,999",
    width: 720,
    height: 900,
    image: "images/chandrashila.jpeg",
    alt: "Chandrashila trail in the Uttarakhand Himalayas"
  },
  kedarnath: {
    name: "Kedarnath Trek",
    description: "Plan a Kedarnath Trek enquiry in Uttarakhand with Rajdeep. Confirm route access, seasonal conditions, dates and arrangements before travel.",
    duration: "4 days",
    difficulty: "Moderate",
    price: "₹8,499",
    width: 736,
    height: 920,
    image: "images/kedarnath.jpeg",
    alt: "Kedarnath pilgrimage trail in the Himalayas"
  },
  madhy: {
    name: "Madhyamaheshwar Trek",
    description: "Explore the Madhyamaheshwar Trek in Uttarakhand with Rajdeep. Confirm route details, seasonal access, dates and arrangements before travel.",
    duration: "3 days",
    difficulty: "Moderate",
    price: "₹6,499",
    width: 735,
    height: 919,
    image: "images/madhyameshwar.jpeg",
    alt: "Madhyamaheshwar landscape in Uttarakhand"
  },
  deoriatal: {
    name: "Deoriatal Trek",
    description: "Plan a Deoriatal Trek enquiry in Uttarakhand with Rajdeep. Confirm the route, current access, dates and trip arrangements before travel.",
    duration: "2 days",
    difficulty: "Easy",
    price: "₹4,999",
    width: 670,
    height: 430,
    image: "images/deoriatal.jpeg",
    alt: "Deoriatal lake in the Uttarakhand Himalayas"
  },
  badhani: {
    name: "Badhani Tal Trek",
    description: "Explore the Badhani Tal Trek in Uttarakhand with Rajdeep. Confirm route information, access, dates and trip arrangements before travel.",
    duration: "2 days",
    difficulty: "Easy",
    price: "₹5,499",
    width: 1080,
    height: 1008,
    image: "images/badhanitaal.jpeg",
    alt: "Badhani Tal landscape and water"
  },
  triyu: {
    name: "Triyuginarayan Trek",
    description: "Plan a Triyuginarayan Trek enquiry in Uttarakhand with Rajdeep. Confirm the route, current conditions, dates and trip arrangements before travel.",
    duration: "3 days",
    difficulty: "Easy to Moderate",
    price: "₹6,999",
    width: 678,
    height: 452,
    image: "images/triyuginarayan.jpeg",
    alt: "Triyuginarayan temple and mountain setting"
  },
  chandrabadhni: {
    name: "Chandrabadni Trek",
    description: "Explore the Chandrabadhni Trek in Uttarakhand with Rajdeep. Confirm route details, access, dates and trip arrangements before travel.",
    duration: "3 days",
    difficulty: "Moderate",
    price: "₹6,499",
    width: 1076,
    height: 1172,
    image: "images/chandrabadhani%20temple.jpeg",
    alt: "Chandrabadni temple in Uttarakhand"
  }
};

const requestedTrek = new URLSearchParams(window.location.search).get("trek") || "kartik";
const trek = treks[requestedTrek];

if (trek) {
  const pageTitle = `${trek.name} | Uttarakhand Trek Guide | Rajdeep`;
  const canonicalUrl = new URL(window.location.href);
  canonicalUrl.search = "";
  canonicalUrl.searchParams.set("trek", requestedTrek);
  canonicalUrl.hash = "";
  const setMetaContent = (selector, content) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", content);
  };
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement("link");
    canonicalLink.rel = "canonical";
    document.head.append(canonicalLink);
  }

  document.title = pageTitle;
  document.querySelector('meta[name="description"]')?.setAttribute("content", trek.description);
  setMetaContent('meta[property="og:title"]', pageTitle);
  setMetaContent('meta[property="og:description"]', trek.description);
  setMetaContent('meta[property="og:url"]', canonicalUrl.href);
  setMetaContent('meta[name="twitter:title"]', pageTitle);
  setMetaContent('meta[name="twitter:description"]', trek.description);
  canonicalLink.href = canonicalUrl.href;

  const siteRoot = new URL("./", canonicalUrl).href;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteRoot },
      { "@type": "ListItem", position: 2, name: "Treks", item: `${siteRoot}index.html#treks` },
      { "@type": "ListItem", position: 3, name: trek.name, item: canonicalUrl.href }
    ]
  };
  const breadcrumbSchemaElement = document.getElementById("trekBreadcrumbSchema");
  if (breadcrumbSchemaElement) breadcrumbSchemaElement.textContent = JSON.stringify(breadcrumbSchema);

  document.getElementById("trekTitle").textContent = trek.name;
  document.getElementById("trekBreadcrumbName").textContent = trek.name;
  document.getElementById("trekOverview").textContent =
    `Plan a ${trek.name} experience with a local guide. Route, access, season and trip arrangements must be confirmed before booking.`;
  document.getElementById("trekDuration").textContent = trek.duration;
  document.getElementById("trekDurationBadge").textContent = trek.duration;
  document.getElementById("trekFactDuration").textContent = trek.duration;
  document.getElementById("trekDifficulty").textContent = trek.difficulty;
  document.getElementById("trekFactDifficulty").textContent = trek.difficulty;
  document.getElementById("trekPrice").textContent = trek.price;
  document.getElementById("trekPackagePrice").textContent = trek.price;

  const heroImage = document.getElementById("trekHeroImage");
  const galleryImage = document.getElementById("trekGalleryImage");
  heroImage.src = trek.image;
  heroImage.alt = trek.alt;
  heroImage.width = trek.width;
  heroImage.height = trek.height;
  galleryImage.src = trek.image;
  galleryImage.alt = trek.alt;
  galleryImage.width = trek.width;
  galleryImage.height = trek.height;

  const bookingUrl = `booking.html?trek=${encodeURIComponent(requestedTrek)}`;
  document.getElementById("trekBookButton").href = bookingUrl;
  document.getElementById("trekWhatsappButton").href = bookingUrl;

  const dayCount = Number.parseInt(trek.duration, 10);
  const itinerary = document.getElementById("trekItinerary");
  for (let day = 1; day <= dayCount; day += 1) {
    const item = document.createElement("li");
    const label = document.createElement("strong");
    const detail = document.createElement("span");
    label.textContent = `Day ${day}`;
    detail.textContent = "Route, activities and overnight arrangements: Details to be confirmed.";
    item.append(label, detail);
    itinerary.append(item);
  }
} else {
  document.title = "Trek not found | Himalayan Trek With Rajdeep";
  const notFoundDescription = "This trek page could not be identified. Return to the Uttarakhand trek collection to choose an available route.";
  document.querySelector('meta[name="description"]')?.setAttribute("content", notFoundDescription);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", notFoundDescription);
  let robotsMeta = document.querySelector('meta[name="robots"]');
  if (!robotsMeta) {
    robotsMeta = document.createElement("meta");
    robotsMeta.name = "robots";
    document.head.append(robotsMeta);
  }
  robotsMeta.content = "noindex,follow";
  document.getElementById("trekTitle").textContent = "Trek not found";
  document.getElementById("trekBreadcrumbName").textContent = "Trek not found";
  document.getElementById("trekOverview").textContent =
    "This trek could not be identified. Return to the trek list and choose one of the available routes.";
  document.getElementById("trekBookButton").hidden = true;
  document.getElementById("trekWhatsappButton").hidden = true;
}
