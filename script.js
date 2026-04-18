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
  const targetSection = event.currentTarget?.dataset?.section;
  if (!targetSection) return;
  showSection(targetSection);
}

function wireNavigation() {
  navControls.forEach((control) => {
    control.addEventListener("click", handleNavClick);
  });
}

function normalizeValue(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
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
    Shorts: ["Denim shorts", "Cargo shorts", "Sports shorts"],
    Skirts: ["Mini skirt", "Midi skirt", "Maxi skirt", "Tennis skirt"],
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
    Swimwear: ["Bikini", "Swimsuit", "Cover-up"],
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

function cloneDefaultSettings() {
  if (typeof structuredClone === "function") {
    return structuredClone(defaultSettingsData);
  }

  return JSON.parse(JSON.stringify(defaultSettingsData));
}

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem("settings"));
    return stored || cloneDefaultSettings();
  } catch {
    return cloneDefaultSettings();
  }
}

let settingsData = loadSettings();

function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(settingsData));
}

function loadItems() {
  try {
    const stored = JSON.parse(localStorage.getItem("items"));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

let items = loadItems();

function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

function generateId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }

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

function formatCurrency(value) {
  const numericValue = Number(value) || 0;

  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: numericValue % 1 === 0 ? 0 : 2
  }).format(numericValue);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getItemLifecycleState(item) {
  return item.lifecycleState || item.status || "wardrobe";
}

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

const wardrobeRefs = {
  itemCount: document.getElementById("wardrobe-item-count"),
  totalValue: document.getElementById("wardrobe-total-value"),
  tableBody: document.getElementById("wardrobe-table-body"),
  emptyState: document.getElementById("wardrobe-empty-state"),
  tableWrap: document.getElementById("wardrobe-table-wrap")
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
    addPrompt: "Add new colour",
    singleSelect: false
  },
  details: {
    label: "Select details",
    optionsKey: "details",
    addPrompt: "Add new detail",
    singleSelect: false
  },
  contexts: {
    label: "Select contexts",
    optionsKey: "contexts",
    addPrompt: "Add new context",
    singleSelect: false
  },
  styles: {
    label: "Select styles",
    optionsKey: "styles",
    addPrompt: "Add new style",
    singleSelect: false
  },
  emotionalRating: {
    label: "Select emotional rating",
    optionsKey: "emotionalRatings",
    addPrompt: null,
    singleSelect: true
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

const wardrobeQueryState = {
  filters: {
    category: [],
    colours: [],
    brand: [],
    wearFrequency: [],
    resaleWillingness: [],
    emotionalRating: [],
    estimatedValue: {
      min: "",
      max: ""
    }
  },
  sort: {
    option: ""
  }
};

const wardrobeQueryRefs = {
  filterTrigger: document.getElementById("wardrobe-filter-trigger"),
  sortTrigger: document.getElementById("wardrobe-sort-trigger"),
  filterPanel: document.getElementById("wardrobe-filter-panel"),
  sortPanel: document.getElementById("wardrobe-sort-panel"),
  activeBar: document.getElementById("wardrobe-active-query-bar"),
  activeTokens: document.getElementById("wardrobe-active-query-tokens"),
  clearQuery: document.getElementById("wardrobe-clear-query"),
  clearQueryEmpty: document.getElementById("wardrobe-clear-query-empty"),
  noResults: document.getElementById("wardrobe-no-results"),
  filterCategory: document.getElementById("filter-category"),
  filterColours: document.getElementById("filter-colours"),
  filterBrand: document.getElementById("filter-brand"),
  filterWearFrequency: document.getElementById("filter-wear-frequency"),
  filterResaleWillingness: document.getElementById("filter-resale-willingness"),
  filterEmotionalRating: document.getElementById("filter-emotional-rating"),
  filterValueMin: document.getElementById("filter-value-min"),
  filterValueMax: document.getElementById("filter-value-max"),
  sortOption: document.getElementById("sort-option")
};

const emotionalRatingOrder = {
  Love: 7,
  "Really like": 6,
  "High potential": 5,
  Potential: 4,
  "It’s ok": 3,
  Indifferent: 2,
  "Not keen": 1
};

function clearFeedback() {
  if (feedbackEl) feedbackEl.textContent = "";
}

function setFeedback(message) {
  if (feedbackEl) feedbackEl.textContent = message;
}

function populateSingleSelect(selectEl, options, placeholder, includeAddNew = false) {
  if (!selectEl) return;

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
  if (!fieldRefs.category || !fieldRefs.itemType) return;

  const category = fieldRefs.category.value;
  const options = settingsData.itemTypesByCategory[category] || [];
  populateSingleSelect(fieldRefs.itemType, options, "Select item type", true);
}

function populateSingleDropdowns() {
  populateSingleSelect(fieldRefs.category, settingsData.categories, "Select category", true);
  populateSingleSelect(fieldRefs.itemType, [], "Select item type", true);
  populateSingleSelect(fieldRefs.brand, settingsData.brands, "Select brand", true);
  populateSingleSelect(fieldRefs.sourceType, settingsData.sourceTypes, "Select source type");
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

function toggleDraftSelection(fieldKey, value) {
  const config = multiConfig[fieldKey];
  const draft = multiDraftState[fieldKey];
  const isSelected = draft.includes(value);

  if (config.singleSelect) {
    multiDraftState[fieldKey] = isSelected ? [] : [value];
    return;
  }

  if (isSelected) {
    multiDraftState[fieldKey] = draft.filter((item) => item !== value);
  } else {
    multiDraftState[fieldKey] = [...draft, value];
  }
}

function renderMultiSelect(fieldKey) {
  const trigger = document.querySelector(`[data-multi-trigger="${fieldKey}"]`);
  const optionsWrap = document.querySelector(`[data-multi-options="${fieldKey}"]`);
  const panel = document.querySelector(`[data-multi-panel="${fieldKey}"]`);

  if (!trigger || !optionsWrap || !panel) return;

  const config = multiConfig[fieldKey];
  const options = settingsData[config.optionsKey];
  optionsWrap.innerHTML = "";

  options.forEach((value) => {
    const optionEl = document.createElement("button");
    optionEl.type = "button";
    optionEl.className = "multi-select__option";

    if (multiDraftState[fieldKey].includes(value)) {
      optionEl.classList.add("is-selected");
    }

    optionEl.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleDraftSelection(fieldKey, value);
      renderMultiSelect(fieldKey);
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

  multiEl.classList.add("is-open");
  panel.hidden = false;
  trigger.setAttribute("aria-expanded", "true");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollElementToWorkingCenter(trigger);
    });
  });
}

