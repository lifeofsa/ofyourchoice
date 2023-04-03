import React from "react";
import {
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
  Image,
  List,
  Box,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  Spinner,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
const NewsCard = ({ news, loading }) => {
  const B = ({ children }) => (
    <span style={{ fontWeight: "bold" }}>{children}</span>
  );

  let date = news.publishedAt;
  let id = dayjs(news.publishedAt).unix();
  let newDate = dayjs(date).format("MMMM D, YYYY");

  return (
    <>
      <Skeleton isLoaded={!loading}>
        <Card maxW="xs">
          <a href={`/news/${id}`}>
            <CardBody>
              <Image src={news.image} />
              <Stack mt="6" spacing="3">
                <Heading size="md">{news.title}</Heading>
                <Text noOfLines={3}>{news.description}</Text>
              </Stack>
            </CardBody>
          </a>
          <Divider />
          <CardFooter>
            <Text>
              Published At: <B>{newDate}</B>
            </Text>
          </CardFooter>
        </Card>
      </Skeleton>
    </>
  );
};

export default NewsCard;
