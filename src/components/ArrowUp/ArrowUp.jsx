import React from "react";
// import "./ArrowUp.css";
import { Box, IconButton } from "@chakra-ui/react";
import { ArrowUpIcon } from "@chakra-ui/icons";



function ArrowUp({ setSorterBy }) {


  const upHamdler = ()=>{
    setSorterBy('asc')
  }
  
  
  return (
    <Box>
      <IconButton
      mr={1} ml={1}
        icon={<ArrowUpIcon />}
        // className='ArrowUp'
        onClick={upHamdler}
      />
    </Box>
  );
}

export default ArrowUp;