function handleMultiAdd(fieldKey) {
  const promptLabel = multiConfig[fieldKey].addPrompt;
  if (!promptLabel) return;

  const rawValue = window.prompt(promptLabel);
  if (!rawValue) return;

  const optionsKey = multiConfig[fieldKey].optionsKey;
  const storedValue = addUniqueOption(settingsData[optionsKey], rawValue);
  if (!storedValue) return;

  if (multiConfig[fieldKey].singleSelect) {
    multiDraftState[fieldKey] = [storedValue];
  } else if (!multiDraftState[fieldKey].includes(storedValue)) {
    multiDraftState[fieldKey].push(storedValue);
  }

  renderMultiSelect(fieldKey);
}

function saveMultiPanel(fieldKey) {
  multiState[fieldKey] = [...multiDraftState[fieldKey]];
  closeAllMultiPanels();
  renderAllMultiSelects();

  const parentSection = document
    .querySelector(`.multi-select[data-field="${fieldKey}"]`)
    ?.closest(".form-section");

  if (!parentSection) return;

  const sectionKey = parentSection.dataset.sectionKey;
  if (!sectionKey) return;

  updateSectionProgress(sectionKey);
}

function getSectionIndex(key) {
  return sectionOrder.indexOf(key);
}

function isSectionComplete(key) {
  if (key === "identity") {
    return (
      normalizeValue(fieldRefs.name?.value) !== "" &&
      fieldRefs.category?.value !== "" &&
      fieldRefs.itemType?.value !== "" &&
      multiState.colours.length > 0 &&
      multiState.details.length > 0
    );
  }

  if (key === "wearing") {
    return multiState.contexts.length > 0 && multiState.styles.length > 0;
  }

  if (key === "source") {
    return (
      fieldRefs.brand?.value !== "" &&
      fieldRefs.sourceType?.value !== "" &&
      fieldRefs.sourceLocation?.value !== ""
    );
  }

  if (key === "usage") {
    return (
      fieldRefs.wearFrequency?.value !== "" &&
      fieldRefs.estimatedValue?.value !== "" &&
      Number(fieldRefs.estimatedValue?.value) >= 0 &&
      fieldRefs.resaleWillingness?.value !== ""
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

function getSectionWorkingTarget(sectionEl) {
  if (!sectionEl) return null;

  const openMultiTrigger = sectionEl.querySelector(
    '.multi-select.is-open [data-multi-trigger]'
  );
  if (openMultiTrigger) return openMultiTrigger;

  const firstPriorityField = sectionEl.querySelector(
    'input:not([type="hidden"]), select, textarea, [data-multi-trigger]'
  );
  if (firstPriorityField) return firstPriorityField;

  const header = sectionEl.querySelector(".form-section__header");
  if (header) return header;

  return sectionEl;
}

function getCenteredScrollTopForElement(targetEl) {
  if (!targetEl) return window.scrollY;

  const rect = targetEl.getBoundingClientRect();
  const absoluteTop = window.scrollY + rect.top;
  const targetHeight = rect.height;
  const visualCenterBias = window.innerHeight * 0.12;

  const targetTop =
    absoluteTop - (window.innerHeight / 2) + (targetHeight / 2) + visualCenterBias;

  return Math.max(0, targetTop);
}

function scrollElementToWorkingCenter(targetEl) {
  if (!targetEl) return;

  window.scrollTo({
    top: getCenteredScrollTopForElement(targetEl),
    behavior: "smooth"
  });
}

function scrollSectionToWorkingCenter(sectionEl) {
  const targetEl = getSectionWorkingTarget(sectionEl);
  scrollElementToWorkingCenter(targetEl);
}

function scrollActiveSectionToWorkingCenter() {
  scrollSectionToWorkingCenter(formSections[activeSectionKey]);
}

function recenterActiveSectionAfterLayout() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scrollActiveSectionToWorkingCenter();
    });
  });
}

