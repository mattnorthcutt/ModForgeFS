const _apiUrl = "/api/build";

export const getMyBuilds = () => {
  return fetch(`${_apiUrl}/mybuilds`).then((res) => res.json());
}



