import axios from "axios";

import {
  NEWS_API_FAIL,
  NEWS_API_REQUEST,
  NEWS_API_SUCCESS,
} from "../constants/newsConstants";

export function fetchTech() {
  //return the actual action to do
  return function (dispatch) {
    fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=9500a99b9aff4259b23997fd87c3a9e0"
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        // console.log(res)
        dispatch({ type: NEWS_API_SUCCESS, payload: res.articles });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export const newsApiAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: NEWS_API_REQUEST,
      });

      const res = await axios.get(
        // "https://newsapi.org/v2/top-headlines?country=us&apiKey=9500a99b9aff4259b23997fd87c3a9e0"
        "https://gnews.io/api/v4/top-headlines?apikey=eb4a33f5bcd518f6cf3f8cea8c5f03ef&lang=en"
        // "https://newsdata.io/api/1/news?apikey=pub_187859473556247569161391d633964d2f723&language=en"
      );
      dispatch({ type: NEWS_API_SUCCESS, payload: res.data.articles });
      // res.json().then((res) => {
      //   dispatch({ type: NEWS_API_SUCCESS, payload: res.articles });
      // });
    } catch (error) {
      dispatch({
        type: NEWS_API_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
