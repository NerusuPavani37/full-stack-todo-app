# Full Stack To-Do App

## Overview
This is a Full Stack To-Do Application that allows users to create, manage, and delete tasks with subtasks. Users can sign up, log in, and interact with their tasks securely.

## Features
- User authentication (Signup & Login)
- Create, update, and delete tasks
- Add and remove subtasks
- Secure backend API with JWT authentication
- Responsive frontend built with React

## Technologies Used
### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Installation & Setup
### 1. Clone the Repository
git clone https://github.com/NerusuPavani37/full-stack-todo-app
cd your-repo

### 2. Setup Backend
cd backend
npm install
Create a `.env` file in the backend folder and add your environment variables (MongoDB URI, JWT secret, etc.).
npm run server

### 3. Setup Frontend
cd frontend
npm install
npm run dev

## Usage
- Open `http://localhost:5173/` (or the given port) in your browser.
- Sign up or log in to access the To-Do app.
- Add tasks and manage subtasks.

## API Endpoints
| Method | Endpoint           | Description                 |
|--------|--------------------|-----------------------------|
| POST   | /api/users/signup  | User registration           |
| POST   | /api/users/login   | User login                  |
| GET    | /api/todos         | Get all tasks               |
| POST   | /api/todos         | Add a new task              |
| DELETE | /api/todos/:id     | Delete a task               |
| POST   | /api/todos/:id/subtask | Add a subtask           |
| DELETE | /api/todos/:id/subtask/:subId | Delete a subtask |