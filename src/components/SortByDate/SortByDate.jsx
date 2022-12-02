import React from "react";
// import "./SortByDate.css";
import { Box, Text } from "@chakra-ui/react";

function SortByDate(dateUp, dateDown) {
  return (
    <Box display='flex' flexDirection='column' mr={1}>
      <Text h='30px' color='white' className='Sort-by-date'>
        Sort By Date
      </Text>
    </Box>
  );
}

export default SortByDate;
