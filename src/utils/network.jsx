//utils/network.js
const BASE_URL = "http://165.22.55.164:3000/api";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ username, password }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();
  console.log(responseJson);
  if (response.status >= 400) {
    alert(responseJson.msg);
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

async function register({ username, password }) {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    alert(responseJson.msg);
    return { error: true, code: response.status };
  }

  return { error: false, code: response.status };
}

async function getUserLogged() {
  try {
    const response = await fetchWithToken(`${BASE_URL}/users/own-profile`);
    const responseJson = await response.json();

    if (response.status >= 400) {
      return { error: true, code: response.status, data: null };
    }

    return { error: false, code: response.status, data: responseJson.data };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return { error: true, code: 500, data: null };
  }
}


async function addNote({ title, body }) {
  const response = await fetchWithToken(`${BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

async function getNotes() {
  const response = await fetchWithToken(`${BASE_URL}/notes`);
  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

async function getNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

async function deleteNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });

  const responseJson = await response.json();

  if (response.status >= 400) {
    return { error: true, code: response.status, data: null };
  }

  return { error: false, code: response.status, data: responseJson.data };
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  addNote,
  getNotes,
  getNote,
  deleteNote,
};