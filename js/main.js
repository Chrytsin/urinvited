document.addEventListener("DOMContentLoaded", () => {

  //================ Animations ================ 
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



  //================ RSRV form ================ 
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


//================ Countdown timer ================ 
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


//================ Navigation menu ===================

const toggle  = document.getElementById("menu-toggle");
const overlay = document.getElementById("nav-overlay");
const header = document.querySelector(".site-header");


if (toggle && overlay) {
  toggle.addEventListener("click", () => {
    const open = overlay.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  overlay.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => {
      overlay.classList.remove("is-open");
      toggle.classList.remove("is-open");
      document.body.style.overflow = "";
    })
  );
}

// Close menu when clicking outside (mobile)
document.addEventListener("click", (e) => {
  if (
    overlay &&
    toggle &&
    !overlay.contains(e.target) &&
    !toggle.contains(e.target)
  ) {
    overlay.classList.remove("open");
  }
});

// Header shadow on scroll
window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
});

// Active link per section
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

const setActiveLink = () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", setActiveLink);
setActiveLink();

  
  //CLOUDINARY PHOTO UPLOAD
  
  const uploadArea  = $("#upload-area");
  const uploadBtn   = $("#upload-btn");
  const photoInput  = $("#photo-input");
  const uploadList  = $("#upload-list");
  const $ = (sel) => document.querySelector(sel);
  const configEl = $("#cloudinary-config");
  
  if (configEl && uploadArea && uploadBtn && photoInput) {
    const CLOUD  = configEl.dataset.cloudinaryCloud;
    const PRESET = configEl.dataset.cloudinaryPreset;
 
    if (!CLOUD || CLOUD === "YOUR_CLOUD_NAME") {
      console.warn(
        "[urinvited] Cloudinary not configured.\n" +
        "Set data-cloudinary-cloud and data-cloudinary-preset on #cloudinary-config in index.html."
      );
    }
 
    function createUploadItem(file) {
      if (uploadList) uploadList.hidden = false;
      const item = document.createElement("div");
      item.className = "upload-item";
 
      const thumb = document.createElement("img");
      thumb.className = "upload-item-thumb";
      thumb.alt = file.name;
      const reader = new FileReader();
      reader.onload = e => { thumb.src = e.target.result; };
      reader.readAsDataURL(file);
 
      const info   = document.createElement("div");
      info.className = "upload-item-info";
 
      const name   = document.createElement("div");
      name.className = "upload-item-name";
      name.textContent = file.name;
 
      const status = document.createElement("div");
      status.className = "upload-item-status uploading";
      status.textContent = "Μεταφόρτωση...";
 
      const icon = document.createElement("span");
      icon.className = "upload-item-icon";
      icon.textContent = "⏳";
 
      info.append(name, status);
      item.append(thumb, info, icon);
      uploadList.appendChild(item);
 
      return { status, icon };
    }
 
    async function uploadFile(file) {
      const { status, icon } = createUploadItem(file);
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", PRESET);
      fd.append("folder", "wedding_kk_2026");
 
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
          { method: "POST", body: fd }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        status.textContent = "Ανέβηκε ✓";
        status.className = "upload-item-status done";
        icon.textContent = "✅";
      } catch (err) {
        console.error("[urinvited] Upload error:", err);
        status.textContent = "Σφάλμα — δοκιμάστε ξανά";
        status.className = "upload-item-status error";
        icon.textContent = "❌";
      }
    }
 
    function handleFiles(files) {
      if (!files?.length) return;
      Array.from(files).forEach(f => {
        if (!f.type.startsWith("image/")) return;
        if (f.size > 20 * 1024 * 1024) {
          alert(`"${f.name}" υπερβαίνει τα 20MB. Παρακαλούμε επιλέξτε μικρότερο αρχείο.`);
          return;
        }
        uploadFile(f);
      });
    }
 
    uploadBtn.addEventListener("click", e => { e.stopPropagation(); photoInput.click(); });
    uploadArea.addEventListener("click", () => photoInput.click());
    photoInput.addEventListener("change", () => { handleFiles(photoInput.files); photoInput.value = ""; });
 
    uploadArea.addEventListener("dragover",  e => { e.preventDefault(); uploadArea.classList.add("drag-over"); });
    uploadArea.addEventListener("dragleave", () => uploadArea.classList.remove("drag-over"));
    uploadArea.addEventListener("drop", e => {
      e.preventDefault();
      uploadArea.classList.remove("drag-over");
      handleFiles(e.dataTransfer.files);
    });
  }
 
}); // DOMContentLoaded
 
