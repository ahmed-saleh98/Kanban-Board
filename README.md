# 📝 Kanban Board Task Manager

A responsive, high-performance Kanban board application. It features seamless drag-and-drop functionality, optimistic UI updates, and robust state management.

## ✨ Features

- **4-Column Kanban Layout:** Tasks are organized into `TO DO`, `IN PROGRESS`, `IN REVIEW`, and `DONE`.
- **Full CRUD Operations:** Create, Read, Update (edit details or change columns), and Delete tasks.
- **Drag and Drop:** Smooth drag-and-drop experience using `@hello-pangea/dnd` with optimistic UI updates for instant feedback.
- **Instant Search:** Client-side search functionality that instantly filters tasks by both `title` and `description`.
- **Column Pagination:** "Load More" functionality implemented per-column to cleanly manage large datasets without breaking the drag-and-drop experience.
- **Priority Tagging:** Tasks can be assigned `HIGH`, `MEDIUM`, or `LOW` priorities with distinct visual indicators.
- **Performance Optimized:** Utilizes `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders during drag-and-drop interactions.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Server State Management:** React Query (TanStack Query)
- **Client State Management:** Zustand
- **UI Library:** Material UI (MUI)
- **Drag & Drop:** `@hello-pangea/dnd`
- **Mock Backend:** `json-server`
- **Styling:** Emotion (via MUI) & standard CSS/MUI System

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js installed (v18+ recommended).

### 1. Install Dependencies

Clone the repository and install the required NPM packages:

```bash
git clone <your-repo-url>
cd kanban-board
npm install
```

### 2. Start the Mock API Server

This project relies on json-server to mock a REST API. The database is stored locally in db.json.
(Note: This project specifically uses json-server@0.17.4 to ensure stable full-text search compatibility).

Open a terminal and run:

```bash
npm run api
The API will run on http://localhost:4000.
```

### 3. Start the Next.js Development Server

Open a second terminal window and run the frontend:

```bash
npm run dev
The app will be available at http://localhost:3000.
```
