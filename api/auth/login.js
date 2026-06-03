import {
  createToken,
  getUsers,
  hashPassword,
  methodNotAllowed,
  sanitizeUser,
  sendJson,
} from "../_lib/store.js";

export default function handler(request, response) {
  if (request.method !== "POST") {
    methodNotAllowed(response);
    return;
  }

  const email = String(request.body?.email || "").trim().toLowerCase();
  const password = String(request.body?.password || "");
  const user = getUsers().find((currentUser) => currentUser.email === email);

  if (!user || user.passwordHash !== hashPassword(password)) {
    sendJson(response, 401, { message: "Email o password incorrectos." });
    return;
  }

  sendJson(response, 200, {
    user: sanitizeUser(user),
    token: createToken(),
  });
}
