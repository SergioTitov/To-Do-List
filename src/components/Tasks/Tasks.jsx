import React from "react";
import "./Tasks.css";

function Tasks() {
  return (
    <div className='tasks'>
      <div>
        <input className='checkbox' type='checkbox' />
      </div>
      <div className='task'>
        <p>Go to the mall</p>
      </div>
      <div className=''>14/11/2022</div>
      <div className='trash'>
        <button className='delete-task'></button>
      </div>
    </div>
  );
}

export default Tasks;
