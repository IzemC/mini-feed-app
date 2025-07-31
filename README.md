# Mini Feed App

A simple full-stack feed application where users can view, create, and interact with posts.

## Features

- Basic Authentification / Identification
- View the list of posts sorted by most recent
- Create new text posts
- Like/Dislike posts with counters
- Comment on posts

## Tech Stack

**Backend:**
- Express.js
- In-memory data storage
- UUID for IDs
  
**Frontend:**
- React
- Vite
- TypeScript
- Tailwind CSS
- Zustand
- React Query
- Axios

## Installation

### 1. Clone the repository:

```bash
git clone https://github.com/IzemC/mini-feed-app
cd mini-feed-app
```

### 2. Install dependencies for frontend and backend:

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
cd ..
```

## Running the Application
Start both frontend and backend in development mode:

```bash
npm run dev
```

This will:

Start the backend server on http://localhost:5000

Start the frontend development server on http://localhost:5173

## Project Structure
```bash
mini-feed-app/
├── frontend/              # React frontend
│   ├── src/               # Source files
│   └── package.json       # Frontend package.json
├── backend/               # Express backend
│   ├── main.js            # Server entry point
│   └── package.json       # Backend package.json
├── package.json           # Root package.json
└── README.md              # This file
```

## API Endpoints
GET /posts - Get all posts

POST /posts - Create a new post

POST /posts/:id/like - Like a post

POST /posts/:id/dislike - Dislike a post

GET /posts/:id/comments - Get post comments

POST /posts/:id/comments - Add comment to post

## Available Scripts
In the project root directory:

- npm run dev - Runs both frontend and backend in development mode

- npm run dev:frontend - Runs only the frontend

- npm run dev:backend - Runs only the backend

In the frontend directory:

- npm run dev - Starts Vite development server

## Demo
Locally be default the application will be available at:

- Frontend: http://localhost:5173

- Backend: http://localhost:5000

Live Demo available at: https://mini-feed-app.vercel.app

## Note
Posts are stored in memory and will reset when the server restarts
