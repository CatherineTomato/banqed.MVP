// =========================================
// banqed MVP - App Shell + Settings + Items
// Add Item page implementation
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

  brands: [
    "No brand identified",
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
    "Unknown",
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
  JSON.parse(localStorage.getItem("settings")) ||
  structuredClone(defaultSettingsData);

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
      getMultiSelectValues(fieldRefs.colours).length > 0 &&
      getMultiSelectValues(fieldRefs.details).length > 0
  },
  {
    key: "wearing",
    element: document.getElementById("section-wearing"),
    isComplete: () =>
      getMultiSelectValues(fieldRefs.contexts).length > 0 &&
      getMultiSelectValues(fieldRefs.styles).length > 0
  },
  {
    key: "source",
    element: document.getElementById("section-source"),
    isComplete: () =>
      fieldRefs.brand.value !== "" &&
      fieldRefs.sourceType.value !== "" &&
      fieldRefs.sourceLocation.value !== ""
  },
  {
    key: "usage",
    element: document.getElementById("section-usage"),
    isComplete: () =>
      fieldRefs.wearFrequency.value !== "" &&
      fieldRefs.estimatedValue.value !== "" &&
      Number(fieldRefs.estimatedValue.value) >= 0 &&
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
  if (feedbackEl) feedbackEl.textContent = "";
}

function setFeedback(message) {
  if (feedbackEl) feedbackEl.textContent = message;
}

function scrollToSection(sectionEl) {
  if (!sectionEl) return;

  sectionEl.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function sortCaseInsensitive(values) {
  values.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function addUniqueOption(targetArray, newValue) {
  const normalized = normalizeValue(newValue);
  if (!normalized) return null;

  const exists = targetArray.some(
    (item) => item.toLowerCase() === normalized.toLowerCase()
  );

  if (!exists) {
    targetArray.push(normalized);
    sortCaseInsensitive(targetArray);
    saveSettings();
  }

  const match = targetArray.find(
    (item) => item.toLowerCase() === normalized.toLowerCase()
  );

  return match || normalized;
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
      const previousValue = previousValues[0];
      const exists = Array.from(selectEl.options).some(
        (option) => option.value === previousValue
      );
      selectEl.value = exists ? previousValue : "";
    }
  }
}

