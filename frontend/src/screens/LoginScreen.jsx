import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@chakra-ui/react";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { userLoginAction } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { Message, Error } from "../components/Message";
const LoginScreen = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleClick = () => setShow(!show);
  const history = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history("/");
    } else {
      history("/login");
    }
  }, [userInfo, message]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setMessage("Please fill all of the field first");
    } else {
      setMessage("");
      dispatch(userLoginAction(email, password));
    }
  };

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
          <Heading>LOGIN</Heading>
        </Box>
        {/* <Center> */}
        <Box my={4}>
          {message && <Message status="error">{message}</Message>}
          {error && <Error status="error">{error}</Error>}

          <form onSubmit={submitHandler}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <Input
                    value={email}
                    type="Email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
                    value={password}
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack direction="row" justifyContent="space-between">
                <Checkbox>Remember me</Checkbox>
                <Link>Forgot Password?</Link>
              </Stack>
              <Stack py={5}>
                <Button type="submit"> Sign In</Button>
              </Stack>
            </Stack>
          </form>
        </Box>

        {/* </Center> */}
      </Box>
    </Flex>

    // </FormControl>
  );
};

export default LoginScreen;
