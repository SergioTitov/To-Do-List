import React from "react";
import { Button } from "@chakra-ui/react";

function FilterButton({ name, isPressed, setFilter, setCurrentPage }) {
  const onFirstPage = () => {
    setFilter(name);
    setCurrentPage(1);
  };

  return (
    <Button
      type='button'
      aria-pressed={isPressed}
      onClick={onFirstPage}
      style={{
        backgroundColor: isPressed ? "rgb(47, 79, 79)" : "",
        color: isPressed ? "white" : "",
      }}
    >
      {name}
    </Button>
  );
}

export default FilterButton;
