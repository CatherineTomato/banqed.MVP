# banqed

# Add Item Page: Functional Spec

## Page name

Add Item

## Purpose

The Add Item page allows the user to add a clothing item into the banqed system through a guided, section-by-section flow. The page is designed to feel structured and calm rather than like a long admin form.

An item added here is saved into the main item dataset and is then routed to either:

* the Wardrobe page  
* or the Sales page

depending on the selected resale willingness.

---

## Design and interaction model

### Overall layout

* A persistent plus icon remains on the left-hand side of the page at all times.  
* The main form sits to the right of the plus icon.  
* The form is divided into sequential sections:  
  1. What is it?  
  2. How do you wear it?  
  3. Where is it from?  
  4. Usage \+ value

### Sequential reveal behaviour

* Only the current section is active and fully visible at a time.  
* Future sections are visible in position but faded  
* When the current section is completed, the interface automatically scrolls the user down to the next section and activates it.  
* Previously completed sections remain above and can be revisited simply by scrolling back up.  
* There is no “back” button required.

### Interaction goal

This page should feel like:

* a guided input flow  
* quick to move through  
* easy to revisit  
* not stressful or over-complicated

---

## Data source

Dropdown options are initially powered by a central settings data object in JavaScript.

For V1, this data can be hardcoded in JavaScript. Later, it can be edited through the Settings page.

---

## Form fields and logic by section

# Section 1 — What is it?

## Purpose

Identify the item itself.

## Fields

### 1\. Item name

* Type: text input  
* Required: yes  
* Single value only  
* Character limit: yes  
* Limit: 70 characters

### 2\. Category

* Type: single-select dropdown  
* Required: yes  
* Options come from settings data  
* User can only choose one category

### 3\. Item type

* Type: single-select dropdown  
* Required: yes  
* Options depend on selected category  
* User can only choose one item type

#### Dependency logic

* If category \= Jumpers, only jumper item types appear  
* If category \= Trousers, only trouser item types appear  
* If category changes, item type resets

### 4\. Colour

* Type: multi-select dropdown  
* Required: yes  
* Multiple colours can be selected  
* Options come from settings data

### 5\. Detail

* Type: multi-select dropdown  
* Required: no  
* Multiple details can be selected  
* Options come from settings data

## Completion rule for section

This section counts as complete when:

* item name is filled  
* category is selected  
* item type is selected  
* at least one colour is selected

Then Section 2 becomes active.

---

# Section 2 — How do you wear it?

## Purpose

Capture styling and usage context.

## Fields

### 6\. Context

* Type: multi-select dropdown  
* Required: no  
* Multiple options allowed  
* Examples: casual, work, lounging, holiday

### 7\. Style

* Type: multi-select dropdown  
* Required: no  
* Multiple options allowed  
* Examples: feminine, masculine, sporty, minimal, statement

## Completion rule for section

This section can count as complete when the user has interacted with it, even if fields are optional.  
 Then Section 3 becomes active.

---

# Section 3 — Where is it from?

## Purpose

Capture item origin and source.

## Fields

### 8\. Brand

* Type: searchable dropdown with add-new option  
* Required: no  
* Single-select only

#### Brand logic

* Brand should not be plain unrestricted free text in the main input field  
* Existing brands should appear in the dropdown  
* User can search the list  
* If the brand does not exist, the dropdown should include:  
  * \+ Add new brand  
* If selected, a small inline input appears  
* User types the new brand  
* On confirm, brand is added to the available brand options for future use

This avoids inconsistent entries like:

* Zara  
* zara  
* ZARA

### 9\. Source type

* Type: single-select dropdown  
* Required: no  
* Examples:  
  * hand-me-down  
  * present  
  * charity shop  
  * vintage shop  
  * in-store  
  * online  
  * market

### 10\. Source location

* Type: conditional dropdown or text input  
* Required: conditional

#### Source location logic

This field appears only when relevant.

Examples:

* If source type \= charity shop, vintage shop, market, in-store:  
  * show location field  
* If source type \= hand-me-down or present:  
  * location field can remain hidden or optional

If shown:

* user can type a town/city/location  
* or choose from previously saved locations

## Completion rule for section

This section counts as complete once the user has selected source type or intentionally skipped.  
 Then Section 4 becomes active.

---

# Section 4 — Usage \+ value

## Purpose

Capture frequency, value, and intended resale logic.

## Fields

### 11\. Wear frequency

* Type: single-select dropdown  
* Required: yes  
* Single value only  
* No multi-select  
* Examples:  
  * never worn  
  * weekly  
  * monthly  
  * every few months  
  * once a year  
  * rarely  
  * used to wear often

### 12\. Estimated resale value

* Type: number input  
* Required: yes  
* Numeric only  
* Currency display: euro

#### Value logic

This is a unified field:

* for wardrobe items, it contributes to overall wardrobe value  
* for sell items, it acts as the intended sale/listing value

### 13\. Resale willingness

