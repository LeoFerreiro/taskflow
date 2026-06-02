const API_URL = "/api/auth";

async function request(path, payload) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo completar la autenticacion.");
  }

  return data;
}

export function registerUser(user) {
  return request("/register", user);
}

export function loginUser(credentials) {
  return request("/login", credentials);
}
