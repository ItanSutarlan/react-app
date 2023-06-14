import {
  createPostService,
  deletePostByIdSevice,
  getPostsService,
  getPostByIdService,
  updatePostByIdSevice,
} from '../services/post.service';

import {
  POSTS_ADD_POST_SUCCESS,
  POSTS_DELETE_POST_SUCCESS,
  POSTS_FAILURE,
  POSTS_GET_POST_BY_ID_SUCCESS,
  POSTS_GET_POST_SUCCESS,
  POSTS_PENDING,
} from './types';

export const postsPending = () => ({
  type: POSTS_PENDING,
});

export const addPostSuccess = (posts) => ({
  type: POSTS_ADD_POST_SUCCESS,
  payload: posts,
});

export const getPostsSuccess = (posts) => ({
  type: POSTS_GET_POST_SUCCESS,
  payload: posts,
});

export const getPostByIdSuccess = (post) => ({
  type: POSTS_GET_POST_BY_ID_SUCCESS,
  payload: post,
});

export const deletePostSuccess = (postId) => ({
  type: POSTS_DELETE_POST_SUCCESS,
  payload: postId,
});

export const postsError = (errorMessage) => ({
  type: POSTS_FAILURE,
  payload: errorMessage,
});

export const createPost =
  ({ title, slug, content, imgUrl, categoryId, tags }) =>
  async (dispatch, getState) => {
    try {
      dispatch(postsPending());

      const response = await createPostService({
        title,
        slug,
        content,
        imgUrl,
        categoryId,
        tags,
      });
      const responseJson = await response.json();
      if (response.ok) {
        const newResponse = await getPostsService();
        const { data } = await newResponse.json();
        dispatch(addPostSuccess(data));
        const { posts } = getState();
        return posts;
      } else {
        dispatch(postsError(responseJson.message));
        const { posts } = getState();
        return posts;
      }
    } catch (err) {
      dispatch(postsError(err));
    }
  };

export const updatePost =
  (id, { title, slug, content, imgUrl, categoryId, tags }) =>
  async (dispatch, getState) => {
    try {
      dispatch(postsPending());

      const response = await updatePostByIdSevice(id, {
        title,
        slug,
        content,
        imgUrl,
        categoryId,
        tags,
      });
      const responseJson = await response.json();
      if (response.ok) {
        const newResponse = await getPostsService();
        const { data } = await newResponse.json();
        dispatch(addPostSuccess(data));
        const { posts } = getState();
        return posts;
      } else {
        dispatch(postsError(responseJson.message));
        const { posts } = getState();
        return posts;
      }
    } catch (err) {
      dispatch(postsError(err));
    }
  };

export const getPosts = () => async (dispatch, getState) => {
  try {
    dispatch(postsPending());

    const response = await getPostsService();
    const responseJson = await response.json();
    if (response.ok) {
      const { data } = responseJson;
      dispatch(getPostsSuccess(data));
      const { posts } = getState();
      return posts;
    } else {
      dispatch(postsError(responseJson.message));
      const { posts } = getState();
      return posts;
    }
  } catch (err) {
    console.error(err);
  }
};

export const getPostById = (id) => async (dispatch, getState) => {
  try {
    dispatch(postsPending());

    const response = await getPostByIdService(id);
    const responseJson = await response.json();
    if (response.ok) {
      const { data } = responseJson;
      dispatch(getPostByIdSuccess(data));
      const { posts } = getState();
      return posts;
    } else {
      dispatch(postsError(responseJson.message));
      const { posts } = getState();
      return posts;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deletePostById = (id) => async (dispatch, getState) => {
  try {
    dispatch(postsPending());

    const response = await deletePostByIdSevice(id);
    const responseJson = await response.json();
    if (response.ok) {
      dispatch(deletePostSuccess(id));
      const { posts } = getState();
      return posts;
    } else {
      dispatch(postsError(responseJson.message));
      const { posts } = getState();
      return posts;
    }
  } catch (err) {
    console.error(err);
  }
};
