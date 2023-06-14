const baseUrl = import.meta.env.VITE_BASE_URL;

export function getCategoriesService() {
  return fetch(`${baseUrl}/categories`, {
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  });
}
