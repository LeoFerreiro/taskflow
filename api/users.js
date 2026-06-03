import { getUsers, methodNotAllowed, sanitizeUser, sendJson } from "./_lib/store.js";

export default function handler(request, response) {
  if (request.method !== "GET") {
    methodNotAllowed(response);
    return;
  }

  sendJson(response, 200, getUsers().map(sanitizeUser));
}
