# banqed — Edit Item Interaction Technical Specification (V1)

---

# 1\. Overview

The Edit Item system is a row-scoped inline editing engine operating on the unified Item object.

It is responsible for:

* transforming a static row into an editable state  
* handling field-level updates  
* persisting changes in real time  
* triggering cross-system updates (filters, metrics, lifecycle transitions)

---

# 2\. Core State Model

## 2.1 UI State

uiState \= {  
 activeEditRowId: string | null,  
 editingField: string | null,  
 dropdownOpen: string | null  
}  
---

## 2.2 Data State (Shared)

items: Item\[\]  
settings: SettingsStore  
---

## 2.3 Derived State

activeItem \= items.find(item \=\> item.id \=== activeEditRowId)  
---

# 3\. Edit Mode Lifecycle

---

## 3.1 Enter Edit Mode

function enterEditMode(itemId) {  
 uiState.activeEditRowId \= itemId  
}  
---

## 3.2 Exit Edit Mode

function exitEditMode() {  
 uiState.activeEditRowId \= null  
 uiState.editingField \= null  
 uiState.dropdownOpen \= null  
}  
---

## 3.3 Single Row Constraint

if (newRowActivated) {  
 exitEditMode(previousRow)  
 enterEditMode(newRow)  
}  
---

# 4\. Rendering Transformation

---

## 4.1 Row Mode Switch

isEditing \= item.id \=== uiState.activeEditRowId  
---

## 4.2 Conditional Rendering

| Field Type | View Mode | Edit Mode |
| ----- | ----- | ----- |
| Text | label | input |
| Single-select | token | dropdown |
| Multi-select | tokens | token \+ dropdown |
| Numeric | formatted value | input |
| Source | combined text | split inputs |

---

# 5\. Field Update System

---

## 5.1 Update Pipeline

function updateItemField(itemId, field, value) {  
 item \= getItem(itemId)

 item\[field\] \= value  
 item.dateUpdated \= now()

 validate(item)  
 applyDerivedLogic(item)

 persist(item)  
 triggerUIUpdates()  
}  
---

## 5.2 UI Update Trigger

function triggerUIUpdates() {  
 reapplyFilters()  
 recalculateMetrics()  
 rerenderRow()  
}  
---

# 6\. Field-Level Behaviour

---

## 6.1 Text Input (Item Name)

onChange(value) → updateItemField("name", value)  
onBlur → validateRequired("name")

Constraints:

* required  
* max length enforced

---

## 6.2 Single-Select Fields

onSelect(value) → updateItemField(field, value)

Fields:

* category  
* itemType  
* brand  
* wearFrequency  
* resaleWillingness  
* emotionalRating

---

## 6.3 Multi-Select Fields

function addValue(field, value) {  
 item\[field\] \= \[...item\[field\], value\]  
}

function removeValue(field, value) {  
 item\[field\] \= item\[field\].filter(v \=\> v \!== value)  
}  
---

## 6.4 Numeric Field

onChange(value) → numericParse(value)  
onBlur → formatCurrency(value)  
---

## 6.5 Source Field (Composite)

updateItemField("sourceType", value)  
updateItemField("sourceLocation", value)

Derived:

sourceChannel \= deriveChannel(sourceType)  
---

# 7\. Dependent Field Logic

---

## 7.1 Category → Item Type

if (categoryChanged) {  
 validTypes \= settings.itemTypes\[category\]

 if (\!validTypes.includes(item.itemType)) {  
   item.itemType \= null  
 }  
}  
---

# 8\. Dropdown System

---

## 8.1 Dropdown State

uiState.dropdownOpen \= fieldName  
---

## 8.2 Options Source

options \= settings\[field\]  
---

## 8.3 Add New Flow

function addNewOption(field, value) {  
 settings\[field\].push(value)  
 updateItemField(field, value)  
}  
---

## 8.4 Behaviour

* searchable  
* keyboard navigable  
* closes on selection

---

# 9\. Persistence Layer

---

## 9.1 Save Model

* Auto-save only  
* No draft state

---

## 9.2 Timing

| Field Type | Save Trigger |
| ----- | ----- |
| Dropdown | immediate |
| Multi-select | immediate |
| Text | on blur |
| Numeric | on blur |

---

## 9.3 Persistence Call

persist(item)

(MVP: local store or state update)

---

# 10\. Lifecycle Logic (CRITICAL)

---

## 10.1 Sales Routing

if (item.resaleWillingness \=== "Sell now") {  
 item.lifecycleState \= "sales"  
}  
---

## 10.2 UI Removal

Handled automatically via Wardrobe filter:

wardrobeItems \= items.filter(i \=\> i.lifecycleState \=== "wardrobe")  
---

## 10.3 Transition Behaviour

* item removed from current view  
* optional animation (fade out)

---

# 11\. Filter Interaction

---

## 11.1 Re-evaluation

if (\!matchesFilters(item)) {  
 removeFromVisibleItems(item)  
}  
---

## 11.2 Behaviour

* item may disappear mid-edit  
* no blocking required

---

# 12\. Validation System

---

## 12.1 Rules

rules \= {  
 name: required,  
 category: required,  
 itemType: required,  
 estimatedValue: numeric  
}  
---

## 12.2 Validation Execution

function validate(item) {  
 runRules(item)  
}  
---

## 12.3 Error Handling

* inline only  
* non-blocking  
* prevents invalid persistence

---

# 13\. Performance Strategy

---

## 13.1 Rendering

* only active row re-renders  
* avoid full table diff

---

## 13.2 Input Handling

debounce(textInput, 200ms)  
---

## 13.3 Scale Target

* performant up to 1,000+ items

---

# 14\. Accessibility Layer

---

## 14.1 Keyboard Navigation

* Tab between fields  
* Enter confirms selection  
* Escape closes dropdown

---

## 14.2 Focus Management

focus(activeField)  
---

# 15\. Concurrency Model (MVP)

---

lastWriteWins(item)  
---

# 16\. System Relationships

---

## 16.1 Shared Systems

Edit Item interacts with:

* Wardrobe page  
* Sales page  
* Settings system  
* Analytics layer

---

## 16.2 Data Flow

Edit → Item update → Global store →  
Wardrobe re-render  
Sales re-render  
Metrics update  
---

# 17\. Future Extensibility

---

* multi-row editing

