# Notes App – Full Stack Internship Assignment

A simple full stack Notes Application built using **React.js** (Frontend) and **Node.js + Express.js** (Backend).
The application allows users to create, view, update, and delete notes through a REST API.

---

# Tech Stack

## Frontend

* React.js
* Axios / Fetch API
* React Hooks (`useState`, `useEffect`)

## Backend

* Node.js
* Express.js
* CORS

---

# Features

* Create Notes
* View All Notes
* View Single Note
* Edit Existing Notes
* Delete Notes
* REST API Integration
* Loading State Handling
* Error Handling
* Simple and Clean UI

---

# Project Structure

```bash
Notes-app/
│
├── client/        # React Frontend
│
├── server/        # Node.js + Express Backend
│
└── README.md
```

---

# Backend API Endpoints

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/api/notes`     | Fetch all notes      |
| GET    | `/api/notes/:id` | Fetch note by ID     |
| POST   | `/api/notes`     | Create a new note    |
| PUT    | `/api/notes/:id` | Update existing note |
| DELETE | `/api/notes/:id` | Delete note          |

---

# Setup Instructions

## Clone Repository

```bash
git clone https://github.com/Gauravmy/Notes-app-.git
```

```bash
cd Notes-app-
```

---

# Backend Setup

## Navigate to server folder

```bash
cd server
```

## Install dependencies

```bash
npm install
```

## Start backend server

```bash
npm start
```

Server runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

## Navigate to client folder

```bash
cd client
```

## Install dependencies

```bash
npm install
```

## Start frontend server

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# Notes Object Structure

```json
{
  "id": 1,
  "title": "Sample Note",
  "content": "This is a sample note",
  "createdAt": "2026-06-03"
}
```

---

# Assumptions & Decisions

* Notes are stored using an in-memory array / JSON structure.
* Focus was kept on functionality and clean code instead of advanced UI styling.
* Functional React components and hooks were used throughout the project.
* Backend validation and error handling were added for API reliability.

---

# Future Improvements

* Database integration (MongoDB/PostgreSQL)
* User Authentication
* Rich Text Editor
* Search & Filter Notes
* Responsive UI Enhancements
* Deployment using Vercel/Render

---

# Author

## Gaurav Dhakad

* GitHub: https://github.com/Gauravmy
* LinkedIn: https://www.linkedin.com/in/gaurav-dhakad-b7ba642a6/
