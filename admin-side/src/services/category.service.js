const baseUrl = import.meta.env.VITE_BASE_URL;

export function getCategoriesService() {
  return fetch(`${baseUrl}/categories`, {
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  });
}

export function getCategoryByIdService(id) {
  return fetch(`${baseUrl}/categories/${id}`, {
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  });
}

export async function createCategoryService(data) {
  const response = await fetch(`${baseUrl}/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      access_token: localStorage.getItem('access_token'),
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function updateCategoryByIdService(id, data) {
  const response = await fetch(`${baseUrl}/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      access_token: localStorage.getItem('access_token'),
    },
    body: JSON.stringify(data),
  });

  return response;
}

export function deleteCategoryByIdService(id) {
  return fetch(`${baseUrl}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      access_token: localStorage.getItem('access_token'),
    },
  });
}
