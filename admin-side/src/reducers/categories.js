import {
  CATEGORIES_ADD_CATEGORY_SUCCESS,
  CATEGORIES_DELETE_CATEGORY_SUCCESS,
  CATEGORIES_FAILURE,
  CATEGORIES_GET_CATEGORY_BY_ID_SUCCESS,
  CATEGORIES_GET_CATEGORY_SUCCESS,
  CATEGORIES_PENDING,
} from '../actions/types';

const initialState = {
  loading: false,
  categories: [],
  category: null,
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
    case CATEGORIES_GET_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        category: action.payload,
      };
    case CATEGORIES_DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        categories: state.categories.filter(
          (category) => category.id !== action.payload,
        ),
      };
    case CATEGORIES_ADD_CATEGORY_SUCCESS:
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
