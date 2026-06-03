import {
  addTask,
  getTasks,
  methodNotAllowed,
  sendJson,
} from "../_lib/store.js";

export default function handler(request, response) {
  if (request.method === "GET") {
    sendJson(response, 200, getTasks());
    return;
  }

  if (request.method === "POST") {
    const task = {
      title: String(request.body?.title || "").trim(),
      description: String(request.body?.description || "").trim(),
      status: request.body?.status || "backlog",
      priority: request.body?.priority || "medium",
      owner: String(request.body?.owner || "Leo").trim(),
      dueDate: request.body?.dueDate || "",
    };

    if (!task.title) {
      sendJson(response, 400, { message: "El titulo es obligatorio." });
      return;
    }

    const nextTask = {
      id: Date.now(),
      ...task,
    };

    addTask(nextTask);
    sendJson(response, 201, nextTask);
    return;
  }

  methodNotAllowed(response);
}