function setActiveSection(key, scroll = false) {
  activeSectionKey = key;
  renderSectionStates();

  if (scroll) {
    recenterActiveSectionAfterLayout();
  }
}

function completeSectionAndAdvance(sectionKey) {
  completedSections.add(sectionKey);

  const currentIndex = getSectionIndex(sectionKey);
  const nextKey = sectionOrder[currentIndex + 1];

  if (nextKey) {
    activeSectionKey = nextKey;
  }

  renderSectionStates();
  recenterActiveSectionAfterLayout();
}

function updateSectionProgress(sectionKey) {
  if (isSectionComplete(sectionKey)) {
    completeSectionAndAdvance(sectionKey);
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

  const offset = Math.max(0, sectionTop + (sectionHeight / 2) - (plusHeight / 2));
  addItemLayout.style.setProperty("--plus-offset", `${offset}px`);
}

function validateSection(key) {
  if (key === "identity") {
    if (normalizeValue(fieldRefs.name?.value) === "") return "Item name is required.";
    if (fieldRefs.category?.value === "") return "Category is required.";
    if (fieldRefs.itemType?.value === "") return "Item type is required.";
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
    if (fieldRefs.brand?.value === "") return "Brand is required.";
    if (fieldRefs.sourceType?.value === "") return "Source type is required.";
    if (fieldRefs.sourceLocation?.value === "") return "Source location is required.";
    return null;
  }

  if (key === "usage") {
    if (fieldRefs.wearFrequency?.value === "") return "Wear frequency is required.";
    if (
      fieldRefs.estimatedValue?.value === "" ||
      Number(fieldRefs.estimatedValue?.value) < 0
    ) {
      return "Estimated resale value must be a non-negative number.";
    }
    if (fieldRefs.resaleWillingness?.value === "") {
      return "Resale willingness is required.";
    }
    return null;
  }

  return null;
}

function getWardrobeItems() {
  return items.filter((item) => getItemLifecycleState(item) === "wardrobe");
}

function getWardrobeTotalValue(wardrobeItems) {
  return wardrobeItems.reduce((total, item) => {
    return total + (Number(item.estimatedValue) || 0);
  }, 0);
}

function getSelectedValues(selectEl) {
  if (!selectEl) return [];

  return Array.from(selectEl.selectedOptions)
    .map((option) => option.value)
    .filter(Boolean);
}

function populateFilterSelect(selectEl, options) {
  if (!selectEl) return;

  selectEl.innerHTML = "";
  options.forEach((value) => {
    const optionEl = document.createElement("option");
    optionEl.value = value;
    optionEl.textContent = value;
    selectEl.appendChild(optionEl);
  });
}

function initWardrobeQueryControls() {
  populateFilterSelect(wardrobeQueryRefs.filterCategory, settingsData.categories);
  populateFilterSelect(wardrobeQueryRefs.filterColours, settingsData.colours);
  populateFilterSelect(wardrobeQueryRefs.filterBrand, settingsData.brands);
  populateFilterSelect(wardrobeQueryRefs.filterWearFrequency, settingsData.wearFrequencies);
  populateFilterSelect(
    wardrobeQueryRefs.filterResaleWillingness,
    settingsData.resaleWillingnessOptions
  );
  populateFilterSelect(
    wardrobeQueryRefs.filterEmotionalRating,
    settingsData.emotionalRatings
  );
}

function toggleWardrobePanel(panelKey) {
  const isFilterPanel = panelKey === "filter";
  const targetPanel = isFilterPanel
    ? wardrobeQueryRefs.filterPanel
    : wardrobeQueryRefs.sortPanel;
  const otherPanel = isFilterPanel
    ? wardrobeQueryRefs.sortPanel
    : wardrobeQueryRefs.filterPanel;
  const targetTrigger = isFilterPanel
    ? wardrobeQueryRefs.filterTrigger
    : wardrobeQueryRefs.sortTrigger;
  const otherTrigger = isFilterPanel
    ? wardrobeQueryRefs.sortTrigger
    : wardrobeQueryRefs.filterTrigger;

  if (!targetPanel || !targetTrigger) return;

  const willOpen = targetPanel.hidden;

  targetPanel.hidden = !willOpen;
  targetTrigger.setAttribute("aria-expanded", String(willOpen));

  if (otherPanel && otherTrigger) {
    otherPanel.hidden = true;
    otherTrigger.setAttribute("aria-expanded", "false");
  }
}

function closeWardrobePanels() {
  if (wardrobeQueryRefs.filterPanel) wardrobeQueryRefs.filterPanel.hidden = true;
  if (wardrobeQueryRefs.sortPanel) wardrobeQueryRefs.sortPanel.hidden = true;
  if (wardrobeQueryRefs.filterTrigger) {
    wardrobeQueryRefs.filterTrigger.setAttribute("aria-expanded", "false");
  }
  if (wardrobeQueryRefs.sortTrigger) {
    wardrobeQueryRefs.sortTrigger.setAttribute("aria-expanded", "false");
  }
}

function syncWardrobeQueryStateFromInputs() {
  wardrobeQueryState.filters.category = getSelectedValues(wardrobeQueryRefs.filterCategory);
  wardrobeQueryState.filters.colours = getSelectedValues(wardrobeQueryRefs.filterColours);
  wardrobeQueryState.filters.brand = getSelectedValues(wardrobeQueryRefs.filterBrand);
  wardrobeQueryState.filters.wearFrequency = getSelectedValues(
    wardrobeQueryRefs.filterWearFrequency
  );
  wardrobeQueryState.filters.resaleWillingness = getSelectedValues(
    wardrobeQueryRefs.filterResaleWillingness
  );
  wardrobeQueryState.filters.emotionalRating = getSelectedValues(
    wardrobeQueryRefs.filterEmotionalRating
  );
  wardrobeQueryState.filters.estimatedValue.min =
    wardrobeQueryRefs.filterValueMin?.value || "";
  wardrobeQueryState.filters.estimatedValue.max =
    wardrobeQueryRefs.filterValueMax?.value || "";
  wardrobeQueryState.sort.option = wardrobeQueryRefs.sortOption?.value || "";
}

function clearWardrobeQueryState() {
  wardrobeQueryState.filters = {
    category: [],
    colours: [],
    brand: [],
    wearFrequency: [],
    resaleWillingness: [],
    emotionalRating: [],
    estimatedValue: {
      min: "",
      max: ""
    }
  };

  wardrobeQueryState.sort = {
    option: ""
  };

  [
    wardrobeQueryRefs.filterCategory,
    wardrobeQueryRefs.filterColours,
    wardrobeQueryRefs.filterBrand,
    wardrobeQueryRefs.filterWearFrequency,
    wardrobeQueryRefs.filterResaleWillingness,
    wardrobeQueryRefs.filterEmotionalRating
  ].forEach((selectEl) => {
    if (!selectEl) return;
    Array.from(selectEl.options).forEach((option) => {
      option.selected = false;
    });
  });

  if (wardrobeQueryRefs.filterValueMin) wardrobeQueryRefs.filterValueMin.value = "";
  if (wardrobeQueryRefs.filterValueMax) wardrobeQueryRefs.filterValueMax.value = "";
  if (wardrobeQueryRefs.sortOption) wardrobeQueryRefs.sortOption.value = "";
}

function matchesArrayFilter(itemValue, filterValues) {
  if (!filterValues.length) return true;

  if (Array.isArray(itemValue)) {
    return itemValue.some((value) => filterValues.includes(value));
  }

  return filterValues.includes(itemValue);
}

function matchesEstimatedValueFilter(item, estimatedValueFilter) {
  const value = Number(item.estimatedValue) || 0;
  const min = estimatedValueFilter.min === "" ? null : Number(estimatedValueFilter.min);
  const max = estimatedValueFilter.max === "" ? null : Number(estimatedValueFilter.max);

  if (min !== null && value < min) return false;
  if (max !== null && value > max) return false;
  return true;
}

function matchesWardrobeFilters(item, filters) {
  return (
    matchesArrayFilter(item.category, filters.category) &&
    matchesArrayFilter(item.colours, filters.colours) &&
    matchesArrayFilter(item.brand, filters.brand) &&
    matchesArrayFilter(item.wearFrequency, filters.wearFrequency) &&
    matchesArrayFilter(item.resaleWillingness, filters.resaleWillingness) &&
    matchesArrayFilter(item.emotionalRating, filters.emotionalRating) &&
    matchesEstimatedValueFilter(item, filters.estimatedValue)
  );
}

function filterWardrobeItems(wardrobeItems) {
  return wardrobeItems.filter((item) =>
    matchesWardrobeFilters(item, wardrobeQueryState.filters)
  );
}

function compareTextValues(valueA, valueB) {
  return String(valueA || "").localeCompare(String(valueB || ""), undefined, {
    sensitivity: "base"
  });
}

function sortWardrobeItems(filteredItems) {
  const sortOption = wardrobeQueryState.sort.option;
  if (!sortOption) return [...filteredItems];

  return [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case "value_desc":
        return (Number(b.estimatedValue) || 0) - (Number(a.estimatedValue) || 0);
      case "value_asc":
        return (Number(a.estimatedValue) || 0) - (Number(b.estimatedValue) || 0);
      case "date_desc":
        return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0);
      case "date_asc":
        return new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0);
      case "brand_asc":
        return compareTextValues(a.brand, b.brand);
      case "brand_desc":
        return compareTextValues(b.brand, a.brand);
      case "category_asc":
        return compareTextValues(a.category, b.category);
      case "category_desc":
        return compareTextValues(b.category, a.category);
      case "emotion_desc":
        return (
          (emotionalRatingOrder[b.emotionalRating] || 0) -
          (emotionalRatingOrder[a.emotionalRating] || 0)
        );
      case "emotion_asc":
        return (
          (emotionalRatingOrder[a.emotionalRating] || 0) -
          (emotionalRatingOrder[b.emotionalRating] || 0)
        );
      default:
        return 0;
    }
  });
}

