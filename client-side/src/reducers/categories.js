import {
  CATEGORIES_FAILURE,
  CATEGORIES_GET_CATEGORY_SUCCESS,
  CATEGORIES_PENDING,
} from '../actions/types';

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case CATEGORIES_PENDING:
      return {
        ...state,
        loading: true,
      };
    case CATEGORIES_GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: action.payload,
      };
    case CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
