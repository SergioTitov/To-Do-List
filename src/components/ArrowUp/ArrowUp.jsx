import React from "react";
// import "./ArrowUp.css";
import { Box, IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";

function ArrowUp({ dateUp }) {
  return (
    <Box>
      <IconButton
      mr={1} ml={1}
        icon={<ArrowUpIcon />}
        // className='ArrowUp'
        onClick={() => {
          dateUp();
        }}
      />
    </Box>
  );
}

export default ArrowUp;
