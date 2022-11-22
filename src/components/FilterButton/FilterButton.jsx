import React from "react";

function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      type='button'
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
      style={{
        backgroundColor: isPressed ? "rgb(47, 79, 79)" : "",
        color: isPressed ? "white" : "",
      }}
    >
      {name}
    </button>
  );
}

export default FilterButton;