function populateAllDropdowns() {
  populateSelect(fieldRefs.category, settingsData.categories, {
    placeholder: "Select category",
    includeAddNew: true
  });

  populateSelect(fieldRefs.itemType, [], {
    placeholder: "Select item type",
    includeAddNew: true
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

function refreshItemTypeOptions(preserve = false) {
  const selectedCategory = fieldRefs.category.value;
  const itemTypeOptions =
    settingsData.itemTypesByCategory[selectedCategory] || [];

  populateSelect(fieldRefs.itemType, itemTypeOptions, {
    placeholder: "Select item type",
    includeAddNew: true,
    preserveValue: preserve
  });
}

// -----------------------------------------
// Add-new behaviour
// -----------------------------------------

function addNewSingleValueOption(settingsKey, selectEl, promptLabel, placeholder) {
  const rawValue = window.prompt(promptLabel);

  if (!rawValue) {
    selectEl.value = "";
    return;
  }

  const storedValue = addUniqueOption(settingsData[settingsKey], rawValue);

  populateSelect(selectEl, settingsData[settingsKey], {
    placeholder,
    includeAddNew: true
  });

  if (storedValue) {
    selectEl.value = storedValue;
  }
}

function addNewMultiValueOption(settingsKey, selectEl, promptLabel) {
  const rawValue = window.prompt(promptLabel);

  if (!rawValue) {
    populateSelect(selectEl, settingsData[settingsKey], {
      includeAddNew: true,
      multi: true,
      preserveValue: true
    });
    return;
  }

  const storedValue = addUniqueOption(settingsData[settingsKey], rawValue);
  const previousValues = getMultiSelectValues(selectEl);
  const nextValues = storedValue
    ? Array.from(new Set([...previousValues, storedValue]))
    : previousValues;

  populateSelect(selectEl, settingsData[settingsKey], {
    includeAddNew: true,
    multi: true
  });

  Array.from(selectEl.options).forEach((option) => {
    option.selected = nextValues.includes(option.value);
  });
}

function addNewItemTypeOption() {
  const selectedCategory = fieldRefs.category.value;

  if (!selectedCategory) {
    setFeedback("Select a category before adding a new item type.");
    fieldRefs.itemType.value = "";
    return;
  }

  const rawValue = window.prompt("Add new item type");

  if (!rawValue) {
    fieldRefs.itemType.value = "";
    return;
  }

  const targetArray = settingsData.itemTypesByCategory[selectedCategory] || [];
  const storedValue = addUniqueOption(targetArray, rawValue);
  settingsData.itemTypesByCategory[selectedCategory] = targetArray;
  saveSettings();

  refreshItemTypeOptions(false);

  if (storedValue) {
    fieldRefs.itemType.value = storedValue;
  }
}

function handleSingleAddNew(event) {
  const selectEl = event.currentTarget;

  if (selectEl.value !== "__add_new__") return;

  if (selectEl === fieldRefs.category) {
    addNewSingleValueOption(
      "categories",
      fieldRefs.category,
      "Add new category",
      "Select category"
    );
    fieldRefs.itemType.value = "";
    refreshItemTypeOptions(false);
    evaluateProgression();
    return;
  }

  if (selectEl === fieldRefs.itemType) {
    addNewItemTypeOption();
    evaluateProgression();
    return;
  }

  if (selectEl === fieldRefs.brand) {
    addNewSingleValueOption(
      "brands",
      fieldRefs.brand,
      "Add new brand",
      "Select brand"
    );
    evaluateProgression();
    return;
  }

  if (selectEl === fieldRefs.sourceLocation) {
    addNewSingleValueOption(
      "sourceLocations",
      fieldRefs.sourceLocation,
      "Add new source location",
      "Select source location"
    );
    evaluateProgression();
  }
}

function handleMultiAddNew(event, settingsKey, promptLabel) {
  const selectEl = event.currentTarget;
  const containsAddNew = Array.from(selectEl.selectedOptions).some(
    (option) => option.value === "__add_new__"
  );

  if (!containsAddNew) return;

  addNewMultiValueOption(settingsKey, selectEl, promptLabel);
  evaluateProgression();
}

// -----------------------------------------
// Sequential reveal
// -----------------------------------------

function updateSectionVisibility() {
  let firstIncompleteFound = false;

  formSections.forEach((section) => {
    section.element.classList.remove("is-active", "is-complete");

    const complete = section.isComplete();

    if (complete) {
      section.element.classList.add("is-complete");
      return;
    }

    if (!firstIncompleteFound) {
      section.element.classList.add("is-active");
      firstIncompleteFound = true;
    }
  });
}

function evaluateProgression() {
  const previousActive = formSections.find((section) =>
    section.element.classList.contains("is-active")
  );

  updateSectionVisibility();

  const currentActive = formSections.find((section) =>
    section.element.classList.contains("is-active")
  );

  if (
    previousActive &&
    currentActive &&
    previousActive.key !== currentActive.key
  ) {
    scrollToSection(currentActive.element);
  }
}

// -----------------------------------------
// Validation + item creation
// -----------------------------------------

function validateAddItemForm() {
  const errors = [];

  if (fieldRefs.name.value.trim() === "") {
    errors.push("Item name is required.");
  }

  if (fieldRefs.category.value === "") {
    errors.push("Category is required.");
  }

  if (fieldRefs.itemType.value === "") {
    errors.push("Item type is required.");
  }

  if (getMultiSelectValues(fieldRefs.colours).length === 0) {
    errors.push("Select at least one colour.");
  }

  if (getMultiSelectValues(fieldRefs.details).length === 0) {
    errors.push("Select at least one detail.");
  }

  if (getMultiSelectValues(fieldRefs.contexts).length === 0) {
    errors.push("Select at least one context.");
  }

  if (getMultiSelectValues(fieldRefs.styles).length === 0) {
    errors.push("Select at least one style.");
  }

  if (fieldRefs.brand.value === "") {
    errors.push("Brand is required.");
  }

  if (fieldRefs.sourceType.value === "") {
    errors.push("Source type is required.");
  }

  if (fieldRefs.sourceLocation.value === "") {
    errors.push("Source location is required.");
  }

  if (fieldRefs.wearFrequency.value === "") {
    errors.push("Wear frequency is required.");
  }

  if (
    fieldRefs.estimatedValue.value === "" ||
    Number(fieldRefs.estimatedValue.value) < 0
  ) {
    errors.push("Estimated resale value must be a non-negative number.");
  }

  if (fieldRefs.resaleWillingness.value === "") {
    errors.push("Resale willingness is required.");
  }

  return errors;
}

function buildItemFromForm() {
  const status =
    fieldRefs.resaleWillingness.value === "Sell now" ? "sales" : "wardrobe";

  return {
    id: generateId(),
    name: normalizeValue(fieldRefs.name.value),
    category: fieldRefs.category.value,
    itemType: fieldRefs.itemType.value,
    colours: getMultiSelectValues(fieldRefs.colours),
    details: getMultiSelectValues(fieldRefs.details),
    contexts: getMultiSelectValues(fieldRefs.contexts),
    styles: getMultiSelectValues(fieldRefs.styles),
    brand: fieldRefs.brand.value,
    sourceType: fieldRefs.sourceType.value,
    sourceChannel: deriveSourceChannel(fieldRefs.sourceType.value),
    sourceLocation: fieldRefs.sourceLocation.value,
    wearFrequency: fieldRefs.wearFrequency.value,
    estimatedValue: Number(fieldRefs.estimatedValue.value),
    resaleWillingness: fieldRefs.resaleWillingness.value,
    emotionalRating:
      fieldRefs.emotionalRating.value !== ""
        ? [fieldRefs.emotionalRating.value]
        : null,
    status,
    dateAdded: nowISO(),
    dateUpdated: nowISO()
  };
}

function resetAddItemForm() {
  addItemForm.reset();
  clearFeedback();

  populateAllDropdowns();
  refreshItemTypeOptions(false);
  updateSectionVisibility();

  fieldRefs.name.focus();
}

function handleAddItemSubmit(event) {
  event.preventDefault();
  clearFeedback();

  const errors = validateAddItemForm();

  if (errors.length > 0) {
    setFeedback(errors[0]);
    evaluateProgression();
    const firstIncomplete = formSections.find((section) => !section.isComplete());
    if (firstIncomplete) {
      scrollToSection(firstIncomplete.element);
    }
    return;
  }

  const newItem = buildItemFromForm();
  items.push(newItem);
  saveItems();

  const message =
    newItem.status === "sales"
      ? "Item added to sales."
      : "Item added to wardrobe.";

  resetAddItemForm();
  setFeedback(message);
}

// -----------------------------------------
// Source defaults
// -----------------------------------------

function handleSourceTypeDefaults() {
  const transferTypes = ["Hand-me-down", "Present"];

  if (
    transferTypes.includes(fieldRefs.sourceType.value) &&
    fieldRefs.sourceLocation.value === ""
  ) {
    fieldRefs.sourceLocation.value = "Unknown";
  }

  evaluateProgression();
}

// -----------------------------------------
// Event wiring
// -----------------------------------------

function wireAddItemEvents() {
  if (!addItemForm) return;

  fieldRefs.name.addEventListener("input", evaluateProgression);

  fieldRefs.category.addEventListener("change", () => {
    clearFeedback();
    handleSingleAddNew({ currentTarget: fieldRefs.category });

    if (fieldRefs.category.value !== "__add_new__") {
      fieldRefs.itemType.value = "";
      refreshItemTypeOptions(false);
    }

    evaluateProgression();
  });

  fieldRefs.itemType.addEventListener("change", () => {
    clearFeedback();
    handleSingleAddNew({ currentTarget: fieldRefs.itemType });
    evaluateProgression();
  });

  fieldRefs.colours.addEventListener("change", (event) => {
    clearFeedback();
    handleMultiAddNew(event, "colours", "Add new colour");
    evaluateProgression();
  });

  fieldRefs.details.addEventListener("change", (event) => {
    clearFeedback();
    handleMultiAddNew(event, "details", "Add new detail");
    evaluateProgression();
  });

  fieldRefs.contexts.addEventListener("change", (event) => {
    clearFeedback();
    handleMultiAddNew(event, "contexts", "Add new context");
    evaluateProgression();
  });

  fieldRefs.styles.addEventListener("change", (event) => {
    clearFeedback();
    handleMultiAddNew(event, "styles", "Add new style");
    evaluateProgression();
  });

  fieldRefs.brand.addEventListener("change", () => {
    clearFeedback();
    handleSingleAddNew({ currentTarget: fieldRefs.brand });
    evaluateProgression();
  });

  fieldRefs.sourceType.addEventListener("change", () => {
    clearFeedback();
    handleSourceTypeDefaults();
  });

  fieldRefs.sourceLocation.addEventListener("change", () => {
    clearFeedback();
    handleSingleAddNew({ currentTarget: fieldRefs.sourceLocation });
    evaluateProgression();
  });

  fieldRefs.wearFrequency.addEventListener("change", evaluateProgression);
  fieldRefs.estimatedValue.addEventListener("input", evaluateProgression);
  fieldRefs.resaleWillingness.addEventListener("change", evaluateProgression);
  fieldRefs.emotionalRating.addEventListener("change", evaluateProgression);

  addItemForm.addEventListener("submit", handleAddItemSubmit);
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

function initAddItemForm() {
  if (!addItemForm) return;

  populateAllDropdowns();
  refreshItemTypeOptions(false);
  updateSectionVisibility();
  wireAddItemEvents();
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAddItemForm();
});