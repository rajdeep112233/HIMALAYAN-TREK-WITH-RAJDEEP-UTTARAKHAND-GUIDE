(() => {
const bookingForm = document.getElementById("bookingForm");
const bookingStatus = document.getElementById("bookingStatus");
const bookingDate = document.getElementById("date");
const bookingPhone = document.getElementById("phone");
const bookingWhatsappNumber = "919084738318";

function localDateString(date) {
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 10);
}

if (bookingForm && bookingStatus && bookingDate && bookingPhone) {
  bookingDate.min = localDateString(new Date());

  bookingPhone.addEventListener("input", () => {
    bookingPhone.setCustomValidity("");
  });

  bookingForm.addEventListener("submit", event => {
    event.preventDefault();
    bookingStatus.hidden = true;
    bookingStatus.classList.remove("is-error");

    const phoneDigits = bookingPhone.value.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      bookingPhone.setCustomValidity("Enter a valid phone number with 7 to 15 digits.");
      bookingPhone.reportValidity();
      return;
    }
    bookingPhone.setCustomValidity("");

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }

    const inquiry = Object.fromEntries(new FormData(bookingForm).entries());
    const whatsappMessage = `Hello Rajdeep, I would like to plan a Himalayan trek or tour.

Name: ${inquiry.name}
Phone: ${inquiry.phone}
Email: ${inquiry.email}
Trek / Tour: ${inquiry.trek}
Preferred Date: ${inquiry.date}
Number of People: ${inquiry.people}
Food Requirement: ${inquiry.food}
Accommodation Required: ${inquiry.accommodation}
Transportation Required: ${inquiry.transportation}
Special Requirements: ${inquiry.specialRequest || "None"}
Message: ${inquiry.message || "None"}

Please share availability, pricing and the next steps to confirm.`;

    if (!submitBookingInquiry(whatsappMessage)) {
      bookingStatus.textContent = "WhatsApp could not be opened. Allow pop-ups for this site or contact us at +91 90847 38318.";
      bookingStatus.classList.add("is-error");
      bookingStatus.hidden = false;
      bookingStatus.focus();
      return;
    }

    bookingForm.reset();
    bookingStatus.textContent = "Thank you! Your booking inquiry has been received. We will contact you shortly to confirm the details.\nYour inquiry is ready in WhatsApp; tap Send there to share it with Rajdeep.";
    bookingStatus.hidden = false;
    bookingStatus.focus();
  });
}

function submitBookingInquiry(message) {
  // Replace this WhatsApp handoff with a fetch request when a booking API is available.
  const whatsappUrl = `https://wa.me/${bookingWhatsappNumber}?text=${encodeURIComponent(message)}`;
  const whatsappWindow = window.open(whatsappUrl, "_blank");

  if (!whatsappWindow) return false;
  whatsappWindow.opener = null;
  return true;
}
})();


