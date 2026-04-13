# banqed — Wardrobe Page Technical Specification (V1)

---

# 1\. Overview

The Wardrobe page is a data-driven table view of the unified Item dataset.

It is responsible for:

* rendering wardrobe items  
* enabling filtering and sorting  
* supporting inline editing (via Edit Item system)  
* computing real-time metrics

---

# 2\. Data Source

## 2.1 Dataset Definition

wardrobeItems \= items.filter(item \=\>  
 item.lifecycleState \=== "wardrobe"  
)  
---

## 2.2 Source of Truth

* All data originates from the global Item store  
* Wardrobe does not maintain independent state copies

---

# 3\. Data Model Dependency

The Wardrobe page consumes the Item object:

Item {  
 id: string

 name: string  
 category: string  
 itemType: string

 colours: string\[\]  
 details: string\[\]  
 contexts: string\[\]  
 styles: string\[\]

 brand: string

 sourceType: string  
 sourceChannel: string  
 sourceLocation: string | null

 wearFrequency: string  
 resaleWillingness: string  
 emotionalRating: string

 estimatedValue: number

 lifecycleState: "wardrobe" | "sales" | "completed"

 dateAdded: string  
 dateUpdated: string  
}  
---

# 4\. Rendering Pipeline

## 4.1 Processing Flow

visibleItems \=  
 sort(  
   filter(  
     wardrobeItems  
   )  
 )  
---

## 4.2 Render Order

* Render rows in sorted order  
* Each row maps directly to one Item

---

# 5\. Metrics Engine

## 5.1 Item Count

itemCount \= visibleItems.length  
---

## 5.2 Total Estimated Value

totalValue \= sum(  
 visibleItems.map(item \=\> item.estimatedValue || 0\)  
)  
---

## 5.3 Behaviour

* Metrics recalculate on:  
  * filter change  
  * sort change  
  * edit

---

# 6\. Filtering System

## 6.1 Filter State Model

filters \= {  
 category: string\[\],  
 itemType: string\[\],  
 colours: string\[\],  
 details: string\[\],  
 contexts: string\[\],  
 styles: string\[\],  
 brand: string\[\],  
 sourceType: string\[\],  
 sourceChannel: string\[\],  
 sourceLocation: string\[\],  
 wearFrequency: string\[\],  
 resaleWillingness: string\[\],  
 emotionalRating: string\[\],  
 estimatedValue: { min?: number, max?: number }  
}  
---

## 6.2 Filter Application

function matchesFilters(item, filters) {  
 return Object.entries(filters).every((\[field, value\]) \=\> {  
   if (\!value || value.length \=== 0\) return true

   if (Array.isArray(item\[field\])) {  
     return item\[field\].some(v \=\> value.includes(v))  
   }

   return value.includes(item\[field\])  
 })  
}  
---

## 6.3 Pipeline

filteredItems \= wardrobeItems.filter(item \=\>  
 matchesFilters(item, filters)  
)  
---

## 6.4 Token Sync

* Filters UI ←→ filter state ←→ dataset  
* Must remain fully synchronised

---

# 7\. Sorting System

## 7.1 Sort State

sorts \= \[  
 { field: "estimatedValue", direction: "desc" },  
 { field: "category", direction: "asc" }  
\]  
---

## 7.2 Sort Function

function sortItems(items, sorts) {  
 return \[...items\].sort((a, b) \=\> {  
   for (let sort of sorts) {  
     let valA \= a\[sort.field\]  
     let valB \= b\[sort.field\]

     if (valA \< valB) return sort.direction \=== "asc" ? \-1 : 1  
     if (valA \> valB) return sort.direction \=== "asc" ? 1 : \-1  
   }  
   return 0  
 })  
}  
---

# 8\. Row Rendering

## 8.1 Token Renderer

function renderTokens(values) {  
 if (\!values || values.length \=== 0\) return ""

 return values.map(v \=\> \`${v}.\`)  
}  
---

## 8.2 Source Display

function renderSource(item) {  
 if (item.sourceLocation) {  
   return \`${item.sourceLocation}. ${item.sourceType}.\`  
 }  
 return \`${item.sourceType}.\`  
}  
---

# 9\. Edit Integration

## 9.1 Trigger

onRowClick(itemId) {  
 setActiveEditRow(itemId)  
}  
---

## 9.2 Behaviour

* Only one active row  
* Delegates editing to:  
   👉 Edit Item Interaction System

---

## 9.3 State Update Flow

onItemUpdate(updatedItem) {  
 updateItemInStore(updatedItem)

 reapplyFilters()  
 recalculateMetrics()  
}  
---

# 10\. Lifecycle Transition Logic

## 10.1 Move to Sales

if (item.resaleWillingness \=== "Sell now") {  
 item.lifecycleState \= "sales"  
}  
---

## 10.2 UI Behaviour

* Item removed from Wardrobe dataset  
* Table re-renders automatically

---

# 11\. Empty State Handling

## 11.1 No Items

if (wardrobeItems.length \=== 0\)  
---

## 11.2 No Filter Results

if (filteredItems.length \=== 0\)  
---

# 12\. Performance Strategy

## 12.1 Rendering

* Use list virtualization  
* Render only visible rows

---

## 12.2 Updates

* Update only affected row  
* Avoid full dataset re-render

---

## 12.3 Filtering

* Client-side (MVP)  
* Optimised for ≤ 1,000 items

---

# 13\. State Management

## 13.1 Core State

items: Item\[\]  
filters: FilterState  
sorts: SortState  
activeEditRowId: string | null  
---

## 13.2 Update Flow

user action →  
update state →  
recompute visibleItems →  
re-render  
---

# 14\. Data Consistency

* Single source of truth  
* No duplicated objects  
* All pages operate on same dataset

---

# 15\. System Relationships

## 15.1 Shared Model

Wardrobe shares data with:

* Sales  
* Analytics  
* Add Item

---

## 15.2 Cross-System Behaviour

Wardrobe → Sales  
when resaleWillingness \= "Sell now"  
---

# 16\. Accessibility & UX Constraints

* keyboard navigation  
* focus management  
* dropdown accessibility  
* responsive layout

