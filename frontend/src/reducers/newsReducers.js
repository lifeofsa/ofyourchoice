import {
  NEWS_API_FAIL,
  NEWS_API_REQUEST,
  NEWS_API_SUCCESS,
} from "../constants/newsConstants";

export const newsApiReducer = (state = { news: [] }, action) => {
  switch (action.type) {
    case NEWS_API_REQUEST:
      return {
        loading: true,
        news: [],
      };
    case NEWS_API_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.payload,
      };
    case NEWS_API_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// const fetchTech = (
//   state = {
//     techNews: [],
//   },
//   action
// ) => {
//   if (action.type === "FETCH_TECH") {
//     state = { ...state, techNews: action.payload };
//   }

//   return state;
// };
// export default fetchTech;
