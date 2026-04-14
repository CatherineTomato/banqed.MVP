// =========================================
// banqed MVP - App Shell + Settings + Items
// =========================================

// -----------------------------------------
// Navigation
// -----------------------------------------

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

// -----------------------------------------
// Shared Settings Data Layer
// -----------------------------------------

function normalizeValue(value) {
  return value.trim().replace(/\s+/g, " ");
}

const defaultSettingsData = {
  categories: [
    "Tops",
    "Jumpers",
    "Trousers",
    "Activewear",
    "Dresses",
    "Shorts",
    "Skirts",
    "Jackets",
    "Coats",
    "Shoes",
    "Swimwear",
    "Sleepwear",
    "Accessories"
  ],

  itemTypesByCategory: {
    Tops: [
      "Long sleeve top",
      "Short sleeve top",
      "Shirt",
      "Blouse",
      "Tank top",
      "Halterneck",
      "Off-the-shoulder top",
      "Crop top",
      "Corset / Bandeau",
      "Sleeveless turtleneck"
    ],
    Jumpers: [
      "Turtleneck",
      "Sweater vest",
      "Hoodie",
      "Quarter zip",
      "Knit jumper",
      "Cardigan"
    ],
    Trousers: [
      "Jeans",
      "Cargo trousers",
      "Suit trousers",
      "Trackies",
      "Trousers"
    ],
    Activewear: [
      "Leggings",
      "Active jacket",
      "Sports bra",
      "Sports top",
      "Sports shorts"
    ],
    Dresses: [
      "Mini dress",
      "Midi dress",
      "Maxi dress",
      "Evening dress",
      "Jumpsuit"
    ],
    Shorts: [
      "Denim shorts",
      "Cargo shorts",
      "Sports shorts"
    ],
    Skirts: [
      "Mini skirt",
      "Midi skirt",
      "Maxi skirt",
      "Tennis skirt"
    ],
    Jackets: [
      "Leather jacket",
      "Denim jacket",
      "Blazer",
      "Gilet",
      "Suit jacket",
      "Faux fur jacket"
    ],
    Coats: [
      "Rain coat",
      "Winter coat",
      "Trench coat",
      "Long formal coat"
    ],
    Shoes: [
      "Slides",
      "Ballet flats",
      "Mules",
      "Heels",
      "Loafers",
      "Sandals",
      "Trainers",
      "Boots",
      "Kitten heels"
    ],
    Swimwear: [
      "Bikini",
      "Swimsuit",
      "Cover-up"
    ],
    Sleepwear: [
      "Pyjama set",
      "Pyjama top",
      "Pyjama bottoms",
      "Nightdress",
      "Robe"
    ],
    Accessories: [
      "Handbag",
      "Shoulder bag",
      "Backpack",
      "Gym bag",
      "Suitcase",
      "Belt",
      "Scarf",
      "Sun hat",
      "Knit hat",
      "Sunglasses",
      "Ring",
      "Tote bag",
      "Necklace",
      "Earrings",
      "Bracelet"
    ]
  },

  colours: [
    "Black",
    "White",
    "Blue",
    "Navy",
    "Grey",
    "Purple",
    "Pink",
    "Green",
    "Red",
    "Brown",
    "Silver",
    "Yellow",
    "Cream",
    "Gold",
    "Khaki",
    "Beige",
    "Orange",
    "Multicolour"
  ],

  details: [
    "Collared",
    "Polka dot",
    "Striped",
    "Sequined",
    "Ribbed",
    "Slogan",
    "Panelled",
    "Silk",
    "Knit",
    "Layered",
    "Lace",
    "Fluffy",
    "Floral",
    "Patterned",
    "Button detailing",
    "Zip detailing",
    "Graphic",
    "Embellished",
    "Plain",
    "Contrast stitch",
    "Pleated",
    "Gingham",
    "Crochet",
    "Satin",
    "Frilled",
    "Fringe",
    "Pinstripe",
    "Leather",
    "Mesh",
    "Studded",
    "Glossy",
    "Cotton",
    "Metallic",
    "Animal print",
    "Asymmetric straps"
  ],

  styles: [
    "Office",
    "Party",
    "Minimal",
    "Funky",
    "Masculine",
    "Classic",
    "Feminine",
    "Streetwear",
    "Sporty",
    "Elegant",
    "Statement",
    "Casual",
    "Edgy",
    "Chic"
  ],

  contexts: [
    "Everyday",
    "Work",
    "Smart casual",
    "Formal",
    "Party / nightlife",
    "Gym / active",
    "Lounging",
    "Holiday",
    "Special occasion",
    "Pub"
  ],

  brands: [
    "Alo",
    "Adidas",
    "Mango",
    "Zara",
    "Massimo Dutti",
    "All Saints",
    "Urban Outfitters",
    "Boden",
    "Subdued",
    "Ragged Priest",
    "Vaccodor"
  ],

  sourceTypes: [
    "Charity shop",
    "Vintage shop",
    "Market",
    "In-store",
    "Online",
    "Hand-me-down",
    "Present"
  ],

  sourceLocations: [
    "Dublin",
    "Paris",
    "London",
    "Bologna",
    "Brussels",
    "Galway",
    "Madrid"
  ],

  wearFrequencies: [
    "Never worn",
    "Weekly",
    "Monthly",
    "Every few months",
    "Once a year",
    "1-2 times a year",
    "Used to wear often",
    "Rarely"
  ],

  resaleWillingnessOptions: [
    "Keep",
    "Keep for now",
    "Maybe sell",
    "Sell if price is right",
    "Sell now"
  ],

  emotionalRatings: [
    "Love",
    "Really like",
    "It’s ok",
    "Indifferent",
    "Not keen",
    "Potential",
    "High potential"
  ]
};

const settingsData =
  JSON.parse(localStorage.getItem("settings")) || structuredClone(defaultSettingsData);

function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(settingsData));
}

// -----------------------------------------
// Shared Item Store
// -----------------------------------------

let items = JSON.parse(localStorage.getItem("items")) || [];

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

// -----------------------------------------
// App Init
// -----------------------------------------

function initNavigation() {
  navControls.forEach((control) => {
    control.addEventListener("click", handleNavClick);
  });

  showSection("add-item");
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
});