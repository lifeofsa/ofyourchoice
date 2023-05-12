import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { newsApiAction } from "../actions/newsActions";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Helmet } from "react-helmet-async";
const SingleNewsScreen = () => {
  const match = useParams();
  const [newsArray, setNewsArray] = useState([]);
  const [newsDomesticArray, setNewsDomesticArray] = useState([]);
  //   const [foundArray, setFoundArray] = useState([]);
  dayjs.extend(utc);
  const dispatch = useDispatch();
  const fetchData = async () => {
    const data = await axios.get(
      // "https://newsapi.org/v2/top-headlines?country=us&apiKey=9500a99b9aff4259b23997fd87c3a9e0"
      "https://gnews.io/api/v4/top-headlines?apikey=eb4a33f5bcd518f6cf3f8cea8c5f03ef&lang=en"
      // "https://newsdata.io/api/1/news?apikey=pub_187859473556247569161391d633964d2f723&language=en"
    );
    setNewsArray(data.data.articles);
  };
  const fetchDomesticData = async () => {
    const data = await axios.get(
      // "https://newsapi.org/v2/top-headlines?country=us&apiKey=9500a99b9aff4259b23997fd87c3a9e0"
      "https://gnews.io/api/v4/top-headlines?apikey=eb4a33f5bcd518f6cf3f8cea8c5f03ef&country=pk"
      // "https://newsdata.io/api/1/news?apikey=pub_187859473556247569161391d633964d2f723&language=en"
    );
    setNewsDomesticArray(data.data.articles);
  };
  //   console.log(dayjs().format("YYYY-MM-DD HH:mm:ss"));
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchDomesticData();
  }, []);

  const found = newsArray.find((news) => {
    // console.log(match.id);
    // let utcId = dayjs.unix(match.id).format("YYYY-MM-DD HH:mm:ss");
    let utcId = dayjs.unix(match.id).utc().format();
    console.log(utcId);
    return news.publishedAt === utcId;
  });
  const found2 = newsDomesticArray.find((news) => {
    // console.log(match.id);
    // let utcId = dayjs.unix(match.id).format("YYYY-MM-DD HH:mm:ss");
    let utcId = dayjs.unix(match.id).utc().format();
    console.log(utcId, "utcID");
    return news.publishedAt === utcId;
  });

  return (
    <div>
      <Helmet>
        <title>{found2 ? found2?.title : "Of Your Choice"}</title>
        <meta name="description" content={found2?.description} />
      </Helmet>
      <Helmet>
        <title>{found ? found?.title : "Of Your Choice"}</title>
        <meta name="description" content={found?.description} />
      </Helmet>
      {found ? (
        <Stack py={50} align="center">
          <Center>
            <Text
              textAlign="center"
              fontSize="30"
              style={{ fontWeight: "bold" }}
            >
              {found?.title}
            </Text>
          </Center>
          <Box position="relative">
            <Image className="imgg" src={found?.image} />
            <Container fontSize="17" maxW={1200}>
              <Text>{found?.description}</Text>
              <Text py={4}>{found?.content}</Text>
            </Container>
          </Box>
        </Stack>
      ) : (
        found2 && (
          <>
            <Stack py={50} align="center">
              <Heading textAlign="center">{found2.title}</Heading>
              <Box position="relative">
                <Image className="imgg" src={found2.image} />
                <Container maxW={750}>
                  <Text>{found2.description}</Text>
                  <Text>{found2.content}</Text>
                </Container>
              </Box>
            </Stack>
          </>
        )
      )}
    </div>
  );
};

export default SingleNewsScreen;
