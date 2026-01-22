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

  
const weddingDate = new Date(
  2026, // έτος
  6,    // μήνας
  4,    // ημέρα
  19,   // ώρα
  0,    // λεπτά
  0     // δευτερόλεπτα
).getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

if (daysEl && hoursEl && minutesEl && secondsEl) {
  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const totalSeconds = Math.floor(distance / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);
    
    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
  
});
