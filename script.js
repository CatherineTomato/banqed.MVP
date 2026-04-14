// =========================================
// banqed MVP - App Shell + Settings + Items
// Add Item flow implementation
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
// Add Item Form Elements
// -----------------------------------------

const addItemForm = document.getElementById("add-item-form");
const feedbackEl = document.getElementById("form-feedback");

const fieldRefs = {
  name: document.getElementById("item-name"),
  category: document.getElementById("item-category"),
  itemType: document.getElementById("item-type"),
  colours: document.getElementById("item-colours"),
  details: document.getElementById("item-details"),
  contexts: document.getElementById("item-contexts"),
  styles: document.getElementById("item-styles"),
  brand: document.getElementById("item-brand"),
  sourceType: document.getElementById("item-source-type"),
  sourceLocation: document.getElementById("item-source-location"),
  wearFrequency: document.getElementById("item-wear-frequency"),
  estimatedValue: document.getElementById("item-estimated-value"),
  resaleWillingness: document.getElementById("item-resale-willingness"),
  emotionalRating: document.getElementById("item-emotional-rating")
};

const formSections = [
  {
    key: "identity",
    element: document.getElementById("section-identity"),
    isComplete: () =>
      fieldRefs.name.value.trim() !== "" &&
      fieldRefs.category.value !== "" &&
      fieldRefs.itemType.value !== "" &&
      getMultiSelectValues(fieldRefs.colours).length > 0
  },
  {
    key: "wearing",
    element: document.getElementById("section-wearing"),
    isComplete: () => true
  },
  {
    key: "source",
    element: document.getElementById("section-source"),
    isComplete: () => true
  },
  {
    key: "usage",
    element: document.getElementById("section-usage"),
    isComplete: () =>
      fieldRefs.wearFrequency.value !== "" &&
      fieldRefs.estimatedValue.value !== "" &&
      fieldRefs.resaleWillingness.value !== ""
  },
  {
    key: "emotion",
    element: document.getElementById("section-emotion"),
    isComplete: () => true
  }
];

// -----------------------------------------
// Helpers
// -----------------------------------------

