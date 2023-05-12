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
  CardHeader,
  StackDivider,
  HStack,
  Spinner,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTech, newsApiAction } from "../actions/newsActions";
import GridComponent from "../components/Grid";
import dayjs from "dayjs";
import NewsCard from "../components/Grid";
import { Helmet } from "react-helmet-async";

const TopNewsScreen = () => {
  const news_api = useSelector((state) => state.newsApi);
  const { news, loading, error } = news_api;
  const [image, setImage] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const dispatch = useDispatch();
  const fetchData = async () => {
    const data = await axios.get(
      // "https://newsapi.org/v2/top-headlines?country=us&apiKey=9500a99b9aff4259b23997fd87c3a9e0"
      "https://gnews.io/api/v4/top-headlines?apikey=eb4a33f5bcd518f6cf3f8cea8c5f03ef&lang=en"
      // "https://newsdata.io/api/1/news?apikey=pub_187859473556247569161391d633964d2f723&language=en"
    );
    setImage(data.data.articles.map((data) => data.image));
  };
  console.log("asdasds");
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoading1(false);
      }, 1000);
    }
    dispatch(newsApiAction());
  }, []);

  return (
    <>
      <>
        <Helmet>
          <title>Domestic News</title>
          <meta name="description" content="Global news today" />
          <meta
            name="keywords"
            content="World news, latest content, USA, CNN, USTV, US News, News Today, whats news today?"
          />
        </Helmet>

        {news ? (
          <Stack display={{ base: "none", md: "flex" }}>
            <Box style={{ margin: "30px" }}>
              <Skeleton
                gridTemplateColumns="repeat(8,1fr)"
                gridTemplateRows="repeat(8,6.6vh)"
                gap={4}
                // gridAutoFlow="dense"
                // justifyContent="center"
                // py="15px"
                // display={{ lg: "none" }}
                style={{ maxWidth: "90%", margin: "auto" }}
                isLoaded={!loading}
              >
                <Grid
                  // h="500px"
                  gridTemplateColumns="repeat(8,1fr)"
                  gridTemplateRows="repeat(8,6.6vh)"
                  gap={4}
                  // gridAutoFlow="dense"
                  // justifyContent="center"
                  // py="15px"
                  // display={{ lg: "none" }}
                  style={{ maxWidth: "90%", margin: "auto" }}
                >
                  <Box
                    style={{
                      gridRowStart: "1",
                      gridRowEnd: "9",
                      gridColumnStart: "1",
                      gridColumnEnd: "5",
                      position: "relative",
                    }}
                  >
                    <Image
                      className="img"
                      src={image[0]}
                      alt="sorry cant load image"
                    />
                  </Box>

                  <GridItem
                    gridRowEnd={5}
                    gridRowStart={1}
                    gridColumnStart={5}
                    gridColumnEnd={9}
                    style={{ position: "relative" }}
                  >
                    <Image
                      className="img"
                      src={image[1]}
                      alt="sorry cant load image"
                    />
                  </GridItem>

                  <GridItem
                    gridRowEnd={9}
                    gridRowStart={5}
                    gridColumnStart={5}
                    gridColumnEnd={7}
                    style={{ position: "relative" }}
                  >
                    <Image
                      className="img"
                      src={image[2]}
                      alt="sorry cant load image"
                    />
                  </GridItem>
                  <GridItem
                    gridRowEnd={9}
                    gridRowStart={5}
                    gridColumnStart={7}
                    gridColumnEnd={9}
                    style={{ position: "relative" }}
                  >
                    <Image
                      className="img"
                      src={image[3]}
                      alt="sorry cant load image"
                    />
                  </GridItem>
                </Grid>
              </Skeleton>
            </Box>
            <SimpleGrid columns={4} gap={5} style={{ margin: "auto" }}>
              {news?.slice(4).map((item, index) => {
                // let date = item.publishedAt;
                // let newDate = dayjs(date).format("MMMM D, YYYY");

                return <NewsCard news={item} loading={loading1} />;
              })}
            </SimpleGrid>
          </Stack>
        ) : (
          <>
            <Stack py={100} align="center">
              <Heading>Sorry The Limit Has Been Reached</Heading>
            </Stack>
          </>
        )}

        <Stack display={{ md: "none" }}>
          <Box style={{ margin: "30px" }}>
            <Grid
              // h="500px"
              gridTemplateColumns="repeat(8,1fr)"
              gridTemplateRows="repeat(18,6vh)"
              gap={4}
              // gridAutoFlow="dense"
              // justifyContent="center"
              // py="15px"
              // display={{ lg: "none" }}
              style={{ maxWidth: "90%", margin: "auto" }}
            >
              <Box
                style={{
                  gridRowStart: "1",
                  gridRowEnd: "5",
                  gridColumnStart: "1",
                  gridColumnEnd: "9",
                  position: "relative",
                }}
              >
                <Image
                  className="img"
                  src={image[0]}
                  alt="sorry cant load image"
                />
              </Box>
              <GridItem
                gridRowEnd={10}
                gridRowStart={5}
                gridColumnStart={1}
                gridColumnEnd={9}
                style={{ position: "relative" }}
              >
                <Image
                  className="img"
                  src={image[1]}
                  alt="sorry cant load image"
                />
              </GridItem>

              <GridItem
                gridRowEnd={15}
                gridRowStart={10}
                gridColumnStart={1}
                gridColumnEnd={9}
                style={{ position: "relative" }}
              >
                <Image
                  className="img"
                  src={image[2]}
                  alt="sorry cant load image"
                />
              </GridItem>
              <GridItem
                gridRowEnd={20}
                gridRowStart={15}
                gridColumnStart={1}
                gridColumnEnd={9}
                style={{ position: "relative" }}
              >
                <Image
                  className="img"
                  src={image[3]}
                  alt="sorry cant load image"
                />
              </GridItem>
            </Grid>
            <Stack py={20}>
              {news?.slice(4).map((item) => {
                const B = ({ children }) => (
                  <span style={{ fontWeight: "bold" }}>{children}</span>
                );
                const pubDate = dayjs(item.publishedAt).format("MMMM D, YYYY");
                const id = dayjs(item.publishedAt).unix();
                return (
                  <>
                    <Skeleton isLoaded={!loading1}>
                      <Stack py={5} style={{ maxWidth: "90%", margin: "auto" }}>
                        <Card position="relative">
                          <CardBody>
                            <Center>
                              <a href={`/news/${id}`}>
                                <Heading textAlign="center">
                                  {item.title}
                                </Heading>
                              </a>
                            </Center>
                            <a href={`/news/${id}`}>
                              <Image
                                py={5}
                                src={item.image}
                                alt="sorry can't load image"
                              />
                            </a>
                            <Text> {item.description} </Text>
                          </CardBody>
                          <CardFooter>
                            <Text>
                              Published At: <B>{pubDate}</B>
                            </Text>
                          </CardFooter>
                        </Card>
                      </Stack>
                    </Skeleton>
                  </>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </>
    </>
  );
};

export default TopNewsScreen;
