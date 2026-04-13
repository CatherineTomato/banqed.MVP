# banqed — Data Model & Settings Specification 

Single Source of Truth for Item Structure, Metadata, and Configurable Systems

---

# 1\. Purpose

This document defines the canonical data architecture that powers:

* Item creation (Add Item)  
* Item management (Wardrobe \+ Sales)  
* Inline editing (Edit Item)  
* Analytics (Wardrobe, Sales, Circularity)  
* Settings (metadata configuration)

It is designed to support:

* A high-quality MVP (localStorage-based)  
* Clean frontend architecture (React-ready)  
* Seamless backend migration (Supabase / Firebase / Postgres)  
* Long-term SaaS scalability

---

# 2\. System Principles

---

## 2.1 Single Source of Truth

* All item data is stored in a single unified Item object  
* No duplication across Wardrobe / Sales  
* UI views are derived from item state, not separate datasets

---

## 2.2 Structured, Typed Data

* All fields use controlled inputs where possible  
* Avoid raw free-text except where explicitly allowed  
* All values are:  
  * enumerable  
  * filterable  
  * analyzable

---

## 2.3 Configurable Metadata Layer

* Dropdown values are stored in a central Settings system  
* Editable fields can evolve without code changes  
* Settings act as a dynamic schema layer

---

## 2.4 Lifecycle-Based Architecture

Items move through states:

wardrobe → sales → completed

State transitions are driven by:

* user actions  
* system logic

---

## 2.5 Analytics-First Design

All captured data must support:

* wardrobe insights  
* resale insights  
* circular consumption analysis  
* behavioural patterns

---

# 3\. Core Data Structures

---

# 3.1 Settings Data Model

---

## 3.1.1 Global Settings Object

const settingsData \= {  
 categories: \[\],  
 itemTypesByCategory: {},

 colours: \[\],  
 details: \[\],  
 styles: \[\],  
 contexts: \[\],

 brands: \[\],  
 sourceTypes: \[\],  
 sourceLocations: \[\],

 wearFrequencies: \[\],  
 resaleWillingnessOptions: \[\],  
 emotionalRatings: \[\]  
};  
---

## 3.1.2 Design Rules

* All arrays contain normalized strings  
* No duplicates allowed  
* All values:  
  * trimmed  
  * case-consistent (Title Case recommended)

---

## 3.1.3 Normalisation Function

function normalize(value) {  
 return value.trim().replace(/\\s+/g, " ")  
}

(Optional: extend later with case formatting)

---

# 4\. Field Specifications

---

## 4.1 Category

* Type: single-select  
* Source: settingsData.categories  
* Editable: yes

---

## 4.2 Item Type

* Type: single-select  
* Source: settingsData.itemTypesByCategory\[category\]  
* Editable: yes  
* Dependency: must match selected Category

---

## 4.3 Colour

* Type: multi-select  
* Source: settingsData.colours  
* Editable: yes

---

## 4.4 Detail

* Type: multi-select  
* Source: settingsData.details  
* Editable: yes

---

## 4.5 Style

* Type: multi-select  
* Source: settingsData.styles  
* Editable: yes

---

## 4.6 Context

* Type: multi-select  
* Source: settingsData.contexts  
* Editable: yes

---

## 4.7 Brand

* Type: searchable single-select  
* Source: settingsData.brands  
* Editable: yes (via add-new)

### Rules:

* No raw uncontrolled text in final stored value  
* New values persist globally

---

## 4.8 Source Type

* Type: single-select  
* Source: settingsData.sourceTypes  
* Editable: yes

---

## 4.9 Source Channel (Derived)

* Type: system-generated  
* Editable: no

### Mapping:

| Source Type | Source Channel |
| ----- | ----- |
| Charity shop | In-person |
| Vintage shop | In-person |
| Market | In-person |
| In-store | In-person |
| Online | Online |
| Hand-me-down | Transfer |
| Present | Transfer |

---

## 4.10 Source Location

* Type: searchable single-select (optional)  
* Source: settingsData.sourceLocations  
* Editable: yes

### Rules:

* Always visible  
* Optional input  
* Stored as reusable normalized value

---

## 4.11 Wear Frequency

* Type: single-select  
* Source: settingsData.wearFrequencies  
* Editable: no (V1)

---

## 4.12 Estimated Value

* Type: number  
* Required: yes  
* Editable: no (Settings)

### Purpose:

* wardrobe valuation  
* resale reference

---

## 4.13 Resale Willingness

* Type: single-select  
* Source: settingsData.resaleWillingnessOptions  
* Editable: no (V1)

---

## 4.14 Emotional Rating

* Type: single-select  
* Source: settingsData.emotionalRatings  
* Editable: no (V1)

