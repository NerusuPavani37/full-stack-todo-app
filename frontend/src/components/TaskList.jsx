import React, { useState } from "react";

const API_URL = "http://localhost:5000/api/todos";

const TaskList = ({ token, tasks, setTasks }) => {
  const [subtaskInput, setSubtaskInput] = useState({});

  //marking a task as completed -->deletes the task
  const handleTaskComplete = async (taskId) => {
    try {
      const res = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task) => task._id !== taskId)
        );
      } else {
        console.error("Error deleting task");
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  //adding a subtask to a task
  const handleAddSubtask = async (taskId) => {
    if (!subtaskInput[taskId]) return;

    try {
      const res = await fetch(`${API_URL}/${taskId}/subtask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: subtaskInput[taskId] }),
      });

      const updatedTask = await res.json();
      if (res.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        setSubtaskInput({ ...subtaskInput, [taskId]: "" });
      } else {
        console.error("Error adding subtask:", updatedTask.msg);
      }
    } catch (error) {
      console.error("Server error:", error);
    }
  };

  //deleting a subtask
const handleSubtaskComplete = async (taskId, subtaskId) => {
  try {
    const res = await fetch(`${API_URL}/${taskId}/subtask/${subtaskId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId
            ? {
                ...task,
                subtasks: task.subtasks.filter((subtask) => subtask._id !== subtaskId),
              }
            : task
        )
      );
    } else {
      console.error("Error deleting subtask");
    }
  } catch (error) {
    console.error("Server error:", error);
  }
};

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <input
            type="checkbox"
            onChange={() => handleTaskComplete(task._id)}
          />
          <span>{task.title}</span>
         

          {/* Display Subtasks */}
          <ul>
            {task.subtasks.map((subtask) => (
              <li className="subtasks-container" key={subtask._id}>
                <input
                  type="checkbox"
                  onChange={() => handleSubtaskComplete(task._id, subtask._id)} 
                />
                {subtask.title}
              </li>
            ))}
          </ul>

          {/* Input Field to Add Subtasks */}
          <div className ="subtask-input" >
          <input
            
            type="text"
            placeholder="Add subtask..."
            value={subtaskInput[task._id] || ""}
            onChange={(e) =>
              setSubtaskInput({ ...subtaskInput, [task._id]: e.target.value })
            }
          />
          <button className="subtask-btn" onClick={() => handleAddSubtask(task._id)}>
            Add Subtask
          </button>
          </div>
         
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
