const languageToggle = document.querySelector("#language-toggle");
const menuToggle = document.querySelector("#menu-toggle");
const navigation = document.querySelector(".nav");
const translatableElements = [...document.querySelectorAll("[data-i18n]")];

const spanish = Object.fromEntries(
  translatableElements.map((element) => [element.dataset.i18n, element.textContent.trim()]),
);

const translations = {
  es: spanish,
  en: {
    "nav-about": "About me",
    "nav-education": "Education",
    "nav-experience": "Experience",
    "nav-projects": "Projects",
    "nav-contact": "Contact",
    "hero-eyebrow": "Web developer • Experience designer",
    "hero-title": "Hi, I'm Manuel Guardiola.",
    "hero-lead": "I create modern, clear, and functional websites that help brands and projects look professional and connect with their audience.",
    "hero-projects": "View projects",
    "hero-contact": "Let's talk",
    "offer-title": "What I offer",
    "offer-1": "Clean, professional visual design",
    "offer-2": "Responsive websites for mobile and desktop",
    "offer-3": "A focus on usability and results",
    "about-eyebrow": "About me",
    "about-title": "I design digital solutions with purpose and clarity.",
    "about-1": "I specialize in creating portals, landing pages, and web experiences that connect with people and help communicate a message more effectively.",
    "about-2": "My process combines aesthetics, structure, and functionality so every project looks great and fulfills its goal.",
    "experience-eyebrow": "Experience",
    "experience-title": "Experience in developing, supporting, and improving information systems.",
    "experience-date": "May 2023 — December 2024",
    "experience-role": "Information systems development and support",
    "experience-description": "Supported the development, maintenance, and operation of public procurement applications; performed unit testing, handled incidents, produced technical documentation, and monitored platforms.",
    "education-eyebrow": "Education",
    "education-title": "Technical training and continuous learning in technology.",
    "education-date": "2021 — 2023",
    "education-degree": "Technologist in Information Systems Analysis and Development",
    "education-school": "SENA — Centro Minero, virtual program.",
    "certifications-title": "Additional certifications",
    "cert-1": "Introduction to Back-End Development — Meta / Coursera",
    "cert-2": "Generative AI: Prompt Engineering Basics — IBM / Coursera",
    "cert-3": "Agile Explorer — IBM SkillsBuild",
    "cert-4": "Basic Programming — Talento Tech",
    "projects-eyebrow": "Projects",
    "projects-title": "Some websites I have created",
    "project-esyc-description": "Corporate website for technical services and industrial operations.",
    "project-cjvn-description": "Corporate website for an institutional food-service company.",
    "visit-site": "Visit site ↗",
    "project-brand-title": "Brand landing page",
    "project-brand-description": "A clean, engaging page to present a brand or service.",
    "view-project": "View project",
    "project-portfolio-title": "Personal portfolio",
    "project-portfolio-description": "A modern design to showcase work, skills, and contact information.",
    "project-store-title": "Store or catalog",
    "project-store-description": "A clear structure to showcase products and make purchases easier.",
    "project-corporate-title": "Corporate website",
    "project-corporate-description": "A professional solution to present services, team members, and contact details.",
    "contact-eyebrow": "Contact",
    "contact-title": "Do you have a project in mind?",
    "contact-description": "I would love to hear about your idea and help turn it into a website that stands out.",
    "contact-button": "Email me",
    "footer": "© 2026 Manuel Guardiola. All rights reserved.",
  },
};

function setLanguage(language) {
  translatableElements.forEach((element) => {
    const translation = translations[language][element.dataset.i18n];
    if (translation) element.textContent = translation;
  });

  document.documentElement.lang = language;
  const switchingToEnglish = language === "es";
  languageToggle.textContent = switchingToEnglish ? "EN" : "ES";
  languageToggle.setAttribute(
    "aria-label",
    switchingToEnglish ? "Change to English" : "Cambiar a español",
  );
  languageToggle.title = switchingToEnglish ? "Change to English" : "Cambiar a español";
  localStorage.setItem("portfolio-language", language);
}

const savedLanguage = localStorage.getItem("portfolio-language");
setLanguage(savedLanguage === "en" ? "en" : "es");

languageToggle.addEventListener("click", () => {
  setLanguage(document.documentElement.lang === "es" ? "en" : "es");
});

function setMenuState(isOpen) {
  navigation.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
}

menuToggle.addEventListener("click", () => {
  setMenuState(!navigation.classList.contains("menu-open"));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

document.addEventListener("click", (event) => {
  if (!navigation.contains(event.target)) setMenuState(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) setMenuState(false);
});

const revealElements = [
  ...document.querySelectorAll(
    ".hero-text, .hero-card, .section-heading, .about-grid > *, .experience-item, .education-card, .project-card, .contact-section > p, .contact-section > .btn",
  ),
];

revealElements.forEach((element, index) => {
  element.classList.add("reveal");
  element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 },
);

revealElements.forEach((element) => revealObserver.observe(element));
