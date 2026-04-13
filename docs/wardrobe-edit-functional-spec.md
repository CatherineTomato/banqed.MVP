# Wardrobe \- Edit Item Interaction Functional Specification (V1)

## 1\. Overview

The Edit Item interaction enables users to modify existing wardrobe entries directly within the table interface using an inline editing model.

This interaction is designed to:

* minimise friction  
* preserve context  
* support rapid iteration  
* align with modern data tools (e.g. Notion, Airtable, Linear)

---

## 2\. Interaction Model

### 2.1 Entry Points

Edit mode is triggered via:

* Clicking a row  
* OR selecting “Edit” from the row actions menu

---

### 2.2 Editing Paradigm

The system uses inline row editing, not modal or page navigation.

The row transforms into an editable state in-place.

---

## 3\. Edit Mode State

### 3.1 Activation Behaviour

Upon entering edit mode:

* The selected row:  
  * expands vertically  
  * becomes visually prominent  
* The table remains visible (no full displacement)  
* Scroll position is preserved

---

### 3.2 Focus Management

* Only one row may be in edit mode at any time  
* Activating a new row:  
  * automatically exits the previous one

---

### 3.3 Visual Treatment

Active row:

* subtle background highlight  
* increased vertical spacing  
* maintains editorial, minimal aesthetic

---

## 4\. Field Transformation

When entering edit mode, each field transitions as follows:

---

## 4.1 Text Fields

### Item Name

* Converts to inline text input  
* Pre-filled with existing value

#### Constraints:

* character limit enforced  
* empty values not permitted

---

## 4.2 Single-Select Fields

Fields:

* Category  
* Item Type  
* Brand  
* Wear Frequency  
* Resale Willingness  
* Emotional Rating

### Behaviour:

* Converts to dropdown selector  
* Displays current value  
* Opens on click

---

## 4.3 Multi-Select Fields

Fields:

* Colour  
* Detail  
* Context  
* Style

### Behaviour:

* Token-based interface  
* Users can:  
  * add values  
  * remove values (click token)  
* Dropdown supports:  
  * search  
  * “+ Add new” option

---

## 4.4 Dependent Fields

### Item Type (dependent on Category)

* Updates dynamically when Category changes  
* Invalid selections are cleared automatically

---

## 4.5 Numeric Fields

### Estimated Resale Value

* Converts to numeric input  
* Inline editable

#### Constraints:

* numeric only  
* currency formatted on blur

---

## 4.6 Source Field (Composite Interaction)

Source is composed of:

* Source Type (required)  
* Source Location (optional)

---

### Behaviour

1. User selects Source Type  
2. Location field becomes available  
3. User may:  
   * select existing location  
   * input new location

---

### Persistence Rules

* Location is optional  
* Stored independently of Source Type

---

## 5\. Dropdown System Behaviour

All dropdowns must:

* open downward  
* support keyboard navigation  
* support search (type-to-filter)  
* include “+ Add new” at bottom

---

### Add New Option Flow

When selected:

1. User inputs new value  
2. Value is:  
   * saved to settings datastore  
   * immediately available globally  
3. Value is auto-selected

---

## 6\. Data Persistence Model

### 6.1 Save Behaviour

* All edits are auto-saved in real-time  
* No explicit “Save” button

---

### 6.2 Update Timing

Changes apply:

* immediately on selection/input  
* on blur (for text/numeric inputs)

---

### 6.3 State Synchronisation

On update:

* table row updates instantly  
* summary metrics recalculate  
* filters re-evaluate

---

## 7\. Conditional Logic: Sales Routing

## 7.1 Trigger Condition

If:

Resale Willingness \= Sell now  
---

## 7.2 System Behaviour

* Item is:  
  * removed from Wardrobe dataset  
  * inserted into Sales dataset

---

## 7.3 UX Behaviour

* Row fades out smoothly  
* Table updates immediately

Optional feedback:

Item moved to Sales  
---

## 8\. Exit Behaviour

## 8.1 Exit Triggers

Edit mode exits when:

* user clicks outside the row  
* user presses Enter (optional enhancement)  
* user activates another row

---

## 8.2 Save Confirmation

* No confirmation required  
* All changes already persisted

---

## 9\. Error Handling & Validation

### 9.1 Validation Rules

| Field | Rule |
| ----- | ----- |
| Item Name | Required |
| Category | Required |
| Item Type | Required |
| Value | Must be numeric |

---

### 9.2 Invalid Input Handling

* Prevent invalid submission  
* Provide subtle inline feedback (no disruptive alerts)

---

## 10\. Performance Requirements

* Only affected row re-renders  
* Avoid full table refresh  
* Debounce rapid input where needed  
* Maintain responsiveness at 1,000+ items

---

## 11\. Accessibility

* Full keyboard navigation  
* Focus states clearly visible  
* Dropdowns accessible via keyboard  
* Screen reader compatible labels

---

## 12\. UX Quality Standards

The interaction must feel:

* instantaneous  
* predictable  
* reversible  
* low-friction

---

### Key Principles

* No unnecessary clicks  
* No context switching  
* No blocking states  
* No visual clutter

---

## 13\. Edge Cases

### 13.1 Category Change

* Clears incompatible Item Type  
* Prompts reselection

---

### 13.2 Filter Conflict

If edit causes item to no longer match filters:

* item disappears from current view

---

### 13.3 Concurrent Edits (Future)

* last-write-wins model (MVP)

---

## 14\. Future Enhancements

* inline editing of multiple rows  
* undo/redo system  
* version history per item  
* bulk edit actions

---

# Final Product Positioning

This interaction transforms the Wardrobe page from:

a static list

into:

a dynamic, editable system of record

---

## Strategic Impact

This design:

* reduces friction to near-zero  
* encourages continuous data refinement  
* supports analytical workflows  
* aligns with best-in-class SaaS tools

