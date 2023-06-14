import { getCategoriesService } from '../services/category.service';

import {
  CATEGORIES_FAILURE,
  CATEGORIES_GET_CATEGORY_SUCCESS,
  CATEGORIES_PENDING,
} from './types';

export const categoriesPending = () => ({
  type: CATEGORIES_PENDING,
});

export const getCategoriesSuccess = (categories) => ({
  type: CATEGORIES_GET_CATEGORY_SUCCESS,
  payload: categories,
});

export const categoriesError = (errorMessage) => ({
  type: CATEGORIES_FAILURE,
  payload: errorMessage,
});

export const getCategories = () => async (dispatch, getState) => {
  try {
    dispatch(categoriesPending());

    const response = await getCategoriesService();
    const responseJson = await response.json();
    if (response.ok) {
      const { data } = responseJson;
      dispatch(getCategoriesSuccess(data));
      const { categories } = getState();
      return categories;
    } else {
      dispatch(categoriesError(responseJson.message));
      const { categories } = getState();
      return categories;
    }
  } catch (err) {
    console.error(err);
  }
};
