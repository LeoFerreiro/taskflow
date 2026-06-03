import { deleteTask, methodNotAllowed, sendJson, updateTask } from "../_lib/store.js";

export default function handler(request, response) {
  const id = Number(request.query.id);

  if (request.method === "PATCH") {
    const updatedTask = updateTask(id, request.body || {});

    if (!updatedTask) {
      sendJson(response, 404, { message: "Tarea no encontrada." });
      return;
    }

    sendJson(response, 200, updatedTask);
    return;
  }

  if (request.method === "DELETE") {
    const deleted = deleteTask(id);

    if (!deleted) {
      sendJson(response, 404, { message: "Tarea no encontrada." });
      return;
    }

    sendJson(response, 200, { id });
    return;
  }

  methodNotAllowed(response);
}