function generateId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `item_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowISO() {
  return new Date().toISOString();
}

function getMultiSelectValues(selectEl) {
  return Array.from(selectEl.selectedOptions)
    .map((option) => option.value)
    .filter((value) => value !== "" && value !== "__add_new__");
}

function deriveSourceChannel(sourceType) {
  const inPersonTypes = ["Charity shop", "Vintage shop", "Market", "In-store"];
  const transferTypes = ["Hand-me-down", "Present"];

  if (inPersonTypes.includes(sourceType)) return "In-person";
  if (sourceType === "Online") return "Online";
  if (transferTypes.includes(sourceType)) return "Transfer";

  return null;
}

function clearFeedback() {
  if (feedbackEl) {
    feedbackEl.textContent = "";
  }
}

function setFeedback(message) {
  if (feedbackEl) {
    feedbackEl.textContent = message;
  }
}

function scrollToSection(sectionEl) {
  if (!sectionEl) return;

  sectionEl.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

// -----------------------------------------
// Dropdown population
// -----------------------------------------

function populateSelect(selectEl, options, config = {}) {
  const {
    placeholder = null,
    includeAddNew = false,
    preserveValue = false,
    multi = false
  } = config;

  const previousValues = multi
    ? getMultiSelectValues(selectEl)
    : [selectEl.value];

  selectEl.innerHTML = "";

  if (!multi && placeholder !== null) {
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = placeholder;
    selectEl.appendChild(placeholderOption);
  }

  options.forEach((optionValue) => {
    const optionEl = document.createElement("option");
    optionEl.value = optionValue;
    optionEl.textContent = optionValue;
    selectEl.appendChild(optionEl);
  });

  if (includeAddNew) {
    const addNewOption = document.createElement("option");
    addNewOption.value = "__add_new__";
    addNewOption.textContent = "+ Add new";
    selectEl.appendChild(addNewOption);
  }

  if (preserveValue) {
    if (multi) {
      Array.from(selectEl.options).forEach((option) => {
        option.selected = previousValues.includes(option.value);
      });
    } else {
      const matchExists = Array.from(selectEl.options).some(
        (option) => option.value === previousValues[0]
      );

      selectEl.value = matchExists ? previousValues[0] : "";
    }
  }
}

function populateAllDropdowns() {
  populateSelect(fieldRefs.category, settingsData.categories, {
    placeholder: "Select category"
  });

  populateSelect(fieldRefs.itemType, [], {
    placeholder: "Select item type"
  });

  populateSelect(fieldRefs.colours, settingsData.colours, {
    includeAddNew: true,
    multi: true
  });

  populateSelect(fieldRefs.details, settingsData.details, {
    includeAddNew: true,
    multi: true
  });

  populateSelect(fieldRefs.contexts, settingsData.contexts, {
    includeAddNew: true,
    multi: true
  });

  populateSelect(fieldRefs.styles, settingsData.styles, {
    includeAddNew: true,
    multi: true
  });

  populateSelect(fieldRefs.brand, settingsData.brands, {
    placeholder: "Select brand",
    includeAddNew: true
  });

  populateSelect(fieldRefs.sourceType, settingsData.sourceTypes, {
    placeholder: "Select source type"
  });

  populateSelect(fieldRefs.sourceLocation, settingsData.sourceLocations, {
    placeholder: "Select source location",
    includeAddNew: true
  });

  populateSelect(fieldRefs.wearFrequency, settingsData.wearFrequencies, {
    placeholder: "Select wear frequency"
  });

  populateSelect(
    fieldRefs.resaleWillingness,
    settingsData.resaleWillingnessOptions,
    {
      placeholder: "Select resale willingness"
    }
  );

  populateSelect(fieldRefs.emotionalRating, settingsData.emotionalRatings, {
    placeholder: "Select emotional rating"
  });
}

function refreshItemTypeOptions() {
  const selectedCategory = fieldRefs.category.value;
  const itemTypeOptions =
    settingsData.itemTypesByCategory[selectedCategory] || [];

  populateSelect(fieldRefs.itemType, itemTypeOptions, {
    placeholder: "Select item type"
  });
}

// -----------------------------------------
// Add-new behaviour
// -----------------------------------------

function addNewSingleValueOption(settingsKey, selectEl, promptLabel) {
  const rawValue = window.prompt(promptLabel);

  if (!rawValue) {
    selectEl.value = "";
    return;
  }

  const newValue = normalizeValue(rawValue);

  if (!newValue) {
    selectEl.value = "";
    return;
  }

  const alreadyExists = settingsData[settingsKey].includes(newValue);

  if (!alreadyExists) {
    settingsData[settingsKey].push(newValue);
    settingsData[settingsKey].sort((a, b) => a.localeCompare(b));
    saveSettings();
  }

  populateSelect(selectEl, settingsData[settingsKey], {
    placeholder: selectEl.querySelector('option[value=""]')
      ? selectEl.querySelector('option[value=""]').textContent
      : null,
    includeAddNew: true
  });

  selectEl.value = newValue;
}

function addNewMultiValueOption(settingsKey, selectEl, promptLabel) {
  const rawValue = window.prompt(promptLabel);

  if (!rawValue) {
    Array.from(selectEl.options).forEach((option) => {
      if (option.value === "__add_new__") {
        option.selected = false;
      }
    });
    return;
  }

  const newValue = normalizeValue(rawValue);

  if (!newValue) {
    return;
  }

  const alreadyExists = settingsData[settingsKey].includes(newValue);

  if (!alreadyExists) {
    settingsData[settingsKey].push(newValue);
    settingsData[settingsKey].sort((a, b) => a.localeCompare(b));
    saveSettings();
  }

  const previousValues = getMultiSelectValues(selectEl);
  const nextValues = Array.from(new Set([...previousValues, newValue]));

  populateSelect(selectEl, settingsData[settingsKey], {
    includeAddNew: true,
    multi: true
  });

  Array.from(selectEl.options).forEach((option) => {
    option.selected = nextValues.includes(option.value);
  });
}

function handleAddNewSelections(event) {
  const selectEl = event.currentTarget;
  const selectedValue = selectEl.value;
  const selectedValues = getMultiSelectValues(selectEl);

  if (selectEl === fieldRefs.brand && selectedValue === "__add_new__") {
    addNewSingleValueOption("brands", fieldRefs.brand, "Add new brand");
  }

  if (
    selectEl === fieldRefs.sourceLocation &&
    selectedValue === "__add_new__"
  ) {
    addNewSingleValueOption(
      "sourceLocations",
      fieldRefs.sourceLocation,
      "Add new source location"
    );
  }

  if (
    selectEl === fieldRefs.colours &&
    Array.from(selectEl.selectedOptions).some(
      (option) => option.value === "__add_new__"
    )
  ) {
    addNewMultiValueOption("colours", fieldRefs.colours, "Add new colour");
  }

  if (
    selectEl === fieldRefs.details &&
    Array.from(selectEl.selectedOptions).some(
      (option) => option.value === "__add_new__"
    )
  ) {
    addNewMultiValueOption("details", fieldRefs.details, "Add new detail");
  }

  if (
    selectEl === fieldRefs.contexts &&
    Array.from(selectEl.selectedOptions).some(
      (option) => option.value === "__add_new__"
    )
  ) {
    addNewMultiValueOption("contexts", fieldRefs.contexts, "Add new context");
  }

  if (
    selectEl === fieldRefs.styles &&
    Array.from(selectEl.selectedOptions).some(
      (option) => option.value === "__add_new__"
    )
  ) {
    addNewMultiValueOption("styles", fieldRefs.styles, "Add new style");
  }

  return selectedValues;
}

// -----------------------------------------
// Sequential reveal
// -----------------------------------------

function updateSectionVisibility() {
  let foundIncomplete = false;

  formSections.forEach((section, index) => {
    const isComplete = section.isComplete();
    const isFirst = index === 0;

    section.element.classList.remove("is-active", "is-complete", "is-hidden");

    if (!foundIncomplete) {
      if (isComplete) {
        section.element.classList.add("is-complete");
      } else {
        section.element.classList.add("is-active");
        foundIncomplete = true;
      }
    } else {
      section.element.classList.add("is-hidden");
    }

    if (isFirst && !section.isComplete()) {
      section.element.classList.add("is-active");
      section.element.classList.remove("is-complete");
    }
  });
}

function moveToNextIncompleteSection() {
  const nextSection = formSections.find((section) => !section.isComplete());

  if (nextSection) {
    scrollToSection(nextSection.element);
  }
}

function evaluateProgression() {
  const previousVisibleIncomplete = formSections.find((section) =>
    section.element.classList.contains("is-active")
  );

  updateSectionVisibility();

  const currentVisibleIncomplete = formSections.find((section) =>
    section.element.classList.contains("is-active")
  );

  if (
    previousVisibleIncomplete &&
    currentVisibleIncomplete &&
    previousVisibleIncomplete.key !== currentVisibleIncomplete.key
  ) {
    scrollToSection(currentVisibleIncomplete.element);
  }
}

// -----------------------------------------
// Validation + item creation
// -----------------------------------------

function validateAddItemForm() {
  const nameValid = fieldRefs.name.value.trim() !== "";
  const categoryValid = fieldRefs.category.value !== "";
  const itemTypeValid = fieldRefs.itemType.value !== "";
  const coloursValid = getMultiSelectValues(fieldRefs.colours).length > 0;
  const wearFrequencyValid = fieldRefs.wearFrequency.value !== "";
  const estimatedValueValid = fieldRefs.estimatedValue.value !== "";
  const resaleWillingnessValid = fieldRefs.resaleWillingness.value !== "";

  return (
    nameValid &&
    categoryValid &&
    itemTypeValid &&
    coloursValid &&
    wearFrequencyValid &&
    estimatedValueValid &&
    resaleWillingnessValid
  );
}

function buildItemFromForm() {
  const resaleWillingness = fieldRefs.resaleWillingness.value;

  return {
    id: generateId(),
    name: normalizeValue(fieldRefs.name.value),
    category: fieldRefs.category.value,
    itemType: fieldRefs.itemType.value,
    colours: getMultiSelectValues(fieldRefs.colours),
    details: getMultiSelectValues(fieldRefs.details),
    contexts: getMultiSelectValues(fieldRefs.contexts),
    styles: getMultiSelectValues(fieldRefs.styles),
    brand: fieldRefs.brand.value || null,
    sourceType: fieldRefs.sourceType.value || null,
    sourceChannel: deriveSourceChannel(fieldRefs.sourceType.value || ""),
    sourceLocation: fieldRefs.sourceLocation.value || null,
    wearFrequency: fieldRefs.wearFrequency.value,
    estimatedValue: Number(fieldRefs.estimatedValue.value),
    resaleWillingness,
    emotionalRating: fieldRefs.emotionalRating.value || null,
    lifecycleState: resaleWillingness === "Sell now" ? "sales" : "wardrobe",
    dateAdded: nowISO(),
    dateUpdated: nowISO()
  };
}

function resetAddItemForm() {
  addItemForm.reset();

  populateAllDropdowns();
  refreshItemTypeOptions();
  updateSectionVisibility();
  clearFeedback();

  fieldRefs.name.focus();
}

function handleAddItemSubmit(event) {
  event.preventDefault();
  clearFeedback();

  if (!validateAddItemForm()) {
    setFeedback("Please complete all required fields before adding the item.");
    moveToNextIncompleteSection();
    return;
  }

  const newItem = buildItemFromForm();

  items.push(newItem);
  saveItems();

  const destination =
    newItem.lifecycleState === "sales" ? "sales" : "wardrobe";

  resetAddItemForm();
  setFeedback(
    destination === "sales"
      ? "Item added to sales."
      : "Item added to wardrobe."
  );
}

// -----------------------------------------
// Event wiring
// -----------------------------------------

function wireAddItemEvents() {
  if (!addItemForm) return;

  fieldRefs.category.addEventListener("change", () => {
    refreshItemTypeOptions();
    evaluateProgression();
  });

  fieldRefs.itemType.addEventListener("change", evaluateProgression);
  fieldRefs.name.addEventListener("input", evaluateProgression);
  fieldRefs.colours.addEventListener("change", (event) => {
    handleAddNewSelections(event);
    evaluateProgression();
  });

  fieldRefs.details.addEventListener("change", handleAddNewSelections);
  fieldRefs.contexts.addEventListener("change", handleAddNewSelections);
  fieldRefs.styles.addEventListener("change", handleAddNewSelections);

  fieldRefs.brand.addEventListener("change", handleAddNewSelections);
  fieldRefs.sourceLocation.addEventListener("change", handleAddNewSelections);

  fieldRefs.sourceType.addEventListener("change", evaluateProgression);
  fieldRefs.wearFrequency.addEventListener("change", evaluateProgression);
  fieldRefs.estimatedValue.addEventListener("input", evaluateProgression);
  fieldRefs.resaleWillingness.addEventListener("change", evaluateProgression);
  fieldRefs.emotionalRating.addEventListener("change", evaluateProgression);

  addItemForm.addEventListener("submit", handleAddItemSubmit);
}

// -----------------------------------------
// App init
// -----------------------------------------

function initNavigation() {
  navControls.forEach((control) => {
    control.addEventListener("click", handleNavClick);
  });

  showSection("add-item");
}

function initAddItemForm() {
  if (!addItemForm) return;

  populateAllDropdowns();
  refreshItemTypeOptions();
  updateSectionVisibility();
  wireAddItemEvents();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAddItemForm();
});