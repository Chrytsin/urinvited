// Placeholder logic for RSVP form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvp-form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    alert("Ευχαριστούμε! Η δήλωση παρουσίας θα ενεργοποιηθεί σύντομα.");
    form.reset();
  });
});

