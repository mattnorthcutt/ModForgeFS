const API = import.meta.env.VITE_API_BASE_URL;
const _apiUrl = `${API}/api/auth`;

export const login = (email, password) => {
  return fetch(_apiUrl + "/login", {
    method: "POST",
    credentials: "include",
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  }).then((res) => {
    if (res.status !== 200) {
      return Promise.resolve(null);
    } else {
      return tryGetLoggedInUser();
    }
  });
};

export const logout = () => {
  return fetch(_apiUrl + "/logout", {
    method: "POST",
    credentials: "include",
  });
};

export const tryGetLoggedInUser = () => {
  return fetch(_apiUrl + "/me", {
    credentials: "include",
  }).then((res) => {
    return res.status === 401 ? Promise.resolve(null) : res.json();
  });
};

export const register = (userProfile) => {
  userProfile.password = btoa(userProfile.password);
  return fetch(_apiUrl + "/register", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userProfile),
  }).then((res) => {
    if (res.ok) {
      return fetch(_apiUrl + "/me", {
        credentials: "include",
      }).then((res) => res.json());
    } else if (res.status === 400) {
      return res.json();
    } else {
      return Promise.resolve({ errors: ["Unknown registration error"] });
    }
  });
};
