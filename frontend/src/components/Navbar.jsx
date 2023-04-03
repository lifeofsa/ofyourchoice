import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Stack,
  Text,
  MenuButton,
  Menu,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import theme from "../constants/theme";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  CloseIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Link as LinkReact } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../actions/userActions";
const Navbar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const Links = [
    {
      name: "Home",
      to: "/",
    },
    {
      name: "Global News",
      to: "/topnews",
    },
    {
      name: "Domestic News",
      to: "/domesticnews",
    },
  ];
  const NavLink = ({ children }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.600"),
      }}
    >
      {children}
    </Link>
  );
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.700")}
        w="100%"
        px={4}
        // color={theme.config.initialColorMode == "black" ? "black" : "white"}
      >
        <Flex h={16} alignItems={"center"} justifyContent="space-between">
          <IconButton
            size={"lg"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={isOpen ? onClose : onOpen}
            display={{ lg: "none" }}
          />
          <HStack spacing={8} alignItems="center">
            <Box>Logo</Box>
            <HStack as="nav" spacing={4} display={{ base: "none", lg: "flex" }}>
              {Links.map((link) => (
                // <NavLink key={link}>
                <LinkReact to={link.to}>
                  <NavLink key={link.name}>{link.name}</NavLink>
                </LinkReact>
                // {/* </NavLink> */}
              ))}
            </HStack>
          </HStack>

          <Flex gap={1}>
            {userInfo ? (
              <Menu isLazy>
                <MenuButton fontSize="18" py={1} px={5}>
                  {`Welcome ${userInfo.name}`} <ChevronDownIcon />
                </MenuButton>
                <MenuList>
                  <a href="/bloglist">
                    <MenuItem> Blogs List </MenuItem>
                  </a>
                  <MenuItem onClick={() => logoutHandler()}> Logout </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <ButtonGroup px={5}>
                <LinkReact to="/login">
                  <Button>Login</Button>
                </LinkReact>
                <LinkReact to="/register">
                  <Button>Register</Button>
                </LinkReact>
              </ButtonGroup>
            )}

            <Button onClick={toggleColorMode}>
              {colorMode == "light" ? <MoonIcon color="black" /> : <SunIcon />}
            </Button>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ lg: "none" }}>
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <LinkReact to={link.to}>
                  <NavLink key={link}>{link.name}</NavLink>
                </LinkReact>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
