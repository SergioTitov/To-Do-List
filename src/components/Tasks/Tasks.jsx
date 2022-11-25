import React, { useState } from "react";
import "./Tasks.css";

function Tasks({
  todos,
  deleteTodo,
  handleChangeStatus,
  editTodo,
  filterMap,
  filter,
  setEditing,
  isEditing,
}) {
  const [newText, setNewText] = useState("");

  function handleChange(e) {
    setNewText(e.target.value);
  }

  const notNewText = () => {
    setNewText("");
    setEditing(false);
  };

  return (
    <div>
      {todos.filter(filterMap[filter]).map(({ text, id, date, isDone }) =>
        isEditing === id ? (
          <div className='tasks' key={id}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editTodo(id, newText);
                setNewText("");
                setEditing("");
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
                <button type='button' onClick={notNewText}>
                  Cancel
                </button>
                <button type='submit'>Save</button>
              </div>
            </form>
          </div>
        ) : (
          <div className='tasks' key={id}>
            <div className='check'>
              <input
                id={id}
                className='checkbox'
                type='checkbox'
                checked={isDone}
                onChange={() => handleChangeStatus(id)}
              />
            </div>
            <div className='task'>
              <span
                onDoubleClick={() => {
                  setEditing(id);
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
