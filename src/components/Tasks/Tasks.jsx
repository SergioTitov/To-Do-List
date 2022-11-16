import React from "react";
import "./Tasks.css";

function Tasks() {
  return (
    <div className='tasks'>
      <input className='checkbox' type='checkbox' />

      <div className='task'>
        <p>Go to the mall</p>
      </div>
      <div className=''>14/11/2022</div>

      <button className='delete-task'></button>
    </div>
  );
}

export default Tasks;
