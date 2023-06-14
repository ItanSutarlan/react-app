import {
  POSTS_ADD_POST_SUCCESS,
  POSTS_DELETE_POST_SUCCESS,
  POSTS_FAILURE,
  POSTS_GET_POST_BY_ID_SUCCESS,
  POSTS_GET_POST_SUCCESS,
  POSTS_PENDING,
} from '../actions/types';

const initialState = {
  loading: false,
  posts: [],
  post: null,
  error: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_PENDING:
      return {
        ...state,
        loading: true,
      };
    case POSTS_GET_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
      };
    case POSTS_GET_POST_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        post: action.payload,
      };
    case POSTS_DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
    case POSTS_ADD_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: action.payload,
      };
    case POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
