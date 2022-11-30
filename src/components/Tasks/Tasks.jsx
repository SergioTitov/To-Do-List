import React, { useState } from "react";

import {
  Box,
  Flex,
  EditableInput,
  Editable,
  EditableTextarea,
  EditablePreview,
  Input,
  Text,
  Button,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon} from '@chakra-ui/icons';
function Tasks({
  todos,
  deleteTodo,
  handleChangeStatus,
  editTodo,
  filterMap,
  filter,
  setEditing,
  isEditing,
}) {
  const [nesText, setNesText] = useState("");
  const [newText, setNewText] = useState(nesText);

  function handleChange(e) {
    setNewText(e.target.value);
  }

  const goOut = (e) => {
    setNewText("");
    setEditing(false);
    setEditing(e.target.blank);
  };

  const GoOutOnEsc = (e) => {
    if (e.keyCode === 27) {
      goOut();
    }
  };

  return (
    <Box>
      {todos.filter(filterMap[filter]).map(({ name, uuid, createdAt, done }) =>
        isEditing === uuid ? (
          <Flex>
            <Box
              bgColor='rgb(47, 79, 79)'
              mb={10}
              display='flex'
              flex-direction='row'
              justify-content='center'
              align-items='center'
              minH={55}
              w={800}
              className='tasks'
              key={uuid}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  editTodo(uuid, newText);
                  setNewText("");
                  setEditing("");
                }}
              >
                <Box>
                  <Editable textAlign='center'>
                    <EditablePreview />
                    <Input
                      as={EditableInput}
                      bgColor='white'
                      autoFocus
                      onKeyUp={GoOutOnEsc}
                      key={uuid}
                      placeholder='edit todo'
                      value={newText}
                      defaultValue={nesText}
                      onChange={handleChange}
                      type='name'
                    />
                    <EditableTextarea />
                  </Editable>
                </Box>
                <Box>
                  <Button type='button' onClick={goOut}>
                    Cancel
                  </Button>
                  <Button type='submit'>Save</Button>
                </Box>
              </form>
            </Box>
          </Flex>
        ) : (
          <Box
            bgColor='rgb(47, 79, 79)'
            mb={5}
            display='flex'
            flexDirection='row'
            justifyContent='center'
            alignItems='center'
            minH={55}
            w={800}
            className='tasks'
            key={uuid}
          >
            <Checkbox
              ml={1}
              type='checkbox'
              colorScheme='green.100'
              uuid={uuid}
              checked={done}
              onChange={() => handleChangeStatus(uuid)}
            ></Checkbox>
            <Box w={630} className='task'>
              <Text
                wordBreak='break-all'
                onDoubleClick={() => {
                  setEditing(uuid);
                  setNesText(name);
                }}
              >
                {name}
              </Text>
            </Box>
            <Box w={90} mt={0} mb={0} className='task-date'>
              <Text>{createdAt.toLocaleString()}</Text>
            </Box>

            <IconButton
              icon={<DeleteIcon />}
              padding={0}
              w='20px'
              h='20px'
              ml='5px'
              className='delete-task'
              onClick={() => {
                deleteTodo(uuid);
              }}
            />
          </Box>
        )
      )}
    </Box>
  );
}

export default Tasks;
