import {
  createCategoryService,
  deleteCategoryByIdService,
  getCategoriesService,
  getCategoryByIdService,
} from '../services/category.service';

import {
  CATEGORIES_ADD_CATEGORY_SUCCESS,
  CATEGORIES_DELETE_CATEGORY_SUCCESS,
  CATEGORIES_FAILURE,
  CATEGORIES_GET_CATEGORY_BY_ID_SUCCESS,
  CATEGORIES_GET_CATEGORY_SUCCESS,
  CATEGORIES_PENDING,
} from './types';

export const categoriesPending = () => ({
  type: CATEGORIES_PENDING,
});

export const addCategorySuccess = (categories) => ({
  type: CATEGORIES_ADD_CATEGORY_SUCCESS,
  payload: categories,
});

export const getCategoriesSuccess = (categories) => ({
  type: CATEGORIES_GET_CATEGORY_SUCCESS,
  payload: categories,
});

export const getCategoryByIdSuccess = (posts) => ({
  type: CATEGORIES_GET_CATEGORY_BY_ID_SUCCESS,
  payload: posts,
});

export const deleteCategorySuccess = (categoryId) => ({
  type: CATEGORIES_DELETE_CATEGORY_SUCCESS,
  payload: categoryId,
});

export const categoriesError = (errorMessage) => ({
  type: CATEGORIES_FAILURE,
  payload: errorMessage,
});

export const createCategory =
  ({ name }) =>
  async (dispatch, getState) => {
    try {
      dispatch(categoriesPending());

      const response = await createCategoryService({
        name,
      });
      const responseJson = await response.json();
      if (response.ok) {
        const response = await getCategoriesService();
        const { data } = await response.json();
        dispatch(addCategorySuccess(data));
        const { categories } = getState();
        return categories;
      } else {
        dispatch(categoriesError(responseJson.message));
        const { categories } = getState();
        return categories;
      }
    } catch (err) {
      dispatch(categoriesError(err));
    }
  };

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

export const getCategoryById = (id) => async (dispatch, getState) => {
  try {
    dispatch(categoriesPending());

    const response = await getCategoryByIdService(id);
    const responseJson = await response.json();
    if (response.ok) {
      const { data } = responseJson;
      dispatch(getCategoryByIdSuccess(data));
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

export const deleteCategoryById = (id) => async (dispatch, getState) => {
  try {
    dispatch(categoriesPending());

    const response = await deleteCategoryByIdService(id);
    const responseJson = await response.json();
    if (response.ok) {
      dispatch(deleteCategorySuccess(id));
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
