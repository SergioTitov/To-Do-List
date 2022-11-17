import React from "react";
import "./Tasks.css";

function Tasks({ todos, deleteTodo }) {
  return (
    <div>
      {todos.map(({ text, id }) => (
        <div className='tasks' key={id}>
          <input className='checkbox' type='checkbox' />
          <div className='task'>
            <p>{text}</p>
          </div>
          <div className=''>14/11/2022</div>
          <button
            className='delete-task'
            onClick={() => {
              deleteTodo(id);
            }}
          ></button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
