const baseUrl = import.meta.env.VITE_BASE_URL;

export function getPostsService() {
  return fetch(`${baseUrl}/posts`);
}

export function getPostBySlugService(slug) {
  return fetch(`${baseUrl}/posts/${slug}`);
}
