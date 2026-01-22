document.addEventListener("DOMContentLoaded", () => {

  /* Scroll reveal animation */
  const cards = document.querySelectorAll(".card");

  const revealOnScroll = () => {
    const triggerPoint = window.innerHeight * 0.85;

    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerPoint) {
        card.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run on load


  /* RSVP placeholder logic */
  const form = document.getElementById("rsvp-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    buttonFeedback(form.querySelector("button"));
    form.reset();
  });

  function buttonFeedback(button) {
    const originalText = button.textContent;
    button.textContent = "Εστάλη ✨";
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2000);
  }

});
