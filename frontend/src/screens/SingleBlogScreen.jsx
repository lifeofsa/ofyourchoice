import {
  Box,
  Center,
  Container,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { blogGetByIdAction } from "../actions/blogsAction";

const SingleBlogScreen = () => {
  const dispatch = useDispatch();
  const match = useParams();
  const blogId = match.id;
  const fetchBlogById = useSelector((state) => state.userBlogFetchById);
  const { blog, loading } = fetchBlogById;

  useEffect(() => {
    dispatch(blogGetByIdAction(blogId));
  }, []);

  return (
    <>
      {loading ? (
        <Stack py={20} align="center">
          <Spinner size="xl" />
        </Stack>
      ) : (
        <Stack py={50} align="center">
          <Helmet>
            <title>{blog?.title}</title>
            <meta name="description" content={blog?.description} />
          </Helmet>
          <Center>
            <Text fontWeight="bold" textColor="#aeacac">
              {dayjs(blog?.createdAt).format("MMM DD, YYYY")}
            </Text>
          </Center>
          <Center>
            <Text
              textAlign="center"
              fontSize="30"
              style={{ fontWeight: "bold" }}
            >
              {blog?.title}
            </Text>
          </Center>
          <Box position="relative">
            <Image className="imgg" src={blog?.image} />
            <Container fontSize="17" maxW={700} py={50}>
              {blog?.description?.split("\n")?.map((str) => (
                <Text>
                  {str} <br />
                </Text>
              ))}
            </Container>
            {blog?.extra?.map((ex) => (
              <Container maxW={700} py={5}>
                <Text fontSize="2xl" fontWeight="bold">
                  {ex.subHeading}
                </Text>
                {ex?.content.split("\n").map((str) => (
                  <Text>
                    {str} <br />{" "}
                  </Text>
                ))}
                <Image py={5} src={ex.image} />
              </Container>
            ))}
          </Box>
        </Stack>
      )}
    </>
  );
};

export default SingleBlogScreen;
