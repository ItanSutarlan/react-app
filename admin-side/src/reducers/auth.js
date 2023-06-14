import {
  AUTH_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_PENDING,
} from '../actions/types';

const initialState = {
  loading: false,
  isLoggedIn: false,
  error: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_PENDING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedIn: true,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        isLoggedIn: false,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
