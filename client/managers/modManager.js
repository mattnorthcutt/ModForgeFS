const _apiUrl = "/api/modpart"

export const createModPart = (modPart) => {
  return fetch(_apiUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(modPart),
  }).then((res) => res.json())
}

export const updateModPart = (id, modPart) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(modPart),
  });
};

export const getModPartById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json());
};

export const deleteModPart = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  });
};

export const setTagsForModPart = (modPartId, tagIds) => {
  return fetch(`${_apiUrl}/${modPartId}/tags`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tagIds),
  })
}