* Type: single-select dropdown  
* Required: yes  
* Single value only  
* No multi-select

Examples:

* Keep  
* Keep for now  
* Maybe sell  
* Sell if price is right  
* Sell now

#### Routing logic

This field determines where the item goes after submission:

* If resale willingness \= Sell now, item routes to Sales  
* Otherwise, item routes to Wardrobe

## Completion rule for section

This section counts as complete when:

* wear frequency is selected  
* estimated resale value is entered  
* resale willingness is selected

Then Section 5 becomes active.

---

# Section 5 — How do you feel about it?

## Purpose

Capture emotional relationship to the item.

## Fields

### 14\. Emotional rating

* Type: multi-select dropdown or single-select dropdown  
* Recommended for V1: single-select  
* Required: no

Examples:

* Love  
* Really like  
* It’s ok  
* Indifferent  
* Not keen  
* Potential  
* High potential

## Recommendation

For V1, use single-select to simplify logic and data consistency.

---

# Section 6 — Notes

## Purpose

Allow optional free-text notes.

## Fields

### 15\. Notes

* Type: text input or textarea  
* Required: no  
* Free text

## Recommendation

Keep this field. It is low-cost to implement and useful.

---

## Dropdown behaviour

### Searchable dropdowns

Where useful, dropdowns should support search within the dropdown field so users can quickly find an option.

This is especially useful for:

* brand  
* source  
* category if list grows  
* item type if list grows

### Add-new behaviour

For editable dropdown types, the dropdown should end with:

* \+ Add new

If selected:

* inline text field appears  
* user types new option  
* confirms  
* new option is added to that dropdown’s option list  
* it becomes available from then on  
* later, this should also be editable in Settings

### Recommended editable dropdowns for V1

Allow add-new on:

* category  
* item type  
* colour  
* detail  
* context  
* style  
* brand  
* source location

Do not allow add-new for V1 on:

* wear frequency  
* resale willingness  
* emotional rating

---

## Submit button

### Button label

Add item

### On click

1. Validate required fields  
2. Create new item object  
3. Save item to master dataset  
4. Route item based on resale willingness:  
   * Sell now → Sales  
   * all other values → Wardrobe  
5. Save updated dataset to localStorage  
6. Reset form  
7. Return to top of form or keep focus for next entry  
8. Show feedback message such as:  
   * “Item added to wardrobe”  
   * or “Item added to sales”

---

## Validation rules

## Required fields

* Item name  
* Category  
* Item type  
* At least one colour  
* Wear frequency  
* Estimated resale value  
* Resale willingness

## Optional fields

* Detail  
* Context  
* Style  
* Brand  
* Source type  
* Source location  
* Emotional rating  
* Notes

## Validation behaviour

* inline validation  
* no harsh error styling  
* soft error messages under field if needed

---

## Data model for saved item

Each item should be stored as one object.

Example:

{  
 id: "item-001",  
 name: "Brown skirt with polka dots",  
 category: "Skirts",  
 itemType: "Midi skirt",  
 colours: \["Brown", "White"\],  
 detail: \["Polka dot"\],  
 context: \["Holiday", "Casual"\],  
 style: \["Feminine"\],  
 brand: "Mango",  
 sourceType: "Present",  
 sourceLocation: "Dublin",  
 wearFrequency: "Never",  
 estimatedValue: 15,  
 resaleWillingness: "Sell now",  
 emotionalRating: "Indifferent",  
 notes: "",  
 status: "sales",  
 dateAdded: "2026-04-13T10:00:00"  
}  
---

## Status logic

### For V1

Use simple statuses:

* wardrobe  
* sales

### Routing rule

* If resale willingness \= Sell now → status \= sales  
* Else → status \= wardrobe

Later, this can be expanded to:

* ready\_to\_sell  
* listed  
* sold  
* donated

---

## Connections to other pages

### Wardrobe page

Receives all items with status \= wardrobe

### Sales page

Receives all items with status \= sales

### Progress page

Uses the category and item count data to track banq lodgements and category flow

### Wardrobe analytics page

Uses all saved item data for:

* counts  
* values  
* colour breakdown  
* wear frequency breakdown  
* style/context/source breakdown  
* emotional rating breakdown

### Settings page

Eventually manages editable dropdown datasets used by this page

---

## Build priority notes

### Must work in V1

* sequential reveal  
* dependent item type dropdown  
* multi-select colour/detail/context/style  
* searchable dropdowns where possible  
* add-new option for editable dropdowns  
* form submission  
* routing to wardrobe or sales  
* localStorage persistence

### Nice to have later

* full settings management UI  
* saved custom options synced visually into settings page  
* animations between sections  
* fuzzy search inside all dropdowns

---

## UX summary

This page should feel:

* calm  
* guided  
* structured  
* premium  
* editorial  
* efficient for repeat use

It should not feel like:

* a spreadsheet  
* a long questionnaire  
* a rigid wizard