function getVisibleWardrobeItems() {
  const wardrobeItems = getWardrobeItems();
  const filteredItems = filterWardrobeItems(wardrobeItems);
  return sortWardrobeItems(filteredItems);
}

function renderSingleToken(value) {
  if (!value) {
    return `<span class="wardrobe-token wardrobe-token--muted">—</span>`;
  }

  return `<span class="wardrobe-token">${escapeHtml(value)}.</span>`;
}

function renderTokenGroup(values) {
  if (!Array.isArray(values) || values.length === 0) {
    return `<span class="wardrobe-token wardrobe-token--muted">—</span>`;
  }

  return `
    <div class="wardrobe-token-group">
      <span class="wardrobe-token">${escapeHtml(values.join(". "))}.</span>
    </div>
  `;
}

function renderSourceToken(item) {
  if (!item.sourceLocation && !item.sourceType) {
    return `<span class="wardrobe-token wardrobe-token--muted">—</span>`;
  }

  return `
    <div class="wardrobe-token-group">
      ${item.sourceLocation ? `<span class="wardrobe-token">${escapeHtml(item.sourceLocation)}.</span>` : ""}
      ${item.sourceType ? `<span class="wardrobe-token">${escapeHtml(item.sourceType)}.</span>` : ""}
    </div>
  `;
}

