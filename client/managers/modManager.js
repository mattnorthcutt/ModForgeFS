const API = import.meta.env.VITE_API_BASE_URL;
const _apiUrl = `${API}/api/modpart`;

export const createModPart = (modPart) => {
  return fetch(_apiUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(modPart),
  }).then((res) => res.json())
}

export const updateModPart = (id, modPart) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modPart),
  });
};

export const getModPartById = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    credentials: "include",
  }).then((res) => res.json());
};

export const deleteModPart = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
};

export const setTagsForModPart = (modPartId, tagIds) => {
  return fetch(`${_apiUrl}/${modPartId}/tags`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagIds),
  })
}
