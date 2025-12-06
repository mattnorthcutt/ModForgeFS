const _apiUrl = "/api/build";

export const getMyBuilds = () => {
  return fetch(`${_apiUrl}/mybuilds`).then((res) => res.json());
}

export const getBuildbyId = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json())
}

export const createBuild = (build) => {
  return fetch(_apiUrl, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(build),
  }).then((res) => res.json());
};

export const updateBuild = (id, build) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(build),
  });
};

export const deleteBuild = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    credentials: "same-origin",
  })
}
