## banqed \- Sales page functional specification

## 1\. Overview

The Sales page is the transactional lifecycle system of banqed.

It enables users to:

* manage items they intend to sell  
* track listing progress across platforms  
* monitor financial outcomes  
* complete the resale lifecycle

---

## 2\. Core Objectives

The Sales page must enable users to:

1. Track items from “intent to sell” → “money received”  
2. Manage preparation and listing workflow  
3. Record financial outcomes (listing vs sold price)  
4. Understand resale performance (time \+ value)  
5. Filter and analyse items at different lifecycle stages

---

## 3\. Page Structure

### 3.1 Layout Sections

1. Header  
2. Control Bar (Filter / Sort / Add)  
3. Summary Metrics  
4. Active Filters Bar  
5. Sales Table (Active Items)  
6. Completed Section Divider  
7. Completed Sales Table

---

## 4\. Header

Sales

* Positioned top-left under navigation  
* Matches typography of Wardrobe page

---

## 5\. Control Bar

### Components

* Filter button  
* Sort button  
* \+ Add Item button

---

### 5.1 Behaviour

* Filter \+ Sort behave identically to Wardrobe page  
* Add Item navigates to Add Item page

---

## 6\. Summary Metrics

Position: left side under header

---

### 6.1 Default (No Filters Applied)

Display:

* Revenue to date  
* Total value of listed items  
* Total value of items rarely worn

---

### 6.2 Behaviour Under Filtering

When filters are applied:

* Only Total value of listed items is displayed  
* Other metrics are hidden

---

### 6.3 Definitions

#### Revenue to date

* Total of all completed sales (money received)

#### Total value of listed items

* Sum of listing prices of active items

#### Total value of items rarely worn

* Sum of estimated resale value of items flagged as rarely worn

---

### 6.4 Behaviour

* Metrics update in real time  
* Reflect current filtered dataset

---

## 7\. Active Filters Bar

* identical system to Wardrobe page  
* displays applied filters as tokens  
* click token → removes filter  
* includes “Clear all”

---

## 8\. Sales Table

## 8.1 Row Definition

Each row represents:

one item in the resale lifecycle

---

## 8.2 Column Structure

1. Name  
2. Colour  
3. Detail  
4. Date Listed  
5. Date Sold  
6. Days to Sell  
7. Listing Price  
8. Sold For  
9. Status

---

## 9\. Column Behaviour

---

### 9.1 Name Column

Displays:

* Item name (primary)  
* Category \+ Item Type (tokens)

---

### 9.2 Colour & Detail

* Token-based display  
* Multi-select values

---

## 10\. Sales Lifecycle Fields

---

### 10.1 Date Listed

* Empty by default  
* User inputs when item is listed externally

---

### 10.2 Date Sold

* Empty by default  
* User inputs when item is sold

---

### 10.3 Days to Sell

* Automatically calculated  
* Derived from:

Date Sold \- Date Listed

* Read-only

---

### 10.4 Listing Price

* Numeric input  
* Represents intended sale price

---

### 10.5 Sold For

* Numeric input  
* Represents actual sale value

---

### 10.6 Negotiation Insight

* Difference between:

Listing Price \- Sold For

* Not displayed as column (MVP)  
* Used for analytics

---

## 11\. Status System (Core Behaviour)

---

### 11.1 Status Options

Ordered lifecycle:

1. To prep  
2. Washing  
3. Photographed  
4. Listed  
5. Sold  
6. Posted  
7. Money received

---

### 11.2 Default State

When item enters Sales:

Status \= To prep  
---

### 11.3 Automatic Updates

#### If Date Listed is entered:

Status → Listed

#### If Date Sold is entered:

Status → Sold  
---

### 11.4 Manual Overrides

User can manually select:

* Washing  
* Photographed  
* Posted  
* Money received

---

### 11.5 Final State

Money received \= completed lifecycle  
---

## 12\. Item Lifecycle Flow

---

### 12.1 Entry into Sales

Triggered when:

Resale Willingness \= Sell now  
---

### 12.2 Initial State

* Status \= To prep  
* Sales fields empty

---

### 12.3 Lifecycle Flow

To prep → Washing → Photographed → Listed → Sold → Posted → Money received  
---

## 13\. Completed Sales Handling

---

### 13.1 Trigger

Status \= Money received  
---

### 13.2 Behaviour

* Item moves to Completed Section  
* Removed from active list

---

### 13.3 UI Structure

* Thick divider separates:  
  * Active items (top)  
  * Completed items (bottom)

---

### 13.4 Visibility

* Completed items:  
  * accessible by scrolling  
  * accessible via filter (Status \= completed)

---

## 14\. Expandable Row Behaviour

---

### 14.1 Trigger

* Expand icon in Name column

---

### 14.2 Expanded Content

Displays:

* Context  
* Style  
* Brand  
* Source  
* Wear Frequency  
* Resale Willingness  
* Emotional Rating  
* Estimated Resale Value

---

### 14.3 Purpose

* keeps table clean  
* allows deeper inspection

---

## 15\. Filtering System

Supports filtering by:

* Status  
* Dates  
* Price fields  
* Category / attributes  
* Source

---

### 15.1 Behaviour

* identical to Wardrobe filtering  
* updates:  
  * table  
  * metrics  
  * filter bar

---

## 16\. Sorting System

Supports sorting by:

* Date Listed  
* Date Sold  
* Days to Sell  
* Listing Price  
* Sold Price  
* Status

---

## 17\. Editing Behaviour

* identical inline editing system to Wardrobe  
* fields editable directly in table  
* changes apply instantly

---

## 18\. Add Item Behaviour

* button navigates to Add Item page  
* if item marked “Sell now” → appears here

---

## 19\. Empty States

### No items

No items in sales  
\[Add item\]  
---

### No results

No items match current filters  
\[Clear all\]  
---

## 20\. UX Principles

The page must:

* minimise friction  
* provide immediate feedback  
* maintain consistency with Wardrobe  
* support fast iteration  
* remain visually clean and editorial

---

## 21\. System Relationships (IMPORTANT)

* Uses same item structure as Wardrobe  
* Extends item with sales-specific fields  
* Items move:

Wardrobe → Sales → Completed  
---

## 22\. Key Product Decisions (Finalised)

* No separate “Sold page”  
* Single page with:  
  * filtering  
  * status  
  * visual separation

