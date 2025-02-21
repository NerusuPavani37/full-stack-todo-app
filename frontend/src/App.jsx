import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [tasks, setTasks] = useState([]); // Store tasks here

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  // fecthing tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setTasks(data);
      } else {
        console.error("Error fetching tasks:", data.msg);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  // adding new task
  const addTask = async (title) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });

      const newTask = await res.json();
      console.log("Server Response:", newTask);
      if (res.ok) {
        setTasks([...tasks, newTask]); // ✅ Update state directly
        console.log("Updated Task List:", tasks);
      } else {
        console.error("Error adding task:", newTask.msg);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <Router>
      <div className="container">
        <h1>To-Do App</h1>
        {token ? (
          <>
            <TaskForm addTask={addTask} />
            <TaskList token={token} tasks={tasks} setTasks={setTasks} />
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
        
          <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>    
        )}
      </div>
    </Router>
  );
}

export default App;
