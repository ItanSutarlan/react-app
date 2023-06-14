import { login } from '../services/auth.service';

import {
  AUTH_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_PENDING,
} from './types';

export const authPending = () => ({
  type: AUTH_PENDING,
});

export const authLoginSuccess = () => ({
  type: AUTH_LOGIN_SUCCESS,
});

export const authLogoutSuccess = () => ({
  type: AUTH_LOGOUT_SUCCESS,
});

export const authError = (errorMessage) => ({
  type: AUTH_FAILURE,
  payload: errorMessage,
});

export const handleLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      dispatch(authPending());
      const response = await login({ email, password });
      const responseJson = await response.json();
      if (response.ok) {
        const { data } = responseJson;
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        dispatch(authLoginSuccess());
        const { auth } = getState();
        return auth;
      } else {
        dispatch(authError(responseJson.message));
        const { auth } = getState();
        return auth;
      }
    } catch (error) {
      console.error(error);
    }
  };

export const handleLogout = () => (dispatch) => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  dispatch(authLogoutSuccess());
};
