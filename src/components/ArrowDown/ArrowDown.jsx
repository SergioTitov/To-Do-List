import React from "react";
// import "./ArrowDown.css";
import { Box, IconButton } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

function ArrowDown({ dateDown }) {
  return (
    <Box>
      <IconButton
        icon={<ArrowDownIcon />}
        className='ArrowDown'
        onClick={() => {
          dateDown();
        }}
      />
    </Box>
  );
}

export default ArrowDown;
