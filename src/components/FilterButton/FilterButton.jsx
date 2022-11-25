import React from "react";

function FilterButton({ name, isPressed, setFilter, setCurrentPage }) {
  const onFirstPage = () => {
    setFilter(name);
    setCurrentPage(1);
  };

  return (
    <button
      type='button'
      aria-pressed={isPressed}
      onClick={onFirstPage}
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
