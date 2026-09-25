# Skandor Technologies task assignment by Anjana Kumari


---

##  Key Features

### 1. Fetch & Display (API Integration)
- Automatically fetches 15 initial tasks on load from [`https://jsonplaceholder.typicode.com/todos?_limit=15`](https://jsonplaceholder.typicode.com/todos?_limit=15).
- Card list displays task **Title**, **Completion Status**, and assigned **User ID** badge.
- Includes a smooth **Loading Spinner** and a **Friendly Error Card** with retry capabilities if API requests fail.

### 2. Full Interactivity
- **Status Toggle**: Custom animated checkboxes to toggle completed vs. incomplete states.
- **Add New Task**: Add tasks to the top of the list with custom User ID assignment and inline validation.
- **Filter Tabs**: Instant filtering by **All**, **Incomplete**, and **Completed** with live count badges.


### 3. Design System & Theme.
- **Responsive Layout**: Designed for mobile touch screens and desktop viewports.
- **Visual Contrast**: Completed tasks feature strikethrough typography, status tags, checkmark badges, and subtle background tinting.

### 4. Enhancements
- **LocalStorage Persistence**: Tasks survive page refresh; edits, completions, and new items remain saved.
- **Sorting**: Sort by Newest, Oldest, Title (A-Z / Z-A), Completion Status, or User ID.
- **Toast Feedback**: Non-intrusive notification toasts for user actions.

---


## Getting Started

### Prerequisites
- Node.js 
- npm 

### Installation & Execution

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```




