import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { blogActionUpdate } from "./actions/blogsAction";
import {
  blogDeleteReducer,
  blogsGetAllReducer,
  blogsPostReducer,
  blogUpdateByIdReducer,
  extraDeleteReducer,
  extraPutReducer,
  getBlogbyIdReducer,
  getBlogExtrabyIdReducer,
} from "./reducers/blogsReducer";
import fetchTech, { newsApiReducer } from "./reducers/newsReducers";
import { userLoginReducers } from "./reducers/userReducers";

const reducer = combineReducers({
  userLogin: userLoginReducers,
  getBlogs: blogsGetAllReducer,
  newsApi: newsApiReducer,
  userBlog: blogsPostReducer,
  userBlogUpdate: blogUpdateByIdReducer,
  userBlogFetchById: getBlogbyIdReducer,
  userBlogExtraById: getBlogExtrabyIdReducer,
  extraUpdatedByID: extraPutReducer,
  extraDelete: extraDeleteReducer,
  blogDelete: blogDeleteReducer,
});
const userLoginLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userLoginLocalStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
