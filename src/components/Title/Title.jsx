import React from "react";
import { Box } from "@chakra-ui/react";

function Title() {
  return (
    <Box
      className='title'
      color='white'
      mt='40px'
      mb='30px'
      fontSize={32}
      fontWeight='600'
      textTransform='uppercase'
      textAlign='center'
    >
      To Do List
    </Box>
  );
}

export default Title;
