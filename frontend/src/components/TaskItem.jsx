import React from "react";

const TaskItem = ({task})=>{
  return( 
    <li>
      <input type="checkbox" onChange={handleCheck} />
      {task.title}
    </li>
  );
};

export default TaskItem;