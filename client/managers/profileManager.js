const _apiUrl = "/api/userprofile"

export const getMyProfile = () => {
  return fetch(`${_apiUrl}/me`).then((res) => res.json());
}
