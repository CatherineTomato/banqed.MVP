# **banqed MVP** {#banqed-mvp}

# **Project Documentation**

By Catherine Grehan

## **1\. Project overview** {#1.-project-overview}

My project is a single-page web application called **banqed MVP**. It is a wardrobe and resale management tool designed to help users understand what they own, estimate the resale value of their wardrobe, and manage clothes more intentionally. The app is designed to support a more circular clothing system.

The project was designed as an editorial-style, data-focused interface rather than a standard e-commerce or inventory page. The aim was to create a calm, structured user experience that combines visual clarity with practical interaction.

The application was built using **HTML, CSS, and JavaScript** and hosted through **GitHub Pages**.

[**banqed MVP — Project Documentation	1**](#banqed-mvp)

[1\. Project overview	2](#1.-project-overview)

[2\. Project concept and planning	2](#2.-project-concept-and-planning)

[2.1 Project concept	2](#2.1-project-concept)

[2.2 Planning process	3](#2.2-planning-process)

[2.3 Design approach	3](#2.3-design-approach)

[3\. HTML structure and content	3](#3.-html-structure-and-content)

[3.1 Structure	3](#3.1-structure)

[3.2 Main sections	4](#3.2-main-sections)

[3.3 Form structure	4](#3.3-form-structure)

[3.4 Table structure	4](#3.4-table-structure)

[4\. CSS styling and visual design	5](#4.-css-styling-and-visual-design)

[4.1 Visual style	5](#4.1-visual-style)

[4.2 Layout decisions	5](#4.2-layout-decisions)

[4.3 Responsive design	6](#4.3-responsive-design)

[5\. JavaScript interactivity	6](#5.-javascript-interactivity)

[6\. Interactive features implemented	6](#6.-interactive-features-implemented)

[6.1 Interactive feature 1: single-page navigation	6](#6.1-interactive-feature-1:-single-page-navigation)

[6.2 Interactive feature 2: guided Add Item workflow	6](#6.2-interactive-feature-2:-guided-add-item-workflow)

[6.3 Interactive feature 3: dependent dropdown logic	7](#6.3-interactive-feature-3:-dependent-dropdown-logic)

[6.4 Interactive feature 4: custom multi-select dropdowns	7](#6.4-interactive-feature-4:-custom-multi-select-dropdowns)

[6.5 Interactive feature 5: form validation and feedback	7](#6.5-interactive-feature-5:-form-validation-and-feedback)

[6.6 Interactive feature 6: dynamic item creation and routing	8](#6.6-interactive-feature-6:-dynamic-item-creation-and-routing)

[6.7 Interactive feature 7: localStorage persistence	8](#6.7-interactive-feature-7:-localstorage-persistence)

[6.8 Interactive feature 8: Wardrobe filtering	9](#6.8-interactive-feature-8:-wardrobe-filtering)

[6.9 Interactive feature 9: Wardrobe sorting	9](#6.9-interactive-feature-9:-wardrobe-sorting)

[6.10 Interactive feature 10: active query tokens	10](#6.10-interactive-feature-10:-active-query-tokens)

[7\. Required JavaScript criteria from the brief	10](#7.-required-javascript-criteria-from-the-brief)

[7.1 One form processed by JavaScript	10](#7.1-one-form-processed-by-javascript)

[7.2 Three or more DOM interactions	10](#7.2-three-or-more-dom-interactions)

[7.3 Graphical / interactive element	10](#7.3-graphical-/-interactive-element)

[8\. Data model and application logic	11](#8.-data-model-and-application-logic)

[8.1 Settings model	11](#8.1-settings-model)

[8.2 Item model	11](#8.2-item-model)

[9\. Design decisions	12](#9.-design-decisions)

[9.1 Why I chose a single-page application	12](#9.1-why-i-chose-a-single-page-application)

[9.2 Why I used a guided form	12](#9.2-why-i-used-a-guided-form)

[9.3 Why I used localStorage	12](#9.3-why-i-used-localstorage)

[9.4 Why I used a data-table wardrobe view	12](#9.4-why-i-used-a-data-table-wardrobe-view)

[10\. Development process	13](#10.-development-process)

[11\. Challenges faced	13](#11.-challenges-faced)

[11.1 Multi-select dropdown behaviour	13](#11.1-multi-select-dropdown-behaviour)

[11.2 Keeping UI state in sync	13](#11.2-keeping-ui-state-in-sync)

[11.3 Filter and sort behaviour	14](#11.3-filter-and-sort-behaviour)

[11.4 Scope control	14](#11.4-scope-control)

[12\. Features completed for submission	14](#12.-features-completed-for-submission)

[13\. Features planned but not fully implemented	14](#13.-features-planned-but-not-fully-implemented)

[14\. Version control and hosting	15](#14.-version-control-and-hosting)

[15\. README contents	15](#15.-readme-contents)

[16\. How this project meets the rubric	15](#16.-how-this-project-meets-the-rubric)

[16.1 Understanding of HTML, CSS and JavaScript	15](#16.1-understanding-of-html,-css-and-javascript)

[16.2 Understanding of how JavaScript adds functionality	16](#16.2-understanding-of-how-javascript-adds-functionality)

[16.3 Project conceptualisation and planning	16](#16.3-project-conceptualisation-and-planning)

[16.4 Graphics and interactivity	16](#16.4-graphics-and-interactivity)

[16.5 Version control and hosting	16](#16.5-version-control-and-hosting)

[17\. Conclusion	16](#17.-conclusion)

## **2\. Project concept and planning** {#2.-project-concept-and-planning}

### **2.1 Project concept** {#2.1-project-concept}

The concept behind banqed was to build a digital system for clothing ownership and resale decision-making. I wanted the project to feel more considered than a basic spreadsheet or checklist. The idea was to allow a user to:

* add structured information about clothing items  
* organise items into a wardrobe dataset  
* route items into a sales flow if they are ready to be sold  
* filter and sort items for decision-making

The broader design goal was to create a product that sits between wardrobe tracking, resale preparation, and personal analytics.

### **2.2 Planning process** {#2.2-planning-process}

Before building, I planned the structure of the application around a small number of key views:

* Add Item  
* Wardrobe  
* Sales  
* Progress  
* Wardrobe Analytics  
* Sales Analytics  
* Settings

Given the assignment allowed a single-page application, I chose this format so that navigation between sections could be handled dynamically with JavaScript rather than through multiple separate HTML pages.

The main implemented sections for the submitted version are the **Add Item** page and the **Wardrobe** page. The other sections are included in the structure and navigation to show the intended product architecture, but they remain placeholders in this MVP.

### **2.3 Design approach** {#2.3-design-approach}

I planned the Add Item page as a guided, section-by-section workflow rather than one long form. This was a deliberate UX decision to reduce cognitive overload and make data entry feel more premium and controlled.

I also planned the Wardrobe page as a structured table view with filtering and sorting controls so that the app would demonstrate both data display and interactive data manipulation.

## **3\. HTML structure and content** {#3.-html-structure-and-content}

The application uses semantic HTML to organise the content and interface.

### **3.1 Structure** {#3.1-structure}

The page includes:

* a header with branding and navigation  
* a main content area  
* multiple app sections inside the main area  
* forms, buttons, headings, labels, tables, and input fields

The navigation is built using buttons with `data-section` attributes, allowing JavaScript to switch between sections without reloading the page.

### **3.2 Main sections** {#3.2-main-sections}

The HTML includes the following sections:

* `add-item`  
* `wardrobe`  
* `sales`  
* `progress`  
* `wardrobe-analytics`  
* `sales-analytics`  
* `settings`

Each section is structured as an `app-section`, and JavaScript shows or hides these sections depending on the user’s navigation choice.

### **3.3 Form structure** {#3.3-form-structure}

The Add Item page contains one main form divided into five sections:

1. What is it?  
2. How do you wear it?  
3. Where is it from?  
4. Usage \+ value  
5. How do you feel about it?

This form uses a mix of:

* text input  
* single-select dropdowns  
* custom multi-select dropdowns  
* numeric input  
* submit button  
* feedback text

### **3.4 Table structure** {#3.4-table-structure}

The Wardrobe page contains a table that displays stored wardrobe items. The columns include:

* Item  
* Colour  
* Detail  
* Context  
* Style  
* Brand  
* Source  
* Wear frequency  
* Resale willingness  
* Emotional rating  
* Estimated resale value

This provides a clear example of structured HTML content that is dynamically populated by JavaScript.

## **4\. CSS styling and visual design** {#4.-css-styling-and-visual-design}

The project uses a custom CSS stylesheet to create a consistent visual identity.

### **4.1 Visual style** {#4.1-visual-style}

The styling approach is minimal, editorial, and monochrome with a soft accent colour. I wanted the site to feel clean, product-like, and intentional rather than overly decorative.

The CSS controls:

* typography  
* spacing  
* layout  
* borders  
* buttons  
* table styling  
* form field styling  
* responsive behaviour

### **4.2 Layout decisions** {#4.2-layout-decisions}

The layout uses grid and flexbox throughout the project. For example:

* the site header uses flexbox  
* the Add Item form uses grid layouts  
* the Wardrobe header and control sections use grid  
* the table and query controls are styled for a structured data-view appearance

### **4.3 Responsive design** {#4.3-responsive-design}

Media queries are included to adapt the layout for smaller screens. These adjust:

* navigation spacing  
* grid layouts  
* header layout  
* table behaviour  
* form layout  
* sizing of visual elements such as the plus icon

This demonstrates responsiveness, which was a required part of the assignment brief.

## **5\. JavaScript interactivity** {#5.-javascript-interactivity}

JavaScript is the core of the project’s functionality. It controls navigation, form progression, validation, dynamic rendering, local storage, filtering, sorting, and DOM updates.

This is the part of the project where I most directly addressed the assignment requirement to demonstrate how JavaScript adds functionality to websites.

## **6\. Interactive features implemented** {#6.-interactive-features-implemented}

### **6.1 Interactive feature 1: single-page navigation** {#6.1-interactive-feature-1:-single-page-navigation}

The project uses JavaScript to control which section of the application is visible.

When a user clicks a navigation button, JavaScript:

* reads the target section from the button’s `data-section`  
* hides all other sections  
* activates the chosen section  
* updates active button styling

This means the application behaves like a single-page app without page reloads.

### **6.2 Interactive feature 2: guided Add Item workflow** {#6.2-interactive-feature-2:-guided-add-item-workflow}

The Add Item form is not a static form. JavaScript controls a guided progression model.

As the user fills in each section:

* the current section is checked for completion  
* completed sections remain visible above  
* the next section becomes active  
* the interface scrolls to the next working position

This creates a structured experience rather than a long uninterrupted form.

### **6.3 Interactive feature 3: dependent dropdown logic** {#6.3-interactive-feature-3:-dependent-dropdown-logic}

The **Item Type** dropdown depends on the selected **Category**.

When the category changes:

* the previous item type is cleared  
* JavaScript loads the matching item types for that category  
* the dropdown updates dynamically

This shows dependency logic and DOM manipulation in response to user actions.

### **6.4 Interactive feature 4: custom multi-select dropdowns** {#6.4-interactive-feature-4:-custom-multi-select-dropdowns}

The project includes custom multi-select controls for:

* colours  
* details  
* contexts  
* styles  
* emotional rating

These are powered by JavaScript rather than relying on the browser’s default multi-select interface.

The multi-select system allows the user to:

* open a custom panel  
* choose multiple options  
* add new metadata values in some fields  
* save their selections  
* see the selected values reflected in the trigger label

This was one of the most important pieces of interactivity in the application.

### **6.5 Interactive feature 5: form validation and feedback** {#6.5-interactive-feature-5:-form-validation-and-feedback}

The Add Item form is validated using JavaScript before submission.

Validation checks include:

* item name present  
* category selected  
* item type selected  
* at least one colour selected  
* required fields completed in later sections  
* estimated resale value is non-negative

If the form is incomplete:

* feedback is shown to the user  
* the interface moves focus back to the relevant section

If submission is successful:

* the new item is saved  
* the form resets  
* a success message is displayed

### **6.6 Interactive feature 6: dynamic item creation and routing** {#6.6-interactive-feature-6:-dynamic-item-creation-and-routing}

When the form is submitted, JavaScript constructs a new item object from the entered values.

That object includes:

* item identity fields  
* multi-select values  
* source information  
* wear frequency  
* estimated value  
* resale willingness  
* emotional rating  
* date added  
* lifecycle state

The item is then routed based on resale willingness:

* if resale willingness is `Sell now`, the item is placed in `sales`  
* otherwise, it is placed in `wardrobe`

This demonstrates application logic beyond simple display changes.

### **6.7 Interactive feature 7: localStorage persistence** {#6.7-interactive-feature-7:-localstorage-persistence}

The application uses `localStorage` to persist both:

* settings data  
* item data

This means that when the page is refreshed, the user’s items and custom settings are retained.

This was important because it allowed the project to behave more like a real application rather than a temporary demo.

### **6.8 Interactive feature 8: Wardrobe filtering** {#6.8-interactive-feature-8:-wardrobe-filtering}

The Wardrobe page allows the user to filter the dataset by:

* category  
* colour  
* brand  
* wear frequency  
* resale willingness  
* emotional rating  
* estimated value range

When filters are changed:

* JavaScript updates query state  
* the dataset is filtered  
* the table re-renders  
* the active filter bar updates  
* the metrics update

This is a clear example of interactive DOM manipulation.

### **6.9 Interactive feature 9: Wardrobe sorting** {#6.9-interactive-feature-9:-wardrobe-sorting}

The Wardrobe page also includes sorting options through a single “Sort by” dropdown.

Sorting options include:

* estimated resale value high to low  
* estimated resale value low to high  
* date added newest first  
* date added oldest first  
* brand A–Z / Z–A  
* category A–Z / Z–A  
* emotional rating highest to lowest / lowest to highest

This required JavaScript logic for:

* storing sort state  
* comparing numeric, date, and text values  
* custom ranking for emotional rating  
* re-rendering the sorted table

### **6.10 Interactive feature 10: active query tokens** {#6.10-interactive-feature-10:-active-query-tokens}

When filters or sorting are applied, JavaScript renders active query tokens on the page.

These tokens:

* show the currently applied filters  
* can be individually removed  
* trigger immediate updates to the displayed dataset

This provides another example of dynamic DOM creation and event handling.

## **7\. Required JavaScript criteria from the brief** {#7.-required-javascript-criteria-from-the-brief}

The assignment required at least:

* 1 form processed by a JavaScript function  
* 3 interactions involving DOM manipulation  
* at least one graphical element such as a form

My project meets these requirements.

### **7.1 One form processed by JavaScript** {#7.1-one-form-processed-by-javascript}

The Add Item form is processed through JavaScript submission logic. It validates inputs, creates the item object, updates storage, resets the form, and displays feedback.

### **7.2 Three or more DOM interactions** {#7.2-three-or-more-dom-interactions}

Examples include:

1. showing and hiding application sections through navigation  
2. updating the item type dropdown based on category  
3. opening, updating, and saving custom multi-select dropdowns  
4. rendering the wardrobe table from stored data  
5. filtering and sorting the wardrobe table dynamically  
6. rendering and removing active filter tokens

### **7.3 Graphical / interactive element** {#7.3-graphical-/-interactive-element}

The Add Item form is the main graphical interactive element. The Wardrobe table and filter/sort panels provide additional evidence of interface interactivity.

## **8\. Data model and application logic** {#8.-data-model-and-application-logic}

The application uses a shared item model and a shared settings model.

### **8.1 Settings model** {#8.1-settings-model}

The settings data object contains arrays for:

* categories  
* item types by category  
* colours  
* details  
* contexts  
* styles  
* brands  
* source types  
* source locations  
* wear frequencies  
* resale willingness options  
* emotional ratings

This makes the form configurable and supports add-new behaviour in selected fields.

### **8.2 Item model** {#8.2-item-model}

Each item saved by the application contains fields such as:

* id  
* name  
* category  
* itemType  
* colours  
* details  
* contexts  
* styles  
* brand  
* sourceType  
* sourceChannel  
* sourceLocation  
* wearFrequency  
* estimatedValue  
* resaleWillingness  
* emotionalRating  
* status  
* lifecycleState  
* dateAdded  
* dateUpdated

This structured model allows the wardrobe table to be rendered dynamically and supports future extension.

## **9\. Design decisions** {#9.-design-decisions}

### **9.1 Why I chose a single-page application** {#9.1-why-i-chose-a-single-page-application}

A single-page structure allowed me to:

* keep the experience smooth  
* simplify hosting  
* use JavaScript to demonstrate dynamic navigation  
* keep the codebase manageable for an assignment setting

### **9.2 Why I used a guided form** {#9.2-why-i-used-a-guided-form}

I did not want the item-entry experience to feel like filling out a spreadsheet. The guided section-based structure made the interface feel more intentional and made the JavaScript interaction more interesting.

### **9.3 Why I used localStorage** {#9.3-why-i-used-localstorage}

Using localStorage allowed the app to behave like a usable prototype without needing a backend. It also demonstrated data persistence using JavaScript.

### **9.4 Why I used a data-table wardrobe view** {#9.4-why-i-used-a-data-table-wardrobe-view}

The wardrobe table made it possible to show:

* structured data presentation  
* filtering  
* sorting  
* metrics  
* dynamic rendering

This aligned well with the assignment requirement to demonstrate meaningful interactivity.

## **10\. Development process** {#10.-development-process}

My development process was iterative.

I began by building the basic application shell:

* navigation  
* sections  
* base styling

I then built the Add Item workflow first, because this is the main data-entry system of the app. After that, I implemented wardrobe rendering from stored items, then added filtering, sorting, and query tokens.

Throughout development I refined:

* form progression logic  
* multi-select interaction  
* filter behaviour  
* sort behaviour  
* responsive layout

The project developed from a basic interface into a more structured, interactive MVP.

## **11\. Challenges faced** {#11.-challenges-faced}

### **11.1 Multi-select dropdown behaviour** {#11.1-multi-select-dropdown-behaviour}

One of the biggest challenges was getting the custom multi-select controls to behave properly. Initially the dropdowns closed too quickly, selections did not persist correctly, and this disrupted section completion logic.

I resolved this by improving event handling, especially around click propagation, open/close logic, and saving selected values back into the form state.

### **11.2 Keeping UI state in sync** {#11.2-keeping-ui-state-in-sync}

Another challenge was synchronising:

* form state  
* section progression  
* multi-select draft state  
* wardrobe query state  
* rendered table output

This required careful organisation of functions so that the interface always reflected the current data correctly.

### **11.3 Filter and sort behaviour** {#11.3-filter-and-sort-behaviour}

Implementing filters and sorting on the Wardrobe page required attention to how multiple filter values should behave, how active tokens should be displayed, and how metrics should update alongside the visible dataset.

### **11.4 Scope control** {#11.4-scope-control}

The original concept included additional features such as inline wardrobe editing and a more complete sales workflow. Due to time constraints, I prioritised the features that best demonstrated the assignment criteria: form handling, DOM manipulation, data persistence, filtering, sorting, and navigation.

## **12\. Features completed for submission** {#12.-features-completed-for-submission}

The submitted version includes:

* single-page navigation  
* structured Add Item form  
* guided section progression  
* required-field validation  
* dependent dropdown logic  
* custom multi-select dropdowns  
* add-new metadata values in selected fields  
* localStorage persistence  
* Wardrobe table rendering  
* wardrobe metrics  
* wardrobe filtering  
* wardrobe sorting  
* active filter/sort tokens  
* empty states  
* responsive styling  
* GitHub Pages deployment structure

## **13\. Features planned but not fully implemented** {#13.-features-planned-but-not-fully-implemented}

Some features were planned in the wider product concept but are not fully implemented in the submitted version:

* inline edit functionality on the Wardrobe page  
* completed Sales page workflow  
* full Settings management interface  
* analytics pages beyond placeholders

These sections remain part of the overall planned architecture, but the MVP submitted for this assignment focuses on the most complete and functional interactive parts of the system.

## **14\. Version control and hosting** {#14.-version-control-and-hosting}

The assignment required evidence of version control and hosting.

For this project:

* the codebase is stored in a GitHub repository  
* the site is intended to be hosted using GitHub Pages  
* the hosted version provides an accessible URL for review

Using GitHub also supports version control by allowing the project to be saved, updated, and tracked over time.

## **15\. README contents** {#15.-readme-contents}

The repository README should include:

* project name  
* short description of banqed MVP  
* technologies used  
* how to access the live site  
* how to run the project locally  
* summary of current features  
* note that this is an MVP / assignment project

## **16\. How this project meets the rubric** {#16.-how-this-project-meets-the-rubric}

### **16.1 Understanding of HTML, CSS and JavaScript** {#16.1-understanding-of-html,-css-and-javascript}

The project demonstrates practical use of all three technologies:

* HTML for semantic structure and page sections  
* CSS for layout, visual hierarchy, and responsiveness  
* JavaScript for state, interactivity, form processing, filtering, sorting, and dynamic rendering

### **16.2 Understanding of how JavaScript adds functionality** {#16.2-understanding-of-how-javascript-adds-functionality}

JavaScript is central to the project. It controls:

* section navigation  
* progressive form logic  
* validation  
* item creation  
* data persistence  
* wardrobe rendering  
* filtering  
* sorting  
* query tokens  
* empty states

This clearly shows how JavaScript adds functionality beyond a static website.

### **16.3 Project conceptualisation and planning** {#16.3-project-conceptualisation-and-planning}

The project has a clear concept, planned structure, and defined user flow. Even where some sections remain placeholders, the overall architecture was planned as part of a larger system.

### **16.4 Graphics and interactivity** {#16.4-graphics-and-interactivity}

The project includes a clear visual identity and several interactive systems, especially the Add Item flow and Wardrobe controls.

### **16.5 Version control and hosting** {#16.5-version-control-and-hosting}

The project is structured for GitHub repository use and GitHub Pages hosting, directly matching the assignment requirement.

## **17\. Conclusion** {#17.-conclusion}

This project demonstrates the creation of a full front-end web application from scratch using HTML, CSS, and JavaScript. The final result is a single-page wardrobe and resale management MVP with structured item entry, local persistence, and interactive wardrobe filtering and sorting.

The strongest part of the submitted build is the use of JavaScript to create a dynamic user experience. Instead of building a static webpage, I created a working interface in which user actions directly affect data, interface state, and rendered content.

Although some planned features remain for future development, the submitted version successfully meets the core assignment aims by demonstrating design thinking, front-end structure, styling, interactivity, DOM manipulation, and deployable project architecture.

