const baseUrl = import.meta.env.VITE_BASE_URL;

export function getPostsService() {
  return fetch(`${baseUrl}/posts`, {
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  });
}

export function getPostByIdService(id) {
  return fetch(`${baseUrl}/posts/${id}`, {
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  });
}

export async function createPostService(data) {
  const response = await fetch(`${baseUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      access_token: localStorage.getItem('access_token'),
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function updatePostByIdSevice(id, data) {
  const response = await fetch(`${baseUrl}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      access_token: localStorage.getItem('access_token'),
    },
    body: JSON.stringify(data),
  });

  return response;
}

export function deletePostByIdSevice(id) {
  return fetch(`${baseUrl}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  });
}
