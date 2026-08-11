const API = import.meta.env.VITE_API_BASE_URL;
const _apiUrl = `${API}/api/userprofile`

export const getMyProfile = () => {
  return fetch(`${_apiUrl}/me`, {
    credentials: "include",
  }).then((res) => res.json());
}
