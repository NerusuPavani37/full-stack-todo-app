import React, {useState} from "react";

const TaskForm = ({addTask})=>{
  const [taskTitle, setTaskTitle] = useState("");

  const handleChange = (e) => {
    setTaskTitle(e.target.value); 
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!taskTitle.trim())return ;
    console.log("Adding Task:", taskTitle); 
    addTask(taskTitle);
    setTaskTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={taskTitle}
          onChange={handleChange}
          placeholder="Add a task..."
        />
        <button className="task-btn" type="submit">Add Task</button>  
        </div>
    </form>
  );
}

export default TaskForm;
