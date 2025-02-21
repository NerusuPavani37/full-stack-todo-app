const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();
const userRoutes = require("./routes/userRoutes");
const todoRoutes = require("./routes/todoRoutes");
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5174",  // Change this to production domain after deployment
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
