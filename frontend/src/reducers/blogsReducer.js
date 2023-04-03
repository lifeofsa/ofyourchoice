import {
  BLOGS_EXTRA_FAIL,
  BLOGS_EXTRA_REQUEST,
  BLOGS_EXTRA_RESET,
  BLOGS_EXTRA_SUCCESS,
  BLOGS_FAIL_BYID,
  BLOGS_FAIL_CREATE,
  BLOGS_FAIL_GET,
  BLOGS_FAIL_UPDATE,
  BLOGS_REQUEST_BYID,
  BLOGS_REQUEST_CREATE,
  BLOGS_REQUEST_GET,
  BLOGS_REQUEST_UPDATE,
  BLOGS_RESET_BYID,
  BLOGS_RESET_CREATE,
  BLOGS_RESET_GET,
  BLOGS_RESET_UPDATE,
  BLOGS_SUCCESS_BYID,
  BLOGS_SUCCESS_CREATE,
  BLOGS_SUCCESS_GET,
  BLOGS_SUCCESS_UPDATE,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_RESET,
  BLOG_DELETE_SUCCESS,
  EXTRA_DELETE_FAIL,
  EXTRA_DELETE_REQUEST,
  EXTRA_DELETE_RESET,
  EXTRA_DELETE_SUCCESS,
  EXTRA_PUT_FAIL,
  EXTRA_PUT_REQUEST,
  EXTRA_PUT_RESET,
  EXTRA_PUT_SUCCESS,
} from "../constants/BlogsConstants";

export const blogsGetAllReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case BLOGS_REQUEST_GET:
      return {
        loading: true,
      };
    case BLOGS_SUCCESS_GET:
      return {
        loading: false,
        blogs: action.payload,
        success: true,
      };
    case BLOGS_FAIL_GET:
      return {
        loading: false,
        error: action.payload,
      };
    case BLOGS_RESET_GET:
      return {};

    default:
      return state;
  }
};
export const blogsPostReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOGS_REQUEST_CREATE:
      return {
        loading: true,
      };
    case BLOGS_SUCCESS_CREATE:
      return {
        loading: false,
        blogs: action.payload,
        success: true,
      };
    case BLOGS_FAIL_CREATE:
      return {
        loading: false,
        error: action.payload,
      };
    case BLOGS_RESET_CREATE:
      return {};

    default:
      return state;
  }
};

export const blogUpdateByIdReducer = (state = { blog: {} }, action) => {
  switch (action.type) {
    case BLOGS_REQUEST_UPDATE:
      return {
        loading: true,
      };
    case BLOGS_SUCCESS_UPDATE:
      return {
        loading: false,
        blog: action.payload,
        success: true,
      };
    case BLOGS_FAIL_UPDATE:
      return {
        loading: false,
        error: action.payload,
      };
    case BLOGS_RESET_UPDATE:
      return {};
    default:
      return state;
  }
};

export const getBlogbyIdReducer = (state = { blogs: {} }, action) => {
  switch (action.type) {
    case BLOGS_REQUEST_BYID:
      return {
        loading: true,
        ...state,
      };
    case BLOGS_SUCCESS_BYID:
      return {
        loading: false,
        blog: action.payload,
        success: true,
      };
    case BLOGS_FAIL_BYID:
      return {
        loading: false,
        error: action.payload,
      };
    case BLOGS_RESET_BYID:
      return {};
    default:
      return state;
  }
};
export const getBlogExtrabyIdReducer = (state = { extra: {} }, action) => {
  switch (action.type) {
    case BLOGS_EXTRA_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case BLOGS_EXTRA_SUCCESS:
      return {
        loading: false,
        extra: action.payload,
        success: true,
      };
    case BLOGS_EXTRA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BLOGS_EXTRA_RESET:
      return {};
    default:
      return state;
  }
};

export const extraPutReducer = (state = { extra: {} }, action) => {
  switch (action.type) {
    case EXTRA_PUT_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case EXTRA_PUT_SUCCESS:
      return {
        loading: false,
        extra: action.payload,
        success: true,
      };
    case EXTRA_PUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EXTRA_PUT_RESET:
      return {};
    default:
      return state;
  }
};

export const extraDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EXTRA_DELETE_REQUEST:
      return {
        loading: true,
      };
    case EXTRA_DELETE_SUCCESS:
      return {
        loading: false,
        extra: action.payload,
        success: true,
      };
    case EXTRA_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case EXTRA_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const blogDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_DELETE_REQUEST:
      return {
        loading: true,
      };
    case BLOG_DELETE_SUCCESS:
      return {
        loading: false,
        blog: action.payload,
        success: true,
      };
    case BLOG_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case BLOG_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
