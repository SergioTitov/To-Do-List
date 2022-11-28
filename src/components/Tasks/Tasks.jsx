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
      {todos.filter(filterMap[filter]).map(({ name, uuid, date, done }) =>
        isEditing === uuid ? (
          <div className='tasks' key={uuid}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editTodo(uuid, newText);
                setNewText("");
                setEditing("");
              }}
            >
              <div>
                <input
                  key={uuid}
                  placeholder='edit todo'
                  value={newText}
                  onChange={handleChange}
                  type='name'
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
          <div className='tasks' key={uuid}>
            <div className='check'>
              <input
                uuid={uuid}
                className='checkbox'
                type='checkbox'
                checked={done}
                onChange={() => handleChangeStatus(uuid)}
              />
            </div>
            <div className='task'>
              <span
                onDoubleClick={() => {
                  setEditing(uuid);
                }}
              >
                {name}
              </span>
            </div>
            <div className='task-date'>
              <span>{date.toLocaleString()}</span>
            </div>
            <button
              className='delete-task'
              onClick={() => {
                deleteTodo(uuid);
              }}
            />
          </div>
        )
      )}
    </div>
  );
}

export default Tasks;
