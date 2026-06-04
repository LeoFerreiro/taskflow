const API_URL = "/api/tasks";

async function request(path = "", options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "No se pudo completar la operacion.");
  }

  return data;
}

export function getTasks() {
  return request();
}

export function createTask(task) {
  return request("", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export function updateTask(id, updates) {
  return request(`/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export function deleteTask(id) {
  return fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    if (response.status === 404) {
      return { id, notFound: true };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "No se pudo eliminar la tarea.");
    }

    return data;
  });
}
