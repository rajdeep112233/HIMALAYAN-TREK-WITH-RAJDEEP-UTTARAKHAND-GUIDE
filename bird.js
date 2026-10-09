const birdGuide = document.querySelector(".birdwatching-page");

if (birdGuide) {
  document.querySelectorAll(".bird-habitat-card, .equipment-card").forEach(card => {
    card.setAttribute("tabindex", "0");
  });
}


