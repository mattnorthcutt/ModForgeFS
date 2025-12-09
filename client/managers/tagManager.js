const _apiUrl = "/api/tag"

export const getAllTags = () => {
  return fetch(_apiUrl).then((res) => res.json());
}

export const createTag = (name) => {
  return fetch(_apiUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name }),
  }).then((res) => res.json())
}

export const updateTag = (id, tag) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tag),
  });
};

export const getTagById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const deleteTag = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
};