function renderWardrobeMetrics(visibleItems) {
  if (wardrobeRefs.itemCount) {
    wardrobeRefs.itemCount.textContent = String(visibleItems.length);
  }

  if (wardrobeRefs.totalValue) {
    wardrobeRefs.totalValue.textContent = formatCurrency(
      getWardrobeTotalValue(visibleItems)
    );
  }
}

function createWardrobeRowMarkup(item) {
  const emotionalMarkup = renderSingleToken(item.emotionalRating);

  return `
    <tr data-item-id="${escapeHtml(item.id)}">
      <td class="wardrobe-table__item-cell">
        <div class="wardrobe-table__item-inner">
          <p class="wardrobe-table__item-name">${escapeHtml(item.name || "Untitled item")}</p>
          <div class="wardrobe-table__item-tags">
            ${renderSingleToken(item.category)}
            ${renderSingleToken(item.itemType)}
          </div>
        </div>
      </td>
      <td class="wardrobe-table__divider-cell">${renderTokenGroup(item.colours)}</td>
      <td>${renderTokenGroup(item.details)}</td>
      <td>${renderTokenGroup(item.contexts)}</td>
      <td>${renderTokenGroup(item.styles)}</td>
      <td>${renderSingleToken(item.brand)}</td>
      <td>${renderSourceToken(item)}</td>
      <td>${renderSingleToken(item.wearFrequency)}</td>
      <td>${renderSingleToken(item.resaleWillingness)}</td>
      <td>${emotionalMarkup}</td>
      <td class="wardrobe-table__value-cell">
        <button
          type="button"
          class="wardrobe-table__actions-button"
          aria-label="Open item menu"
        >
          <span class="wardrobe-dots" aria-hidden="true">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
        <p class="wardrobe-table__value">${formatCurrency(item.estimatedValue)}</p>
      </td>
    </tr>
  `;
}

