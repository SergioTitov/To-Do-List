import React from "react";

function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      type="button"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  );
}

export default FilterButton;
