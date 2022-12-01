import React, { useEffect } from "react";
// import "./Pages.css";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon,ArrowRightIcon } from "@chakra-ui/icons";

function Pages({ itemPerPage, totaItems, paginate, currentPage }) {
  const pageNumbers = [];
  useEffect(() => {});
  for (let i = 1; i <= Math.ceil(totaItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box
      display='flex'
      w={["xs", "xs", "sm", "md", "2xl", "3xl"]}
      justifyContent='space-between'
      // className='pages'
    >
      {pageNumbers.length === 1 ? (
        <Button
          background='transparent'
          border='none !important'
          fontSize='0'
          // className='pages_left_notActive'
        />
      ) : (
        <IconButton
        icon={<ArrowLeftIcon />}
          // className='page_left'
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage <= 1}
        />
      )}
      {pageNumbers.map((number) => (
        <Button
          style={{
            color: currentPage === number ? "white" : "",
            backgroundColor: currentPage === number ? "rgb(47, 79, 79)" : "",
          }}
          onClick={() => paginate(number)}
          key={number}
          // className='page'
        >
          {number}
        </Button>
      ))}

      {pageNumbers.length === 1 ? (
        <Button
          background='transparent'
          border='none !important'
          fontSize='0'
          // className='pages_left_notActive'
        />
      ) : (
        <IconButton
        icon={<ArrowRightIcon />}
          // className='page_right'
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage >= pageNumbers.length}
        />
      )}
    </Box>
  );
}

export default Pages;
