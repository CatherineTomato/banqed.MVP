# banqed — Wardrobe Page Functional Specification (V2)

---

# 1\. Overview

The Wardrobe page is the primary data interface of banqed.

It functions as:

* a structured inventory system  
* a decision-making interface  
* an analytical exploration layer

The design follows a database-style interaction model, inspired by tools such as Notion and Airtable, optimised for:

* high-density structured data  
* real-time filtering and sorting  
* scalable interaction across large datasets

---

# 2\. Core Objectives

The Wardrobe page must enable users to:

* View their full wardrobe inventory  
* Understand wardrobe size and estimated value  
* Dynamically filter and segment items  
* Sort items for decision-making  
* Edit and manage items efficiently  
* Identify behavioural and usage patterns

---

# 3\. System Role

The Wardrobe page is a view layer over the unified Item dataset.

* It does not store data independently  
* All operations act directly on the underlying data model

---

# 4\. Page Layout

## 4.1 Structure

The page consists of four vertical sections:

1. Header  
2. Control Bar  
3. Active Filters Bar  
4. Data Table

---

## 4.2 Header

### Title

Wardrobe

### Summary Metrics

Displayed beneath title:

* Total item count  
* Total estimated resale value

Example:

5,030 items     €50,900 estimated resale value

### Behaviour

* Metrics reflect the current filtered dataset  
* Updates occur in real time

---

## 4.3 Control Bar

Positioned top-right.

### Components

1. Filter Trigger  
    Opens filter panel  
2. Sort Trigger  
    Opens sort panel  
3. Add Item (+)  
    Navigates to Add Item page

---

## 4.4 Active Filters Bar

### Purpose

Displays currently applied filters.

### Placement

Below Control Bar, above Data Table

---

### Token System

Filters appear as inline tokens:

Tops. Black. Party. Chic.  
---

### Interaction

* Clicking a token removes that filter  
* Dataset updates immediately

Clear All

* Removes all filters

---

### Logical Behaviour

* Tokens within same field → OR  
* Tokens across fields → AND

Example:

Style: Party OR Chic  
Colour: Black  
→ (Party OR Chic) AND Black  
---

### State Synchronisation

Filter state must remain consistent across:

* filter panel  
* active tokens  
* table results  
* summary metrics

---

# 5\. Data Table

## 5.1 Structure

* Tabular layout  
* Each row \= one Item  
* Each column \= one attribute

---

## 5.2 Columns

### 1\. Item

* Item name (primary)  
* Category \+ Item Type (secondary tags)

---

### 2\. Colour

Multi-select (tokenised)

### 3\. Detail

Multi-select

### 4\. Context

Multi-select

### 5\. Style

Multi-select

---

### 6\. Brand

Single-select

---

### 7\. Source

Combined display:

\[sourceLocation\]. \[sourceType\].

Examples:

* Dublin. Charity shop.  
* Online.  
* Present.

---

### 8\. Wear Frequency

Single-select

### 9\. Resale Willingness

Single-select

### 10\. Emotional Rating

Single-select

---

### 11\. Estimated Resale Value

* Numeric  
* Right-aligned  
* Bold

---

### 12\. Actions

Ellipsis menu:

* Edit  
* Delete

---

## 5.3 Token Rendering System

### Format

Each value displayed as:

Value.  
---

### Rules

* All tokens end with a full stop  
* Tokens wrap within column width  
* No commas

---

### Rationale

* improves scanability  
* reduces clutter  
* ensures visual consistency

---

# 6\. Filtering System

## 6.1 Model

Composable query system:

* multi-field  
* multi-condition  
* persistent

---

## 6.2 Filterable Fields

* Category  
* Item Type  
* Colour  
* Detail  
* Context  
* Style  
* Brand  
* Source Type  
* Source Channel  
* Source Location  
* Wear Frequency  
* Resale Willingness  
* Emotional Rating  
* Estimated Value

---

## 6.3 Operators

Multi-select fields

* contains  
* does not contain

Single-select fields

* is  
* is not

Numeric fields

* greater than  
* less than  
* between

---

## 6.4 Logical Behaviour

* Default: AND across fields  
* OR within field

---

## 6.5 UI Behaviour

* Filters applied instantly  
* Reflected in tokens  
* Persist until removed

---

# 7\. Sorting System

## 7.1 Capabilities

Sortable by:

* Estimated value  
* Date added  
* Category  
* Brand  
* Wear frequency  
* Emotional rating

---

## 7.2 Multi-Level Sorting

Supports stacked sorting:

* primary  
* secondary

---

## 7.3 UI Behaviour

* Sorts displayed as tokens  
* Users can remove or reorder

---

# 8\. Row Interaction Model

## 8.1 Row Selection

* Clicking a row activates edit mode

## 8.2 Edit Behaviour (High-Level)

* Row becomes editable inline  
* Only one row editable at a time  
* Changes apply in real time

👉 Full behaviour defined in:  
 Edit Item Interaction Specification

---

## 8.3 Lifecycle Interaction

If resale willingness is set to:

Sell now

→ item is immediately moved to Sales  
 → item is removed from Wardrobe

---

# 9\. Data Behaviour

## 9.1 Real-Time Aggregation

* Item count updates dynamically  
* Total value recalculates instantly

---

## 9.2 Derived Fields

### Source Channel

Derived from Source Type

* Not user editable  
* Used in filtering and analytics

---

## 9.3 Missing Data Handling

* Empty fields display as blank  
* No placeholder text  
* No tokens rendered  
* Do not affect filtering unless specified

---

# 10\. System Relationships

## 10.1 Dataset Definition

Wardrobe displays:

lifecycleState \= "wardrobe"  
---

## 10.2 Cross-System Behaviour

* Shares data model with:  
  * Sales page  
  * Analytics pages

---

## 10.3 State Transitions

Wardrobe → Sales  
when resaleWillingness \= "Sell now"  
---

# 11\. Performance Requirements

* Supports 1,000+ items  
* Uses list virtualization  
* Filters run client-side (MVP)  
* Debounced operations

---

# 12\. Empty States

### No Items

No items in your wardrobe yet  
\[Add item\]  
---

### No Results

No items match current filters  
\[Clear all\]  
---

# 13\. Optional Fields

### Purchase Price (Optional)

Purpose:

* profit calculation  
* resale analytics

Not emphasised in UI

---

# 14\. UX Quality Standards

Must achieve:

* zero-latency feel  
* predictable filtering  
* clean hierarchy  
* consistent token system  
* low cognitive load

---

# 15\. Accessibility

* keyboard navigable  
* accessible filters  
* readable contrast  
* screen-reader support

---

# 16\. Future Enhancements

* image thumbnails  
* column visibility toggle  
* saved views  
* bulk actions  
* inline editing improvements  
* drag-and-drop sorting  
* advanced filters

