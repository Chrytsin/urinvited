document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.classList.add("hidden");
  });

  const revealOnScroll = () => {
    const triggerPoint = window.innerHeight * 0.85;

    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerPoint) {
        card.classList.remove("hidden");
        card.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();


  const form = document.getElementById("rsvp-form");
  if (!form) return;

  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const button = form.querySelector("button");
    const originalText = button.textContent;
  
    button.textContent = "Αποστολή...";
    button.disabled = true;
  
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json"
        }
      });
  
      if (response.ok) {
        button.textContent = "Εστάλη ✨";
        form.reset();
      } else {
        throw new Error("Submission failed");
      }
  
    } catch (error) {
      button.textContent = "Σφάλμα 😕";
    }
  
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2500);
  });


});
