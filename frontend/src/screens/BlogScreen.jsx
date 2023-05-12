import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  useBreakpointValue,
  Image,
  Img,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  WrapItem,
  Spinner,
} from "@chakra-ui/react";
import ReactSlider from "react-slick";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  BLOGS_RESET_BYID,
  BLOGS_RESET_CREATE,
} from "../constants/BlogsConstants";
import { blogsActionPost, getAllBlogsAction } from "../actions/blogsAction";
import dayjs from "dayjs";
import { Helmet } from "react-helmet-async";
const BlogScreen = () => {
  const [slider, setSlider] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userBlog = useSelector((state) => state.userBlog);
  const { success: successCreate, blogs: createBlog } = userBlog;

  const getBlogs = useSelector((state) => state.getBlogs);
  const { blogs, loading } = getBlogs;

  const history = useNavigate();
  const dispatch = useDispatch();
  // const shuffle = (arr) => arr?.sort(() => Math.random() - 0.5);

  // const newList = shuffle(blogs);

  // console.log(newList, "asdasd");
  useEffect(
    () => {
      dispatch({ type: BLOGS_RESET_CREATE });
      dispatch({ type: BLOGS_RESET_BYID });
      if (successCreate) {
        history(`/blogform/${createBlog.id}/edit`);
      }
      dispatch(getAllBlogsAction());
    },
    [dispatch, history, successCreate] /* Render only one time */
  );
  const postHandler = () => {
    dispatch(blogsActionPost());
  };
  const imagesArray = [
    {
      title: "Why You Should Always Keep Learning",
      src: "https://images.unsplash.com/photo-1534612368275-e4cfd0f21b2d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&w=960",
    },
    {
      title: "When Your Company Starts Growing...",
      src: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&w=960",
    },
    {
      title: "Working from Home",
      src: "https://images.unsplash.com/photo-1524508762098-fd966ffb6ef9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&w=960",
    },
    {
      title: "Is San Francisco Mandatory for Your Next Big Idea?",
      src: "https://images.unsplash.com/photo-1509817312789-ad718caba3b2?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&w=960",
    },
    {
      title: "I Failed as a Designer at a Startup",
      src: "https://images.unsplash.com/photo-1498075702571-ecb018f3752d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ&w=750",
    },
  ];
  function renderArrow(children) {
    return (
      <div className="slider-arrow">
        <IconButton
          className="arrow-btn prev"
          isRound={true}
          onClick={() => slider.slickPrev()}
          icon={<ArrowBackIcon />}
          bg={children}
          boxShadow="0 0 5px rgba(0,0,0,.2)"
        />

        <IconButton
          className="arrow-btn next"
          isRound={true}
          onClick={() => slider.slickNext()}
          icon={<ArrowForwardIcon />}
          bg={children}
          boxShadow="0 0 5px rgba(0,0,0,.2)"
        />
      </div>
    );
  }
  function renderArrow2(children) {
    return (
      <div className="slider-arrow">
        <IconButton
          className="arrow-btn prev"
          isRound={true}
          onClick={() => slider2.slickPrev()}
          icon={<ArrowBackIcon />}
          bg={children}
          boxShadow="0 0 5px rgba(0,0,0,.2)"
        />

        <IconButton
          className="arrow-btn next"
          isRound={true}
          onClick={() => slider2.slickNext()}
          icon={<ArrowForwardIcon />}
          bg={children}
          boxShadow="0 0 5px rgba(0,0,0,.2)"
        />
      </div>
    );
  }

  const setting = {
    focusOnSelect: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 200,
    arrows: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          // infinite: true,
          // dots: true,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Stack
        display={{ base: "none", lg: "flex" }}
        py={20}
        style={{ maxWidth: "70%", margin: "auto" }}
      >
        {userInfo?.admin && (
          <WrapItem py="40px" alignSelf="center">
            <Button onClick={postHandler}>Create A Blog</Button>
          </WrapItem>
        )}
        <Box position={"relative"} height={"500px"}>
          {renderArrow(useColorModeValue("white", "#2d3748"))}
          {loading ? (
            <Stack py={100} align="center">
              <Spinner size="xl" />
            </Stack>
          ) : (
            <ReactSlider {...setting} ref={(slider) => setSlider(slider)}>
              {blogs?.map((blog, key) => (
                <>
                  <a href={`/blognews/${blog.id}`}>
                    <Box>
                      <Flex blockSize="290px">
                        <Image
                          objectFit="cover"
                          fit="cover"
                          src={blog.image}
                          alt="Sorry can't load Image"
                        />
                      </Flex>

                      <Heading
                        style={{ fontWeight: "bold" }}
                        py={5}
                        as=""
                        size="md"
                      >
                        {blog.title}
                      </Heading>
                      <Text fontSize="sm" color="#aeacac">
                        {dayjs(blog.createdAt).format("MMM DD, YYYY")}
                      </Text>
                    </Box>
                  </a>
                </>
              ))}
              {/* {imagesArray.map((img, key) => (
              <Box key={key}>
                <Flex blockSize="290px">
                  <Image
                    objectFit="cover"
                    fit="cover"
                    src={img.src}
                    alt="Sorry can't load Image"
                  />
                </Flex>

                <Heading style={{ fontWeight: "bold" }} py={5} as="" size="md">
                  {img.title}
                </Heading>
                <Text fontSize="sm" color="#aaa">
                  Feb 27, 2019
                </Text>
              </Box>
            ))} */}
            </ReactSlider>
          )}
        </Box>
        {blogs?.map((blog) => (
          <>
            <Helmet>
              <title>Of Your Choice | Latest Blogs</title>
              <meta
                name="description"
                content="latest blogs and latest news ofyourchoice"
              />
            </Helmet>
            <Stack display="grid" justifyItems="center">
              <a href={`/blognews/${blog?.id}`}>
                <Image src={blog.image} alt="Sorry can't load Image" />
              </a>

              <Flex py={10}>
                <Container maxW="3xl">
                  <Text noOfLines={4} maxWidth={"100%"}>
                    <a href={`/blognews/${blog?.id}`}>
                      <Heading py="10px">{blog.title}</Heading>
                    </a>
                    {blog.description}
                  </Text>
                </Container>
              </Flex>
            </Stack>
          </>
        ))}
      </Stack>

      <Stack display={{ lg: "none" }} py={10} style={{ margin: "auto" }}>
        {userInfo?.admin && (
          <Stack>
            <WrapItem py="40px" alignSelf="center">
              <Button onClick={postHandler}>Create A Blog</Button>
            </WrapItem>
          </Stack>
        )}
        <Box position={"relative"} height={"600px"}>
          {renderArrow2(useColorModeValue("white", "#2d3748"))}
          {loading ? (
            <Stack py={100} align="center">
              <Spinner size="xl" />
            </Stack>
          ) : (
            <ReactSlider {...setting} ref={(slider) => setSlider2(slider)}>
              {blogs?.map((blog, key) => (
                <>
                  <a href={`/blognews/${blog.id}`}>
                    <Box>
                      <Flex blockSize="290px">
                        <Image
                          objectFit="cover"
                          fit="cover"
                          src={blog.image}
                          alt="Sorry can't load Image"
                        />
                      </Flex>

                      <Heading
                        style={{ fontWeight: "bold" }}
                        py={5}
                        as=""
                        size="md"
                      >
                        {blog.title}
                      </Heading>
                      <Text fontSize="sm" color="#aeacac">
                        {dayjs(blog.createdAt).format("MMM DD, YYYY")}
                      </Text>
                    </Box>
                  </a>
                </>
              ))}
            </ReactSlider>
          )}
        </Box>
        {blogs?.map((blog) => (
          <>
            <Stack
              style={{ maxWidth: "90%", margin: "auto" }}
              display="grid"
              justifyItems="center"
            >
              <a href={`/blognews/${blog?.id}`}>
                <Image src={blog.image} alt="Sorry can't load Image" />
              </a>

              <Flex py={10}>
                <Container maxW="3xl">
                  <Text noOfLines={4} maxWidth={"100%"}>
                    <a href={`/blognews/${blog?.id}`}>
                      <Heading py="10px">{blog.title}</Heading>
                    </a>
                    {blog.description}
                  </Text>
                </Container>
              </Flex>
            </Stack>
          </>
        ))}
      </Stack>
    </>
  );
};

export default BlogScreen;