function renderWardrobeTable(visibleItems) {
  if (!wardrobeRefs.tableBody) return;

  if (!visibleItems.length) {
    wardrobeRefs.tableBody.innerHTML = "";
    return;
  }

  wardrobeRefs.tableBody.innerHTML = visibleItems
    .map((item) => createWardrobeRowMarkup(item))
    .join("");
}

function getActiveQueryTokens() {
  const tokens = [];

  Object.entries(wardrobeQueryState.filters).forEach(([field, value]) => {
    if (field === "estimatedValue") {
      if (value.min !== "") {
        tokens.push({
          type: "filter",
          field,
          subfield: "min",
          label: `Value ≥ ${formatCurrency(value.min)}`
        });
      }

      if (value.max !== "") {
        tokens.push({
          type: "filter",
          field,
          subfield: "max",
          label: `Value ≤ ${formatCurrency(value.max)}`
        });
      }

      return;
    }

    value.forEach((entry) => {
      tokens.push({
        type: "filter",
        field,
        value: entry,
        label: `${entry}.`
      });
    });
  });

  if (wardrobeQueryState.sort.option) {
    const sortLabelMap = {
      value_desc: "Sort: Estimated resale value — High to low",
      value_asc: "Sort: Estimated resale value — Low to high",
      date_desc: "Sort: Date added — Newest first",
      date_asc: "Sort: Date added — Oldest first",
      brand_asc: "Sort: Brand — A to Z",
      brand_desc: "Sort: Brand — Z to A",
      category_asc: "Sort: Category — A to Z",
      category_desc: "Sort: Category — Z to A",
      emotion_desc: "Sort: Emotional rating — Highest to lowest",
      emotion_asc: "Sort: Emotional rating — Lowest to highest"
    };

    tokens.push({
      type: "sort",
      label: sortLabelMap[wardrobeQueryState.sort.option] || "Sort applied"
    });
  }

  return tokens;
}

function removeActiveQueryToken(token) {
  if (token.type === "sort") {
    wardrobeQueryState.sort = { option: "" };
    if (wardrobeQueryRefs.sortOption) wardrobeQueryRefs.sortOption.value = "";
    renderApp();
    return;
  }

  if (token.field === "estimatedValue") {
    wardrobeQueryState.filters.estimatedValue[token.subfield] = "";

    if (token.subfield === "min" && wardrobeQueryRefs.filterValueMin) {
      wardrobeQueryRefs.filterValueMin.value = "";
    }

    if (token.subfield === "max" && wardrobeQueryRefs.filterValueMax) {
      wardrobeQueryRefs.filterValueMax.value = "";
    }

    renderApp();
    return;
  }

  wardrobeQueryState.filters[token.field] =
    wardrobeQueryState.filters[token.field].filter((value) => value !== token.value);

  const selectMap = {
    category: wardrobeQueryRefs.filterCategory,
    colours: wardrobeQueryRefs.filterColours,
    brand: wardrobeQueryRefs.filterBrand,
    wearFrequency: wardrobeQueryRefs.filterWearFrequency,
    resaleWillingness: wardrobeQueryRefs.filterResaleWillingness,
    emotionalRating: wardrobeQueryRefs.filterEmotionalRating
  };

  const selectEl = selectMap[token.field];
  if (selectEl) {
    Array.from(selectEl.options).forEach((option) => {
      if (option.value === token.value) {
        option.selected = false;
      }
    });
  }

  renderApp();
}

function renderActiveQueryBar() {
  if (!wardrobeQueryRefs.activeBar || !wardrobeQueryRefs.activeTokens) return;

  const tokens = getActiveQueryTokens();
  const hasTokens = tokens.length > 0;

  wardrobeQueryRefs.activeBar.hidden = !hasTokens;
  wardrobeQueryRefs.activeTokens.innerHTML = hasTokens
    ? tokens
        .map(
          (token, index) => `
            <span class="wardrobe-active-query-token">
              ${escapeHtml(token.label)}
              <button
                type="button"
                data-active-token-index="${index}"
                aria-label="Remove ${escapeHtml(token.label)}"
              >
                ×
              </button>
            </span>
          `
        )
        .join("")
    : "";

  if (!hasTokens) return;

  wardrobeQueryRefs.activeTokens
    .querySelectorAll("[data-active-token-index]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const tokenIndex = Number(button.dataset.activeTokenIndex);
        const currentTokens = getActiveQueryTokens();
        const token = currentTokens[tokenIndex];
        if (token) {
          removeActiveQueryToken(token);
        }
      });
    });
}

