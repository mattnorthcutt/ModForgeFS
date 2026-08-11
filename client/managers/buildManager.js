const API = import.meta.env.VITE_API_BASE_URL;
const _apiUrl = `${API}/api/build`;

export const getMyBuilds = () => {
  return fetch(`${_apiUrl}/mybuilds`, {
    credentials: "include",
  }).then((res) => res.json());
}

export const getBuildbyId = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    credentials: "include",
  }).then((res) => res.json())
}

export const createBuild = (build) => {
  return fetch(_apiUrl, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(build),
  }).then((res) => res.json());
};

export const updateBuild = (id, build) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(build),
  });
};

export const deleteBuild = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
}


export const getPublicBuilds = () => {
  return fetch(`${_apiUrl}/public`, {
    credentials: "include",
  }).then((res) => res.json());
};

export const updateBuildVisibility = (buildId, isPublic) => {
  return fetch(`${_apiUrl}/${buildId}/visibility`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(isPublic),
  });
};
