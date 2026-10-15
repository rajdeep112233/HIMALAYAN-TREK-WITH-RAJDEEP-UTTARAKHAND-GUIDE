(() => {
  const bookingForm = document.getElementById("bookingForm");
  const bookingStatus = document.getElementById("bookingStatus");
  const bookingDate = document.getElementById("date");
  const bookingPhone = document.getElementById("phone");
  const trekSelect = document.getElementById("trek");
  const bookingType = document.getElementById("bookingType");
  const bookingSubmit = document.getElementById("bookingSubmit");
  const newInquiry = document.getElementById("newInquiry");
  const bookingWhatsappNumber = "919084738318";
  const trekOptions = {
    kartik: "Kartik Swami Trek",
    chopta: "Chopta–Tungnath–Chandrashila Trek",
    kedarnath: "Kedarnath Trek",
    madhy: "Madhyamaheshwar Trek",
    deoriatal: "Deoriatal Trek",
    badhani: "Badhani Tal Trek",
    triyu: "Triyuginarayan Trek",
    chandrabadhni: "Chandrabadni Trek",
    "bird-watching": "Bird Watching Tour"
  };
  const bookingTypes = {
    "Bird Watching Tour": "Bird Watching",
    "Nature Walk": "Nature Walk",
    "Wildlife Observation": "Nature Walk",
    "Local Village Tour": "Village Tour"
  };

  function localDateString(date) {
    const offset = date.getTimezoneOffset();
    return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
  }

  if (
    !bookingForm ||
    !bookingStatus ||
    !bookingDate ||
    !bookingPhone ||
    !trekSelect ||
    !bookingType ||
    !bookingSubmit ||
    !newInquiry
  ) {
    return;
  }

  bookingDate.min = localDateString(new Date());

  const requestedTrek = new URLSearchParams(window.location.search).get("trek");
  if (requestedTrek && trekOptions[requestedTrek]) {
    trekSelect.value = trekOptions[requestedTrek];
  }
  if (bookingTypes[trekSelect.value]) {
    bookingType.value = bookingTypes[trekSelect.value];
  } else if (trekSelect.value && trekSelect.value !== "Custom Trek / Tour") {
    bookingType.value = "Trekking";
  }

  function updateSummary() {
    const selectedOption = trekSelect.selectedOptions[0];
    const service = selectedOption?.value || "";
    const type = bookingType.value || "";
    const date = bookingDate.value;
    const participants = document.getElementById("people").value;

    const summaryService = document.getElementById("summaryService");
    const summaryType = document.getElementById("summaryType");
    const summaryDate = document.getElementById("summaryDate");
    const summaryPeople = document.getElementById("summaryPeople");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryDuration = document.getElementById("summaryDuration");

    if (summaryService) summaryService.textContent = service || "Not selected";
    if (summaryType) summaryType.textContent = type || "Not selected";
    if (summaryDate) summaryDate.textContent = date || "Not selected";
    if (summaryPeople) summaryPeople.textContent = participants || "Not selected";
    if (summaryPrice) summaryPrice.textContent = selectedOption?.dataset.price
      ? `${selectedOption.dataset.price} (listed; basis to be confirmed)`
      : "Details to be confirmed";
    if (summaryDuration) {
      summaryDuration.textContent = selectedOption?.dataset.duration || "Details to be confirmed";
    }
  }

  trekSelect.addEventListener("change", () => {
    const selectedService = trekSelect.value;
    if (bookingTypes[selectedService]) {
      bookingType.value = bookingTypes[selectedService];
    } else {
      bookingType.value = selectedService && selectedService !== "Custom Trek / Tour"
        ? "Trekking"
        : "";
    }
    updateSummary();
  });
  bookingForm.addEventListener("input", updateSummary);
  bookingForm.addEventListener("change", updateSummary);
  updateSummary();

  bookingPhone.addEventListener("input", () => {
    bookingPhone.setCustomValidity("");
  });

  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    bookingStatus.hidden = true;
    bookingStatus.classList.remove("is-error");

    const phoneHasAllowedCharacters = /^[+\d\s().-]+$/.test(bookingPhone.value);
    const phoneDigits = bookingPhone.value.replace(/\D/g, "");
    if (!phoneHasAllowedCharacters || phoneDigits.length < 7 || phoneDigits.length > 15) {
      bookingPhone.setCustomValidity("Enter a valid mobile number with 7 to 15 digits.");
      bookingStatus.textContent = "Please enter a valid mobile number with 7 to 15 digits.";
      bookingStatus.classList.add("is-error");
      bookingStatus.hidden = false;
      bookingPhone.reportValidity();
      return;
    }
    bookingPhone.setCustomValidity("");

    if (!bookingForm.checkValidity()) {
      bookingStatus.textContent = "Please complete the required fields and check your date, participant count, email address and privacy consent.";
      bookingStatus.classList.add("is-error");
      bookingStatus.hidden = false;
      bookingForm.reportValidity();
      return;
    }

    const inquiry = Object.fromEntries(new FormData(bookingForm).entries());
    const selectedOption = trekSelect.selectedOptions[0];
    const listedPrice = selectedOption.dataset.price || "Details to be confirmed";
    const duration = selectedOption.dataset.duration || "Details to be confirmed";
    const whatsappMessage = `Hello Rajdeep, I would like to enquire about a trek or tour.

Name: ${inquiry.name}
Mobile: ${inquiry.phone}
Email: ${inquiry.email || "Not provided"}
Trek / Tour: ${inquiry.trek}
Booking Type: ${inquiry.bookingType}
Preferred Date: ${inquiry.date}
Number of Participants: ${inquiry.people}
Listed Package Price: ${listedPrice}
Listed Duration: ${duration}
Price basis (per person or group), inclusions and exclusions: Details to be confirmed
Food Requirement: ${inquiry.food}
Accommodation Required: ${inquiry.accommodation}
Transportation Required: ${inquiry.transportation}
Additional Requests: ${inquiry.specialRequest || "None"}

This is an enquiry only and is not a confirmed booking. Please confirm availability, final price and arrangements directly.`;

    if (!submitBookingInquiry(whatsappMessage)) {
      bookingStatus.textContent = "WhatsApp could not be opened. Allow pop-ups for this site or contact us at +91 90847 38318.";
      bookingStatus.classList.add("is-error");
      bookingStatus.hidden = false;
      bookingStatus.focus();
      return;
    }

    bookingStatus.textContent = "WhatsApp opened with your enquiry. Review it and press Send there to contact Rajdeep. This request is not a confirmed booking; availability and final arrangements must be confirmed directly.";
    bookingStatus.hidden = false;
    bookingStatus.focus();
    bookingSubmit.disabled = true;
    bookingSubmit.textContent = "WhatsApp opened";
    bookingForm.querySelectorAll("input, select, textarea").forEach(field => {
      field.disabled = true;
    });
    newInquiry.hidden = false;
  });

  newInquiry.addEventListener("click", () => {
    bookingForm.reset();
    bookingForm.querySelectorAll("input, select, textarea").forEach(field => {
      field.disabled = false;
    });
    bookingPhone.setCustomValidity("");
    bookingSubmit.disabled = false;
    bookingSubmit.innerHTML = '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Book via WhatsApp';
    bookingStatus.hidden = true;
    newInquiry.hidden = true;
    updateSummary();
    document.getElementById("name").focus();
  });

  function submitBookingInquiry(message) {
    const whatsappUrl = `https://wa.me/${bookingWhatsappNumber}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (!whatsappWindow) return false;
    whatsappWindow.opener = null;
    return true;
  }
})();
