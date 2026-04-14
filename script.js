// =========================================
// banqed MVP - App Shell Navigation
// =========================================

const navControls = document.querySelectorAll("[data-section]");
const appSections = document.querySelectorAll(".app-section");

function showSection(sectionId) {
  if (!sectionId) return;

  appSections.forEach((section) => {
    const isActive = section.id === sectionId;
    section.classList.toggle("active", isActive);
    section.setAttribute("aria-hidden", String(!isActive));
  });

  navControls.forEach((control) => {
    const isActive = control.dataset.section === sectionId;
    control.classList.toggle("active", isActive);

    if (control.classList.contains("nav-button")) {
      control.setAttribute("aria-pressed", String(isActive));
    }
  });
}

function handleNavClick(event) {
  const control = event.currentTarget;
  const targetSection = control.dataset.section;

  showSection(targetSection);
}

function initNavigation() {
  navControls.forEach((control) => {
    control.addEventListener("click", handleNavClick);
  });

  showSection("add-item");
}

document.addEventListener("DOMContentLoaded", initNavigation);