---

# banqed — Add Item Page Technical Specification (V1)

---

# 1\. Overview

The Add Item page is a multi-section, state-driven form engine for creating new Item objects.

It is responsible for:

* managing section progression  
* handling structured inputs  
* integrating with Settings data  
* validating required fields  
* constructing Item objects  
* routing items to the correct lifecycle state

---

# 2\. Core State Model

---

## 2.1 Form State

formState \= {  
 name: "",

 category: null,  
 itemType: null,

 colours: \[\],  
 details: \[\],

 contexts: \[\],  
 styles: \[\],

 brand: null,

 sourceType: null,  
 sourceLocation: null,

 wearFrequency: null,  
 estimatedValue: null,  
 resaleWillingness: null,

 emotionalRating: null  
}  
---

## 2.2 UI State

uiState \= {  
 activeSection: 1,  
 completedSections: \[\],

 dropdownOpen: null,  
 searchQuery: "",

 isSubmitting: false  
}  
---

## 2.3 Settings State (Read-only)

settings \= {  
 categories: \[\],  
 itemTypes: { \[category\]: string\[\] },

 colours: \[\],  
 details: \[\],  
 contexts: \[\],  
 styles: \[\],

 brands: \[\],  
 sourceTypes: \[\],  
 sourceLocations: \[\],

 wearFrequencies: \[\],  
 resaleWillingnessOptions: \[\],  
 emotionalRatings: \[\]  
}  
---

# 3\. Section Progression Engine

---

## 3.1 Section Definition

sections \= \[  
 "identity",  
 "wearing",  
 "source",  
 "usage",  
 "emotion"  
\]  
---

## 3.2 Completion Logic

function isSectionComplete(section, formState) {  
 switch(section) {

   case "identity":  
     return (  
       formState.name &&  
       formState.category &&  
       formState.itemType &&  
       formState.colours.length \> 0  
     )

   case "wearing":  
     return true

   case "source":  
     return true

   case "usage":  
     return (  
       formState.wearFrequency &&  
       formState.estimatedValue \!== null &&  
       formState.resaleWillingness  
     )

   case "emotion":  
     return true  
 }  
}  
---

## 3.3 Progression Trigger

if (isSectionComplete(currentSection)) {  
 markComplete(currentSection)  
 moveToNextSection()  
}  
---

## 3.4 Scroll Behaviour

function moveToNextSection() {  
 uiState.activeSection \+= 1  
 scrollToSection(uiState.activeSection)  
}  
---

# 4\. Field Update System

---

## 4.1 Update Handler

function updateField(field, value) {  
 formState\[field\] \= value

 runDependencies(field, value)  
 evaluateSectionCompletion()  
}  
---

## 4.2 Dependency Logic

### Category → Item Type

if (field \=== "category") {  
 formState.itemType \= null  
}  
---

## 4.3 Source Channel Derivation

function deriveSourceChannel(sourceType) {  
 if (\["charity shop", "vintage shop", "market", "in-store"\].includes(sourceType)) {  
   return "In-person"  
 }

 if (sourceType \=== "online") return "Online"

 if (\["hand-me-down", "present"\].includes(sourceType)) {  
   return "Transfer"  
 }

 return null  
}  
---

# 5\. Dropdown System

---

## 5.1 Dropdown State

uiState.dropdownOpen \= fieldName  
---

## 5.2 Options Retrieval

function getOptions(field) {  
 return settings\[field\]  
}  
---

## 5.3 Search Filtering

function filterOptions(options, query) {  
 return options.filter(opt \=\>  
   opt.toLowerCase().includes(query.toLowerCase())  
 )  
}  
---

## 5.4 Add-New Option

function addNewOption(field, value) {  
 settings\[field\].push(value)  
 formState\[field\] \= value  
}  
---

## 5.5 Multi-Select Handling

function addMulti(field, value) {  
 formState\[field\] \= \[...formState\[field\], value\]  
}

function removeMulti(field, value) {  
 formState\[field\] \= formState\[field\].filter(v \=\> v \!== value)  
}  
---

# 6\. Validation Engine

---

## 6.1 Required Fields

requiredFields \= \[  
 "name",  
 "category",  
 "itemType",  
 "colours",  
 "wearFrequency",  
 "estimatedValue",  
 "resaleWillingness"  
\]  
---

## 6.2 Validation Function

function validate(formState) {  
 return (  
   formState.name &&  
   formState.category &&  
   formState.itemType &&  
   formState.colours.length \> 0 &&  
   formState.wearFrequency &&  
   formState.estimatedValue \!== null &&  
   formState.resaleWillingness  
 )  
}  
---

## 6.3 Error Handling

* inline errors only  
* no blocking UI

---

# 7\. Item Creation

---

## 7.1 Object Builder

function buildItem(formState) {  
 return {  
   id: generateId(),

   name: formState.name,  
   category: formState.category,  
   itemType: formState.itemType,

   colours: formState.colours,  
   details: formState.details,  
   contexts: formState.contexts,  
   styles: formState.styles,

   brand: formState.brand,

   sourceType: formState.sourceType,  
   sourceChannel: deriveSourceChannel(formState.sourceType),  
   sourceLocation: formState.sourceLocation || null,

   wearFrequency: formState.wearFrequency,  
   estimatedValue: Number(formState.estimatedValue),  
   resaleWillingness: formState.resaleWillingness,

   emotionalRating: formState.emotionalRating || null,

   lifecycleState:  
     formState.resaleWillingness \=== "Sell now"  
       ? "sales"  
       : "wardrobe",

   dateAdded: now(),  
   dateUpdated: now()  
 }  
}  
---

# 8\. Submission Flow

---

## 8.1 Submit Handler

function submit() {  
 if (\!validate(formState)) return

 uiState.isSubmitting \= true

 const item \= buildItem(formState)

 saveItem(item)  
 persistToLocalStorage()

 resetForm()

 uiState.isSubmitting \= false

 showFeedback(item.lifecycleState)  
}  
---

## 8.2 Routing Logic

if (item.lifecycleState \=== "sales") {  
 → appears in Sales page  
} else {  
 → appears in Wardrobe page  
}  
---

# 9\. Persistence Layer

---

## 9.1 Save Function

function saveItem(item) {  
 items.push(item)  
}  
---

## 9.2 Local Storage

localStorage.setItem("items", JSON.stringify(items))  
---

# 10\. Reset Behaviour

---

## 10.1 Reset Form

function resetForm() {  
 formState \= initialState  
 uiState.activeSection \= 1  
}  
---

# 11\. Performance Strategy

---

* minimal re-renders  
* lightweight state updates  
* debounce dropdown search

---

# 12\. Accessibility

---

* keyboard navigation  
* focus management  
* accessible dropdowns

---

# 13\. System Relationships

---

## 13.1 Data Flow

Add Item → create Item →  
Global Store →  
Wardrobe \+ Sales \+ Analytics update  
---

## 13.2 Shared Systems

* Settings  
* Wardrobe  
* Sales  
* Wardrobe Analytics  
* Sales Analytics

