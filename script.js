// =========================================
// banqed MVP - App Shell + Settings + Items
// Add Item workflow refined
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
  showSection(event.currentTarget.dataset.section);
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
// Helpers
// -----------------------------------------

function generateId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `item_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowISO() {
  return new Date().toISOString();
}

function deriveSourceChannel(sourceType) {
  const inPersonTypes = ["Charity shop", "Vintage shop", "Market", "In-store"];
  const transferTypes = ["Hand-me-down", "Present"];

  if (inPersonTypes.includes(sourceType)) return "In-person";
  if (sourceType === "Online") return "Online";
  if (transferTypes.includes(sourceType)) return "Transfer";
  return null;
}

function sortCaseInsensitive(values) {
  values.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
}

function addUniqueOption(targetArray, newValue) {
  const normalized = normalizeValue(newValue);
  if (!normalized) return null;

  const existing = targetArray.find(
    (item) => item.toLowerCase() === normalized.toLowerCase()
  );

  if (existing) return existing;

  targetArray.push(normalized);
  sortCaseInsensitive(targetArray);
  saveSettings();

  return normalized;
}

// -----------------------------------------
// DOM refs
// -----------------------------------------

const addItemForm = document.getElementById("add-item-form");
const feedbackEl = document.getElementById("form-feedback");
const addItemLayout = document.getElementById("add-item-layout");
const addItemPlus = document.getElementById("add-item-plus");

const fieldRefs = {
  name: document.getElementById("item-name"),
  category: document.getElementById("item-category"),
  itemType: document.getElementById("item-type"),
  brand: document.getElementById("item-brand"),
  sourceType: document.getElementById("item-source-type"),
  sourceLocation: document.getElementById("item-source-location"),
  wearFrequency: document.getElementById("item-wear-frequency"),
  estimatedValue: document.getElementById("item-estimated-value"),
  resaleWillingness: document.getElementById("item-resale-willingness")
};

const multiState = {
  colours: [],
  details: [],
  contexts: [],
  styles: [],
  emotionalRating: []
};

const multiDraftState = {
  colours: [],
  details: [],
  contexts: [],
  styles: [],
  emotionalRating: []
};

const multiConfig = {
  colours: {
    label: "Select colours",
    optionsKey: "colours",
    addPrompt: "Add new colour"
  },
  details: {
    label: "Select details",
    optionsKey: "details",
    addPrompt: "Add new detail"
  },
  contexts: {
    label: "Select contexts",
    optionsKey: "contexts",
    addPrompt: "Add new context"
  },
  styles: {
    label: "Select styles",
    optionsKey: "styles",
    addPrompt: "Add new style"
  },
  emotionalRating: {
    label: "Select emotional rating",
    optionsKey: "emotionalRatings",
    addPrompt: null
  }
};

const sectionOrder = ["identity", "wearing", "source", "usage", "emotion"];
let activeSectionKey = "identity";
const completedSections = new Set();

const formSections = {
  identity: document.getElementById("section-identity"),
  wearing: document.getElementById("section-wearing"),
  source: document.getElementById("section-source"),
  usage: document.getElementById("section-usage"),
  emotion: document.getElementById("section-emotion")
};

// -----------------------------------------
// Feedback
// -----------------------------------------

function clearFeedback() {
  if (feedbackEl) feedbackEl.textContent = "";
}

function setFeedback(message) {
  if (feedbackEl) feedbackEl.textContent = message;
}

// -----------------------------------------
// Single-select population
// -----------------------------------------

function populateSingleSelect(selectEl, options, placeholder, includeAddNew = false) {
  const previousValue = selectEl.value;
  selectEl.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholder;
  selectEl.appendChild(placeholderOption);

  options.forEach((value) => {
    const optionEl = document.createElement("option");
    optionEl.value = value;
    optionEl.textContent = value;
    selectEl.appendChild(optionEl);
  });

  if (includeAddNew) {
    const addNewOption = document.createElement("option");
    addNewOption.value = "__add_new__";
    addNewOption.textContent = "+ Add new";
    selectEl.appendChild(addNewOption);
  }

  const exists = Array.from(selectEl.options).some(
    (option) => option.value === previousValue
  );
  selectEl.value = exists ? previousValue : "";
}

function refreshItemTypeOptions() {
  const category = fieldRefs.category.value;
  const options = settingsData.itemTypesByCategory[category] || [];
  populateSingleSelect(fieldRefs.itemType, options, "Select item type", true);
}

function populateSingleDropdowns() {
  populateSingleSelect(
    fieldRefs.category,
    settingsData.categories,
    "Select category",
    true
  );

  populateSingleSelect(fieldRefs.itemType, [], "Select item type", true);

  populateSingleSelect(
    fieldRefs.brand,
    settingsData.brands,
    "Select brand",
    true
  );

  populateSingleSelect(
    fieldRefs.sourceType,
    settingsData.sourceTypes,
    "Select source type"
  );

  populateSingleSelect(
    fieldRefs.sourceLocation,
    settingsData.sourceLocations,
    "Select source location",
    true
  );

  populateSingleSelect(
    fieldRefs.wearFrequency,
    settingsData.wearFrequencies,
    "Select wear frequency"
  );

  populateSingleSelect(
    fieldRefs.resaleWillingness,
    settingsData.resaleWillingnessOptions,
    "Select resale willingness"
  );
}

// -----------------------------------------
// Multi-select rendering
// -----------------------------------------

function formatMultiTriggerLabel(fieldKey) {
  const values = multiState[fieldKey];
  const baseLabel = multiConfig[fieldKey].label;

  if (!values.length) return baseLabel;
  if (values.length === 1) return values[0];
  if (values.length === 2) return `${values[0]}, ${values[1]}`;
  return `${values.length} selected`;
}

function cloneCommittedStateToDraft(fieldKey) {
  multiDraftState[fieldKey] = [...multiState[fieldKey]];
}

function renderMultiSelect(fieldKey) {
  const trigger = document.querySelector(`[data-multi-trigger="${fieldKey}"]`);
  const panel = document.querySelector(`[data-multi-panel="${fieldKey}"]`);
  const optionsWrap = document.querySelector(`[data-multi-options="${fieldKey}"]`);

  if (!trigger || !panel || !optionsWrap) return;

  const options = settingsData[multiConfig[fieldKey].optionsKey];
  optionsWrap.innerHTML = "";

  options.forEach((value) => {
    const optionEl = document.createElement("button");
    optionEl.type = "button";
    optionEl.className = "multi-select__option";

    if (multiDraftState[fieldKey].includes(value)) {
      optionEl.classList.add("is-selected");
    }

    optionEl.addEventListener("click", () => {
      const isSelected = multiDraftState[fieldKey].includes(value);

      if (isSelected) {
        multiDraftState[fieldKey] = multiDraftState[fieldKey].filter(
          (item) => item !== value
        );
        optionEl.classList.remove("is-selected");
      } else {
        multiDraftState[fieldKey].push(value);
        optionEl.classList.add("is-selected");
      }
    });

    const textEl = document.createElement("span");
    textEl.className = "multi-select__label";
    textEl.textContent = value;

    optionEl.appendChild(textEl);
    optionsWrap.appendChild(optionEl);
  });

  trigger.textContent = formatMultiTriggerLabel(fieldKey);
}

function renderAllMultiSelects() {
  Object.keys(multiConfig).forEach(renderMultiSelect);
}

function closeAllMultiPanels() {
  document.querySelectorAll(".multi-select").forEach((multiEl) => {
    multiEl.classList.remove("is-open");
  });

  document.querySelectorAll("[data-multi-panel]").forEach((panel) => {
    panel.hidden = true;
  });

  document.querySelectorAll("[data-multi-trigger]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
}

function openMultiPanel(fieldKey) {
  closeAllMultiPanels();
  cloneCommittedStateToDraft(fieldKey);
  renderMultiSelect(fieldKey);

  const multiEl = document.querySelector(`.multi-select[data-field="${fieldKey}"]`);
  const panel = document.querySelector(`[data-multi-panel="${fieldKey}"]`);
  const trigger = document.querySelector(`[data-multi-trigger="${fieldKey}"]`);

  if (!multiEl || !panel || !trigger) return;

  const parentSection = multiEl.closest(".form-section");
  if (parentSection) {
    scrollSectionIntoWorkingPosition(parentSection);
  }

  multiEl.classList.add("is-open");
  panel.hidden = false;
  trigger.setAttribute("aria-expanded", "true");
}

function handleMultiAdd(fieldKey) {
  const promptLabel = multiConfig[fieldKey].addPrompt;
  if (!promptLabel) return;

  const rawValue = window.prompt(promptLabel);
  if (!rawValue) return;

  const optionsKey = multiConfig[fieldKey].optionsKey;
  const storedValue = addUniqueOption(settingsData[optionsKey], rawValue);
  if (!storedValue) return;

  if (!multiDraftState[fieldKey].includes(storedValue)) {
    multiDraftState[fieldKey].push(storedValue);
  }

  renderMultiSelect(fieldKey);
}

function saveMultiPanel(fieldKey) {
  multiState[fieldKey] = [...multiDraftState[fieldKey]];
  renderMultiSelect(fieldKey);
  closeAllMultiPanels();

  const parentSection = document
    .querySelector(`.multi-select[data-field="${fieldKey}"]`)
    ?.closest(".form-section");

  if (!parentSection) return;

  const sectionKey = parentSection.dataset.sectionKey;

  if (sectionKey && isSectionComplete(sectionKey)) {
    completeSectionAndAdvance(sectionKey);
  } else {
    renderSectionStates();
  }
}

// -----------------------------------------
// Section state
// -----------------------------------------

function getSectionIndex(key) {
  return sectionOrder.indexOf(key);
}

function isSectionComplete(key) {
  if (key === "identity") {
    return (
      fieldRefs.name.value.trim() !== "" &&
      fieldRefs.category.value !== "" &&
      fieldRefs.itemType.value !== "" &&
      multiState.colours.length > 0 &&
      multiState.details.length > 0
    );
  }

  if (key === "wearing") {
    return multiState.contexts.length > 0 && multiState.styles.length > 0;
  }

  if (key === "source") {
    return (
      fieldRefs.brand.value !== "" &&
      fieldRefs.sourceType.value !== "" &&
      fieldRefs.sourceLocation.value !== ""
    );
  }

  if (key === "usage") {
    return (
      fieldRefs.wearFrequency.value !== "" &&
      fieldRefs.estimatedValue.value !== "" &&
      Number(fieldRefs.estimatedValue.value) >= 0 &&
      fieldRefs.resaleWillingness.value !== ""
    );
  }

  if (key === "emotion") {
    return true;
  }

  return false;
}

function renderSectionStates() {
  const safeActiveKey = formSections[activeSectionKey] ? activeSectionKey : "identity";

  sectionOrder.forEach((key) => {
    const sectionEl = formSections[key];
    if (!sectionEl) return;

    sectionEl.classList.remove("is-active", "is-complete");

    if (key === safeActiveKey) {
      sectionEl.classList.add("is-active");
      sectionEl.style.pointerEvents = "auto";
    } else if (completedSections.has(key)) {
      sectionEl.classList.add("is-complete");
      sectionEl.style.pointerEvents = "auto";
    } else {
      sectionEl.style.pointerEvents = "none";
    }
  });

  activeSectionKey = safeActiveKey;
  updatePlusPosition();
}

function scrollSectionIntoWorkingPosition(sectionEl) {
  if (!sectionEl) return;

  const rect = sectionEl.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;

  // Place the active section slightly above centre
  // so there is room for dropdowns to open beneath it.
  const targetTop = absoluteTop - (window.innerHeight * 0.22);

  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: "smooth"
  });
}

function scrollActiveSectionIntoWorkingPosition() {
  const activeSection = formSections[activeSectionKey];
  scrollSectionIntoWorkingPosition(activeSection);
}

function setActiveSection(key, scroll = false) {
  activeSectionKey = key;
  renderSectionStates();

  if (scroll) {
    scrollActiveSectionIntoWorkingPosition();
  }
}

function completeSectionAndAdvance(sectionKey) {
  completedSections.add(sectionKey);

  const currentIndex = getSectionIndex(sectionKey);
  const nextKey = sectionOrder[currentIndex + 1];

  if (nextKey) {
    activeSectionKey = nextKey;
    renderSectionStates();
    formSections[nextKey]?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } else {
    renderSectionStates();
  }
}

function updatePlusPosition() {
  if (!addItemLayout || !addItemPlus) return;

  const activeSection = formSections[activeSectionKey];
  if (!activeSection) return;

  const sectionTop = activeSection.offsetTop;
  const sectionHeight = activeSection.offsetHeight;
  const plusHeight = addItemPlus.offsetHeight;

  const offset = Math.max(0, sectionTop + sectionHeight / 2 - plusHeight / 2);
  addItemLayout.style.setProperty("--plus-offset", `${offset}px`);
}

function validateSection(key) {
  if (key === "identity") {
    if (fieldRefs.name.value.trim() === "") return "Item name is required.";
    if (fieldRefs.category.value === "") return "Category is required.";
    if (fieldRefs.itemType.value === "") return "Item type is required.";
    if (multiState.colours.length === 0) return "Select at least one colour.";
    if (multiState.details.length === 0) return "Select at least one detail.";
    return null;
  }

  if (key === "wearing") {
    if (multiState.contexts.length === 0) return "Select at least one context.";
    if (multiState.styles.length === 0) return "Select at least one style.";
    return null;
  }

  if (key === "source") {
    if (fieldRefs.brand.value === "") return "Brand is required.";
    if (fieldRefs.sourceType.value === "") return "Source type is required.";
    if (fieldRefs.sourceLocation.value === "") return "Source location is required.";
    return null;
  }

  if (key === "usage") {
    if (fieldRefs.wearFrequency.value === "") return "Wear frequency is required.";
    if (
      fieldRefs.estimatedValue.value === "" ||
      Number(fieldRefs.estimatedValue.value) < 0
    ) {
      return "Estimated resale value must be a non-negative number.";
    }
    if (fieldRefs.resaleWillingness.value === "") {
      return "Resale willingness is required.";
    }
    return null;
  }

  return null;
}

// -----------------------------------------
// Submission
// -----------------------------------------

function buildItemFromForm() {
  const status =
    fieldRefs.resaleWillingness.value === "Sell now" ? "sales" : "wardrobe";

  return {
    id: generateId(),
    name: normalizeValue(fieldRefs.name.value),
    category: fieldRefs.category.value,
    itemType: fieldRefs.itemType.value,
    colours: [...multiState.colours],
    details: [...multiState.details],
    contexts: [...multiState.contexts],
    styles: [...multiState.styles],
    brand: fieldRefs.brand.value,
    sourceType: fieldRefs.sourceType.value,
    sourceChannel: deriveSourceChannel(fieldRefs.sourceType.value),
    sourceLocation: fieldRefs.sourceLocation.value,
    wearFrequency: fieldRefs.wearFrequency.value,
    estimatedValue: Number(fieldRefs.estimatedValue.value),
    resaleWillingness: fieldRefs.resaleWillingness.value,
    emotionalRating: multiState.emotionalRating.length
      ? [...multiState.emotionalRating]
      : null,
    status,
    dateAdded: nowISO(),
    dateUpdated: nowISO()
  };
}

function validateFullForm() {
  for (const key of ["identity", "wearing", "source", "usage"]) {
    const error = validateSection(key);
    if (error) return { key, error };
  }

  return null;
}

function resetAddItemForm() {
  addItemForm.reset();
  clearFeedback();

  Object.keys(multiState).forEach((key) => {
    multiState[key] = [];
    multiDraftState[key] = [];
  });

  completedSections.clear();
  activeSectionKey = "identity";

  populateSingleDropdowns();
  refreshItemTypeOptions();
  renderAllMultiSelects();
  closeAllMultiPanels();
  renderSectionStates();

  fieldRefs.name.focus();
}

function handleAddItemSubmit(event) {
  event.preventDefault();
  clearFeedback();

  const validation = validateFullForm();
  if (validation) {
    setFeedback(validation.error);
    setActiveSection(validation.key, true);
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
// Single-select add-new handling
// -----------------------------------------

function handleSelectAddNew(selectEl, settingsKey, placeholder, promptText) {
  if (selectEl.value !== "__add_new__") return;

  const rawValue = window.prompt(promptText);
  if (!rawValue) {
    selectEl.value = "";
    return;
  }

  const storedValue = addUniqueOption(settingsData[settingsKey], rawValue);
  populateSingleSelect(selectEl, settingsData[settingsKey], placeholder, true);

  if (storedValue) {
    selectEl.value = storedValue;
  }
}

function handleCategoryChange() {
  clearFeedback();

  if (fieldRefs.category.value === "__add_new__") {
    const rawValue = window.prompt("Add new category");
    if (!rawValue) {
      fieldRefs.category.value = "";
      refreshItemTypeOptions();
      return;
    }

    const storedValue = addUniqueOption(settingsData.categories, rawValue);
    populateSingleSelect(
      fieldRefs.category,
      settingsData.categories,
      "Select category",
      true
    );
    if (storedValue) fieldRefs.category.value = storedValue;
  }

  fieldRefs.itemType.value = "";
  refreshItemTypeOptions();
  renderSectionStates();
}

function handleItemTypeChange() {
  clearFeedback();

  if (fieldRefs.itemType.value !== "__add_new__") {
    renderSectionStates();
    return;
  }

  const category = fieldRefs.category.value;
  if (!category) {
    setFeedback("Select a category before adding a new item type.");
    fieldRefs.itemType.value = "";
    return;
  }

  const rawValue = window.prompt("Add new item type");
  if (!rawValue) {
    fieldRefs.itemType.value = "";
    return;
  }

  const targetArray = settingsData.itemTypesByCategory[category] || [];
  const storedValue = addUniqueOption(targetArray, rawValue);
  settingsData.itemTypesByCategory[category] = targetArray;
  saveSettings();

  refreshItemTypeOptions();
  if (storedValue) fieldRefs.itemType.value = storedValue;
  renderSectionStates();
}

function handleSourceTypeChange() {
  clearFeedback();

  const transferTypes = ["Hand-me-down", "Present"];
  if (
    transferTypes.includes(fieldRefs.sourceType.value) &&
    fieldRefs.sourceLocation.value === ""
  ) {
    fieldRefs.sourceLocation.value = "Unknown";
  }

  if (isSectionComplete("source")) {
    completeSectionAndAdvance("source");
  } else {
    renderSectionStates();
  }
}

function handleSourceLocationChange() {
  clearFeedback();

  handleSelectAddNew(
    fieldRefs.sourceLocation,
    "sourceLocations",
    "Select source location",
    "Add new source location"
  );

  if (isSectionComplete("source")) {
    completeSectionAndAdvance("source");
  } else {
    renderSectionStates();
  }
}

function handleBrandChange() {
  clearFeedback();

  handleSelectAddNew(
    fieldRefs.brand,
    "brands",
    "Select brand",
    "Add new brand"
  );

  if (isSectionComplete("source")) {
    completeSectionAndAdvance("source");
  } else {
    renderSectionStates();
  }
}

function handleUsageFieldChange() {
  clearFeedback();

  if (isSectionComplete("usage")) {
    completeSectionAndAdvance("usage");
  } else {
    renderSectionStates();
  }
}

// -----------------------------------------
// Wiring
// -----------------------------------------

function wireNavigation() {
  navControls.forEach((control) => {
    control.addEventListener("click", handleNavClick);
  });
}

function wireSingleSelects() {
  fieldRefs.category.addEventListener("change", handleCategoryChange);
  fieldRefs.itemType.addEventListener("change", handleItemTypeChange);
  fieldRefs.brand.addEventListener("change", handleBrandChange);
  fieldRefs.sourceType.addEventListener("change", handleSourceTypeChange);
  fieldRefs.sourceLocation.addEventListener("change", handleSourceLocationChange);
  fieldRefs.wearFrequency.addEventListener("change", handleUsageFieldChange);
  fieldRefs.estimatedValue.addEventListener("input", handleUsageFieldChange);
  fieldRefs.resaleWillingness.addEventListener("change", handleUsageFieldChange);
  fieldRefs.name.addEventListener("input", renderSectionStates);
}

function wireMultiSelects() {
  document.querySelectorAll("[data-multi-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      openMultiPanel(trigger.dataset.multiTrigger);
    });
  });

  document.querySelectorAll("[data-multi-add]").forEach((button) => {
    button.addEventListener("click", () => {
      handleMultiAdd(button.dataset.multiAdd);
    });
  });

  document.querySelectorAll("[data-multi-save]").forEach((button) => {
    button.addEventListener("click", () => {
      saveMultiPanel(button.dataset.multiSave);
    });
  });

  document.addEventListener("click", (event) => {
    const inside = event.target.closest(".multi-select");
    if (!inside) {
      closeAllMultiPanels();
      renderAllMultiSelects();
    }
  });
}

function initAddItemForm() {
  if (!addItemForm) return;

  populateSingleDropdowns();
  refreshItemTypeOptions();
  renderAllMultiSelects();
  closeAllMultiPanels();

  activeSectionKey = "identity";
  renderSectionStates();

  wireSingleSelects();
  wireMultiSelects();

  addItemForm.addEventListener("submit", handleAddItemSubmit);
  window.addEventListener("resize", updatePlusPosition);
}

// -----------------------------------------
// App Init
// -----------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  wireNavigation();
  showSection("add-item");
  initAddItemForm();
});