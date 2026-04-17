// =========================================
// banqed MVP - App Shell + Settings + Items
// Full Add Item workflow + Wardrobe render
// =========================================

/* =========================================
   Navigation
========================================= */

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
  const target = event.currentTarget?.dataset?.section;
  if (!target) return;
  showSection(target);
}

function wireNavigation() {
  document.querySelectorAll("[data-section]").forEach((control) => {
    control.addEventListener("click", handleNavClick);
  });
}

/* =========================================
   Shared Settings Data Layer
========================================= */

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

function loadSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem("settings"));
    return stored || structuredClone(defaultSettingsData);
  } catch {
    return structuredClone(defaultSettingsData);
  }
}

let settingsData = loadSettings();

function saveSettings() {
  localStorage.setItem("settings", JSON.stringify(settingsData));
}

/* =========================================
   Shared Item Store
========================================= */

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

/* =========================================
   Utilities
========================================= */

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
  values.sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
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

/* =========================================
   DOM refs
========================================= */

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

/* =========================================
   Feedback
========================================= */

function clearFeedback() {
  if (feedbackEl) feedbackEl.textContent = "";
}

function setFeedback(message) {
  if (feedbackEl) feedbackEl.textContent = message;
}

/* =========================================
   Single-select population
========================================= */

function populateSingleSelect(
  selectEl,
  options,
  placeholder,
  includeAddNew = false
) {
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

/* =========================================
   Multi-select rendering
========================================= */

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
  const panel = document.querySelector(`[data-multi-panel="${fieldKey}"]`);
  const optionsWrap = document.querySelector(
    `[data-multi-options="${fieldKey}"]`
  );

  if (!trigger || !panel || !optionsWrap) return;

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

    optionEl.addEventListener("click", () => {
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
  Object.keys(multiConfig).forEach((fieldKey) => {
    renderMultiSelect(fieldKey);
  });
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

/* =========================================
   Section state
========================================= */

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
    return (
      multiState.contexts.length > 0 &&
      multiState.styles.length > 0
    );
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
  const safeActiveKey = formSections[activeSectionKey]
    ? activeSectionKey
    : "identity";

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
    absoluteTop -
    (window.innerHeight / 2) +
    (targetHeight / 2) +
    visualCenterBias;

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
    renderSectionStates();
    recenterActiveSectionAfterLayout();
  } else {
    renderSectionStates();
    recenterActiveSectionAfterLayout();
  }
}

function updatePlusPosition() {
  if (!addItemLayout || !addItemPlus) return;

  const activeSection = formSections[activeSectionKey];
  if (!activeSection) return;

  const sectionTop = activeSection.offsetTop;
  const sectionHeight = activeSection.offsetHeight;
  const plusHeight = addItemPlus.offsetHeight;

  const offset = Math.max(
    0,
    sectionTop + (sectionHeight / 2) - (plusHeight / 2)
  );

  addItemLayout.style.setProperty("--plus-offset", `${offset}px`);
}

function validateSection(key) {
  if (key === "identity") {
    if (normalizeValue(fieldRefs.name?.value) === "") {
      return "Item name is required.";
    }
    if (fieldRefs.category?.value === "") {
      return "Category is required.";
    }
    if (fieldRefs.itemType?.value === "") {
      return "Item type is required.";
    }
    if (multiState.colours.length === 0) {
      return "Select at least one colour.";
    }
    if (multiState.details.length === 0) {
      return "Select at least one detail.";
    }
    return null;
  }

  if (key === "wearing") {
    if (multiState.contexts.length === 0) {
      return "Select at least one context.";
    }
    if (multiState.styles.length === 0) {
      return "Select at least one style.";
    }
    return null;
  }

  if (key === "source") {
    if (fieldRefs.brand?.value === "") {
      return "Brand is required.";
    }
    if (fieldRefs.sourceType?.value === "") {
      return "Source type is required.";
    }
    if (fieldRefs.sourceLocation?.value === "") {
      return "Source location is required.";
    }
    return null;
  }

  if (key === "usage") {
    if (fieldRefs.wearFrequency?.value === "") {
      return "Wear frequency is required.";
    }
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

// -----------------------------------------
// Wardrobe page rendering
// -----------------------------------------

function getWardrobeItems() {
  return items.filter((item) => getItemLifecycleState(item) === "wardrobe");
}

function getWardrobeTotalValue(wardrobeItems) {
  return wardrobeItems.reduce((total, item) => {
    return total + (Number(item.estimatedValue) || 0);
  }, 0);
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

function renderWardrobeMetrics(wardrobeItems) {
  if (wardrobeRefs.itemCount) {
    wardrobeRefs.itemCount.textContent = String(wardrobeItems.length);
  }

  if (wardrobeRefs.totalValue) {
    wardrobeRefs.totalValue.textContent = formatCurrency(
      getWardrobeTotalValue(wardrobeItems)
    );
  }
}

function createWardrobeRowMarkup(item) {
  const emotionalMarkup = Array.isArray(item.emotionalRating)
    ? renderTokenGroup(item.emotionalRating)
    : renderSingleToken(item.emotionalRating);

  return `
    <tr data-item-id="${escapeHtml(item.id)}">
      <td class="wardrobe-table__item-cell">
        <div class="wardrobe-table__item-inner">
          <p class="wardrobe-table__item-name">${escapeHtml(
            item.name || "Untitled item"
          )}</p>
          <div class="wardrobe-table__item-tags">
            ${renderSingleToken(item.category)}
            ${renderSingleToken(item.itemType)}
          </div>
        </div>
      </td>

      <td class="wardrobe-table__divider-cell">
        ${renderTokenGroup(item.colours)}
      </td>

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
  <span class="wardrobe-dots">
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

function renderWardrobeTable(wardrobeItems) {
  if (!wardrobeRefs.tableBody) return;

  if (!wardrobeItems.length) {
    wardrobeRefs.tableBody.innerHTML = "";
    return;
  }

  wardrobeRefs.tableBody.innerHTML = wardrobeItems
    .map((item) => createWardrobeRowMarkup(item))
    .join("");
}

function renderWardrobeEmptyState(wardrobeItems) {
  const hasItems = wardrobeItems.length > 0;

  if (wardrobeRefs.emptyState) {
    wardrobeRefs.emptyState.hidden = hasItems;
    wardrobeRefs.emptyState.setAttribute("aria-hidden", String(hasItems));
  }

  if (wardrobeRefs.tableWrap) {
    wardrobeRefs.tableWrap.hidden = !hasItems;
    wardrobeRefs.tableWrap.setAttribute("aria-hidden", String(!hasItems));
  }
}

function renderWardrobePage() {
  const wardrobeItems = getWardrobeItems();

  renderWardrobeMetrics(wardrobeItems);
  renderWardrobeEmptyState(wardrobeItems);
  renderWardrobeTable(wardrobeItems);
}

/* =========================================
   Submission
========================================= */

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
    emotionalRating: [...multiState.emotionalRating],
    status,
    lifecycleState: status,
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
  renderWardrobePage();

  const destinationLabel =
    newItem.status === "sales" ? "Sales" : "Wardrobe";

  const message = `"${newItem.name}" added to ${destinationLabel}.`;

  resetAddItemForm();
  setFeedback(message);
}

/* =========================================
   Single-select add-new handling
========================================= */

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

  if (isSectionComplete("source")) {
    completeSectionAndAdvance("source");
  } else {
    renderSectionStates();
  }
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

function handleUsageFieldChange() {
  clearFeedback();

  if (isSectionComplete("usage")) {
    completeSectionAndAdvance("usage");
  } else {
    renderSectionStates();
  }
}

/* =========================================
   Wiring
========================================= */

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

/* =========================================
   App Init
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  wireNavigation();
  showSection("add-item");
  initAddItemForm();
  renderWardrobePage();
});