function renderWardrobeStates(visibleItems) {
  const wardrobeItems = getWardrobeItems();
  const hasWardrobeItems = wardrobeItems.length > 0;
  const hasVisibleItems = visibleItems.length > 0;

  if (wardrobeRefs.emptyState) {
    wardrobeRefs.emptyState.hidden = hasWardrobeItems;
  }

  if (wardrobeQueryRefs.noResults) {
    wardrobeQueryRefs.noResults.hidden = !hasWardrobeItems || hasVisibleItems;
  }

  if (wardrobeRefs.tableWrap) {
    wardrobeRefs.tableWrap.hidden = !hasVisibleItems;
  }
}

function renderWardrobePage() {
  const visibleItems = getVisibleWardrobeItems();
  renderWardrobeMetrics(visibleItems);
  renderWardrobeStates(visibleItems);
  renderWardrobeTable(visibleItems);
  renderActiveQueryBar();
}

function wireWardrobeQueryControls() {
  if (wardrobeQueryRefs.filterTrigger) {
    wardrobeQueryRefs.filterTrigger.addEventListener("click", () => {
      toggleWardrobePanel("filter");
    });
  }

  if (wardrobeQueryRefs.sortTrigger) {
    wardrobeQueryRefs.sortTrigger.addEventListener("click", () => {
      toggleWardrobePanel("sort");
    });
  }

  [
    wardrobeQueryRefs.filterCategory,
    wardrobeQueryRefs.filterColours,
    wardrobeQueryRefs.filterBrand,
    wardrobeQueryRefs.filterWearFrequency,
    wardrobeQueryRefs.filterResaleWillingness,
    wardrobeQueryRefs.filterEmotionalRating,
    wardrobeQueryRefs.filterValueMin,
    wardrobeQueryRefs.filterValueMax,
    wardrobeQueryRefs.sortOption
  ].forEach((control) => {
    if (!control) return;

    control.addEventListener("change", () => {
      syncWardrobeQueryStateFromInputs();
      renderApp();
    });

    if (control.tagName === "INPUT") {
      control.addEventListener("input", () => {
        syncWardrobeQueryStateFromInputs();
        renderApp();
      });
    }
  });

  if (wardrobeQueryRefs.clearQuery) {
    wardrobeQueryRefs.clearQuery.addEventListener("click", () => {
      clearWardrobeQueryState();
      renderApp();
    });
  }

  if (wardrobeQueryRefs.clearQueryEmpty) {
    wardrobeQueryRefs.clearQueryEmpty.addEventListener("click", () => {
      clearWardrobeQueryState();
      renderApp();
    });
  }

  document.addEventListener("click", (event) => {
    const clickedInsideQueryArea =
      event.target.closest(".wardrobe-header__controls") ||
      event.target.closest(".wardrobe-query-panel");

    if (!clickedInsideQueryArea) {
      closeWardrobePanels();
    }
  });
}

function renderApp() {
  renderWardrobePage();
}

function buildItemFromForm() {
  const lifecycleState =
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
    emotionalRating: multiState.emotionalRating[0] || null,
    status: lifecycleState,
    lifecycleState,
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
  if (!addItemForm) return;

  addItemForm.reset();

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
  recenterActiveSectionAfterLayout();

  if (fieldRefs.name) {
    fieldRefs.name.focus();
  }
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
  renderApp();

  const destinationLabel =
    newItem.lifecycleState === "sales" ? "Sales" : "Wardrobe";

  resetAddItemForm();
  setFeedback(`"${newItem.name}" added to ${destinationLabel}.`);
}

function handleSelectAddNew(selectEl, settingsKey, placeholder, promptText) {
  if (!selectEl || selectEl.value !== "__add_new__") return;

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
  if (!fieldRefs.category) return;

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

    if (storedValue) {
      fieldRefs.category.value = storedValue;
    }
  }

  if (fieldRefs.itemType) {
    fieldRefs.itemType.value = "";
  }

  refreshItemTypeOptions();
  renderSectionStates();
}

function handleItemTypeChange() {
  clearFeedback();
  if (!fieldRefs.itemType) return;

  if (fieldRefs.itemType.value !== "__add_new__") {
    renderSectionStates();
    return;
  }

  const category = fieldRefs.category?.value;
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

  if (storedValue) {
    fieldRefs.itemType.value = storedValue;
  }

  renderSectionStates();
}

