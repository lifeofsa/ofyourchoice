import React, { useState } from "react";
import {
  Input,
  FormControl,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  Center,
  Box,
  Heading,
  Stack,
  FormLabel,
  InputLeftElement,
  useColorMode,
  useColorModeValue,
  Link,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { BsFillPersonFill } from "react-icons/bs";

const RegisterScreen = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    // <FormControl>
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"lg"}
        p={8}
      >
        <Box textAlign="center">
          <Heading>REGISTER</Heading>
        </Box>
        {/* <Center> */}
        <Box my={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <Input type="Text" placeholder="Full Name" />
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={BsFillPersonFill} />}
                  py="1.3rem"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <Input type="Email" placeholder="Email" />
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon />}
                  py="1.3rem"
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  // py={50}
                  pointerEvents="none"
                  children={<LockIcon />}
                />
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Re-Enter Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  // py={50}
                  pointerEvents="none"
                  children={<LockIcon />}
                />
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter Password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {/* <Stack direction="row" justifyContent="space-between">
              <Checkbox>Remember me</Checkbox>
              <Link>Forgot Password?</Link>
            </Stack> */}
            <Stack py={5}>
              <Button> Register</Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Flex>

    // </FormControl>
  );
};

export default RegisterScreen;
