Full Stack To-Do App - Backend API

This project provides a REST API for a To-Do application with User Authentication and Todo Management.

📌 Technologies Used

Node.js + Express.js - Backend framework

MongoDB + Mongoose - Database

bcryptjs - Password hashing

jsonwebtoken (JWT) - Authentication

dotenv - Environment variables

cors - Cross-origin requests


🛠 API Endpoints

🔹 User Authentication APIs

1️⃣ User Signup (Register a new user)

Endpoint: POST /api/users/signup 
Body:{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "mypassword"
}

Response:{
  "msg": "User Registered Successfully"
}

2️⃣ User Login (Get access token)

Endpoint: POST /api/users/login 
Body:{
  "email": "johndoe@example.com",
  "password": "mypassword"
}

Response:{
  "token": "your_jwt_token",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}

🔹 To-Do APIs (Requires Authentication)

🔒 You must include the token in the request header:

Authorization: Bearer your_jwt_token

3️⃣ Create a To-Do

Endpoint: POST /api/todos
Headers:Authorization: Bearer your_jwt_token

Body:{
  "title": "Buy groceries",
  "completed": false
}

Response:{
  "msg": "Todo created successfully",
  "todo": {
    "id": "todo_id",
    "title": "Buy groceries",
    "completed": false,
    "user": "user_id"
  }
}

4️⃣ Get All To-Dos (For Logged-in User)

Endpoint: GET /api/todos
Headers:Authorization: Bearer your_jwt_token

Response:[
  {
    "id": "todo_id",
    "title": "Buy groceries",
    "completed": false,
    "user": "user_id"
  }
]

📌 Notes

Authentication: Every request (except signup/login) must include a valid token in the Authorization header.

Database: The app connects to MongoDB via MONGO_URI in .env.

Error Handling: If something goes wrong, the API returns a JSON error message.