---

# 5\. Unified Item Data Model

---

## 5.1 Canonical Item Object

{  
 id: "item\_001",

 name: "Brown polka dot midi skirt",

 category: "Skirts",  
 itemType: "Midi skirt",

 colours: \["Brown", "White"\],  
 details: \["Polka dot"\],  
 styles: \["Feminine"\],  
 contexts: \["Holiday", "Casual"\],

 brand: "Mango",

 sourceType: "Present",  
 sourceChannel: "Transfer",  
 sourceLocation: "Dublin",

 wearFrequency: "Never worn",  
 estimatedValue: 15,  
 resaleWillingness: "Sell now",  
 emotionalRating: "Indifferent",

 lifecycleState: "sales",  
 salesStatus: "to\_prep",

 listingPrice: null,  
 soldPrice: null,  
 dateListed: null,  
 dateSold: null,

 dateAdded: "2026-04-13T10:00:00Z",  
 dateUpdated: "2026-04-13T10:00:00Z"  
}  
---

# 6\. Lifecycle Model

---

## 6.1 Lifecycle States

"wardrobe" | "sales" | "completed"  
---

## 6.2 Transition Rules

### Add Item Routing

if (resaleWillingness \=== "Sell now") {  
 lifecycleState \= "sales"  
} else {  
 lifecycleState \= "wardrobe"  
}  
---

### Sales Completion

if (moneyReceived \=== true) {  
 lifecycleState \= "completed"  
}  
---

# 7\. Sales State Model

---

## 7.1 Sales Status Enum

"to\_prep" | "listed" | "offer\_received" | "sold\_pending" | "money\_received"  
---

## 7.2 Behaviour Rules

* Item remains in Sales until:  
  * salesStatus \= "money\_received"  
* Only then:  
  * lifecycleState → "completed"  
  * revenue is counted in analytics

---

# 8\. Core System Rules

---

## 8.1 Selection Rules

| Field | Type |
| ----- | ----- |
| Category | single |
| Item Type | single |
| Colour | multi |
| Detail | multi |
| Style | multi |
| Context | multi |
| Brand | single |
| Source Type | single |
| Source Location | optional single |
| Wear Frequency | single |
| Estimated Value | numeric |
| Resale Willingness | single |
| Emotional Rating | single |

---

## 8.2 Dependency Rules

* Item Type depends on Category  
* Source Channel derived from Source Type

---

## 8.3 Add-New Rules

Users may add values to:

* Category  
* Item Type  
* Colour  
* Detail  
* Style  
* Context  
* Brand  
* Source Type  
* Source Location

Users may NOT add values (V1):

* Wear Frequency  
* Resale Willingness  
* Emotional Rating

---

# 9\. Settings Page System

---

## 9.1 Purpose

Administrative interface for managing metadata.

---

## 9.2 Responsibilities

* View values  
* Add values  
* Edit values  
* Delete values  
* Manage itemTypesByCategory

---

## 9.3 Structure

### Categories

### Item Types (grouped by category)

### Attribute Lists:

* colours  
* details  
* styles  
* contexts  
* brands  
* sourceTypes  
* sourceLocations

---

## 9.4 System Lists (Locked in V1)

* wearFrequencies  
* resaleWillingnessOptions  
* emotionalRatings

---

## 9.5 Propagation Rule

Changes to Settings:

→ immediately affect

* Add Item  
* Edit Item  
* Filters  
* Analytics

---

# 10\. Persistence Layer (V1)

---

## 10.1 Storage

localStorage.setItem("items", JSON.stringify(items))  
localStorage.setItem("settings", JSON.stringify(settingsData))  
---

## 10.2 Future Migration

Designed for:

* PostgreSQL schema  
* Supabase tables  
* Firebase collections

---

# 11\. Analytics Readiness

---

## 11.1 Wardrobe Analytics

* total value  
* value by category  
* value by colour  
* wear frequency distribution  
* emotional distribution

---

## 11.2 Sales Analytics

* items sold  
* revenue  
* avg sale price  
* conversion rate

---

## 11.3 Circularity Analytics

* % online vs in-person vs transfer  
* value by source channel  
* geographic sourcing patterns

---

## 11.4 Geographic Analytics

* value by city  
* sourcing patterns by region  
* wardrobe origin mapping

---

# 12\. Performance & Scaling Considerations

---

* Flat object structure → fast rendering  
* No nested heavy objects  
* Efficient filtering & aggregation  
* Suitable for 1k–10k items without refactor

---

# 13\. Product Positioning

---

banqed is not:

→ a wardrobe tracker

It is:

→ a personal clothing intelligence system

Supporting:

* ownership awareness  
* resale decision-making  
* circular consumption  
* behavioural insight

