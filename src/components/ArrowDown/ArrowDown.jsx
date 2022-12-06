import React from "react";
// import "./ArrowDown.css";
import { Box, IconButton } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

function ArrowDown({ setSorterBy }) {

  const downHandler = ()=>{
    setSorterBy('desc')
  }

  return (
    <Box>
      <IconButton
        icon={<ArrowDownIcon />}
        className='ArrowDown'
        onClick={downHandler}
      />
    </Box>
  );
}

export default ArrowDown;
