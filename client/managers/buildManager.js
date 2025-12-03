const _apiUrl = "/api/build";

export const getMyBuilds = () => {
  return fetch(`${_apiUrl}/mybuilds`).then((res) => res.json());
}

export const getBuildbyId = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((res) => res.json())
}
