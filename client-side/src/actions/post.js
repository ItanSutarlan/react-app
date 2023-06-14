import {
  getPostsService,
  getPostBySlugService,
} from '../services/post.service';

import {
  POSTS_FAILURE,
  POSTS_GET_POST_BY_SLUG_SUCCESS,
  POSTS_GET_POST_SUCCESS,
  POSTS_PENDING,
} from './types';

export const postsPending = () => ({
  type: POSTS_PENDING,
});

export const getPostsSuccess = (posts) => ({
  type: POSTS_GET_POST_SUCCESS,
  payload: posts,
});

export const getPostBySlugSuccess = (post) => ({
  type: POSTS_GET_POST_BY_SLUG_SUCCESS,
  payload: post,
});

export const postsError = (errorMessage) => ({
  type: POSTS_FAILURE,
  payload: errorMessage,
});

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

export const getPostBySlug = (id) => async (dispatch, getState) => {
  try {
    dispatch(postsPending());

    const response = await getPostBySlugService(id);
    const responseJson = await response.json();
    if (response.ok) {
      const { data } = responseJson;
      dispatch(getPostBySlugSuccess(data));
      const { posts } = getState();
      console.log(posts.post, '<<<< postslug');
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