function handleBrandChange() {
  clearFeedback();

  handleSelectAddNew(
    fieldRefs.brand,
    "brands",
    "Select brand",
    "Add new brand"
  );

  updateSectionProgress("source");
}

function handleSourceTypeChange() {
  clearFeedback();

  const transferTypes = ["Hand-me-down", "Present"];
  if (
    fieldRefs.sourceType &&
    transferTypes.includes(fieldRefs.sourceType.value) &&
    fieldRefs.sourceLocation &&
    fieldRefs.sourceLocation.value === ""
  ) {
    fieldRefs.sourceLocation.value = "Unknown";
  }

  updateSectionProgress("source");
}

function handleSourceLocationChange() {
  clearFeedback();

  handleSelectAddNew(
    fieldRefs.sourceLocation,
    "sourceLocations",
    "Select source location",
    "Add new source location"
  );

  updateSectionProgress("source");
}

function handleUsageFieldChange() {
  clearFeedback();
  updateSectionProgress("usage");
}

function recenterSectionForField(element) {
  if (!element) return;
  scrollElementToWorkingCenter(element);
}

function wireSingleSelects() {
  const singleSelectFields = [
    fieldRefs.category,
    fieldRefs.itemType,
    fieldRefs.brand,
    fieldRefs.sourceType,
    fieldRefs.sourceLocation,
    fieldRefs.wearFrequency,
    fieldRefs.resaleWillingness
  ];

  singleSelectFields.forEach((selectEl) => {
    if (!selectEl) return;

    selectEl.addEventListener("focus", () => {
      recenterSectionForField(selectEl);
    });

    selectEl.addEventListener("click", () => {
      recenterSectionForField(selectEl);
    });
  });

  if (fieldRefs.category) {
    fieldRefs.category.addEventListener("change", handleCategoryChange);
  }

  if (fieldRefs.itemType) {
    fieldRefs.itemType.addEventListener("change", handleItemTypeChange);
  }

  if (fieldRefs.brand) {
    fieldRefs.brand.addEventListener("change", handleBrandChange);
  }

  if (fieldRefs.sourceType) {
    fieldRefs.sourceType.addEventListener("change", handleSourceTypeChange);
  }

  if (fieldRefs.sourceLocation) {
    fieldRefs.sourceLocation.addEventListener("change", handleSourceLocationChange);
  }

  if (fieldRefs.wearFrequency) {
    fieldRefs.wearFrequency.addEventListener("change", handleUsageFieldChange);
  }

  if (fieldRefs.estimatedValue) {
    fieldRefs.estimatedValue.addEventListener("focus", () => {
      recenterSectionForField(fieldRefs.estimatedValue);
    });

    fieldRefs.estimatedValue.addEventListener("click", () => {
      recenterSectionForField(fieldRefs.estimatedValue);
    });

    fieldRefs.estimatedValue.addEventListener("input", handleUsageFieldChange);
  }

  if (fieldRefs.resaleWillingness) {
    fieldRefs.resaleWillingness.addEventListener("change", handleUsageFieldChange);
  }

  if (fieldRefs.name) {
    fieldRefs.name.addEventListener("focus", () => {
      recenterSectionForField(fieldRefs.name);
    });

    fieldRefs.name.addEventListener("click", () => {
      recenterSectionForField(fieldRefs.name);
    });

    fieldRefs.name.addEventListener("input", renderSectionStates);
  }
}

function wireMultiSelects() {
  document.querySelectorAll("[data-multi-trigger]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const fieldKey = trigger.dataset.multiTrigger;
      const multiEl = trigger.closest(".multi-select");

      if (multiEl?.classList.contains("is-open")) {
        closeAllMultiPanels();
        renderAllMultiSelects();
        return;
      }

      openMultiPanel(fieldKey);
    });
  });

  document.querySelectorAll("[data-multi-add]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      handleMultiAdd(button.dataset.multiAdd);
    });
  });

  document.querySelectorAll("[data-multi-save]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      saveMultiPanel(button.dataset.multiSave);
    });
  });

  document.querySelectorAll("[data-multi-panel]").forEach((panel) => {
    panel.addEventListener("click", (event) => {
      event.stopPropagation();
    });
  });

  document.addEventListener("click", (event) => {
    const insideMulti = event.target.closest(".multi-select");
    if (!insideMulti) {
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
  recenterActiveSectionAfterLayout();

  wireSingleSelects();
  wireMultiSelects();

  addItemForm.addEventListener("submit", handleAddItemSubmit);
  window.addEventListener("resize", updatePlusPosition);
}

document.addEventListener("DOMContentLoaded", () => {
  wireNavigation();
  showSection("add-item");
  initAddItemForm();
  initWardrobeQueryControls();
  wireWardrobeQueryControls();
  renderApp();
});