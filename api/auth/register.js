import {
  createToken,
  getUsers,
  hashPassword,
  methodNotAllowed,
  registerTemporaryUser,
  sanitizeUser,
  sendJson,
} from "../_lib/store.js";

export default function handler(request, response) {
  if (request.method !== "POST") {
    methodNotAllowed(response);
    return;
  }

  const user = {
    name: String(request.body?.name || "").trim(),
    email: String(request.body?.email || "").trim().toLowerCase(),
    role: String(request.body?.role || "Team Member").trim(),
    password: String(request.body?.password || ""),
  };

  if (!user.name || !user.email || !user.password) {
    sendJson(response, 400, {
      message: "Nombre, email y password son obligatorios.",
    });
    return;
  }

  if (user.password.length < 6) {
    sendJson(response, 400, {
      message: "El password debe tener al menos 6 caracteres.",
    });
    return;
  }

  const alreadyExists = getUsers().some(
    (currentUser) => currentUser.email === user.email
  );

  if (alreadyExists) {
    sendJson(response, 409, {
      message: "Ya existe un usuario registrado con ese email.",
    });
    return;
  }

  const nextUser = {
    id: Date.now(),
    name: user.name,
    email: user.email,
    role: user.role,
    passwordHash: hashPassword(user.password),
    createdAt: new Date().toISOString(),
  };

  registerTemporaryUser(nextUser);

  sendJson(response, 201, {
    user: sanitizeUser(nextUser),
    token: createToken(),
  });
}
