import React, { useState } from "react";
import "./Tasks.css";

function Tasks({
  todos,
  deleteTodo,
  handleChangeStatus,
  editTodo,
  filterMap,
  filter,
}) {
  const [isEditing, setEditing] = useState(false);
  const [newText, setNewText] = useState("");

  function handleChange(e) {
    setNewText(e.target.value);
  }

  return (
    <div>
      {todos.filter(filterMap[filter]).map(({ text, id, date, isDone }) =>
        isEditing ? (
          <div className='tasks' key={id}>
            <form
              onSubmit={(e) => {
                console.log(id);
                e.preventDefault();
                editTodo(id, newText);
                setNewText("");
                setEditing(false);
              }}
            >
              <div>
                <input
                  key={id}
                  placeholder='edit todo'
                  value={newText}
                  onChange={handleChange}
                  type='text'
                />
              </div>
              <div>
                <button type='button' onClick={() => setEditing(false)}>
                  Cancel
                </button>
                <button type='submit'>Save</button>
              </div>
            </form>
          </div>
        ) : (
          <div className='tasks' key={id}>
            <input
              id={id}
              className='checkbox'
              type='checkbox'
              checked={isDone}
              onChange={() => handleChangeStatus(id)}
            />
            <div className='task'>
              <span
                onDoubleClick={() => {
                  // console.log(id);
                  setEditing(true);
                }}
              >
                {text}
              </span>
            </div>
            <div className='task-date'>
              <span>{date.toLocaleString()}</span>
            </div>
            <button
              className='delete-task'
              onClick={() => {
                deleteTodo(id);
              }}
            />
          </div>
        )
      )}
    </div>
  );
}

export default Tasks;
