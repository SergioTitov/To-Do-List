import React from "react";
import { Box, Button } from "@chakra-ui/react";

function FilterButton({ name, isPressed, setFilter, setCurrentPage }) {
  const onFirstPage = (e) => {
    // setFilter(name);
    // setCurrentPage(1);
    
    if (e.target.innerText === 'Done') {
      setFilter('done')
      setCurrentPage(1);
    } else if (e.target.innerText === 'Undone') {
      setFilter('undone')
      setCurrentPage(1);
    } else {
      setFilter('')
      setCurrentPage(1);
    }
  };

  return (
    <Box>
      <Button
        padding={1}
        mr={1}
        type='button'
        aria-pressed={isPressed}
        onClick={onFirstPage}
        className='adafa'
        style={{
          backgroundColor: isPressed ? "rgb(47, 79, 79)" : "",
          color: isPressed ? "white" : "",
        }}
      >
        {name}
      </Button>
    </Box>
  );
}

export default FilterButton;
