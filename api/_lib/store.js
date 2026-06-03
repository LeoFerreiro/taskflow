import { createHash, randomUUID } from "node:crypto";

const demoPasswordHash =
  "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";

const demoUsers = [
  {
    id: 1,
    name: "Leonardo",
    email: "leo@taskflow.dev",
    role: "Full Stack Developer",
    passwordHash: demoPasswordHash,
    createdAt: "2026-06-01T00:00:00.000Z",
  },
];

const temporaryUsers = [];

const tasks = [
  {
    id: 1,
    title: "Disenar sistema de onboarding",
    description: "Mapear el flujo de bienvenida, activacion y primer proyecto.",
    status: "backlog",
    priority: "high",
    owner: "Leo",
    dueDate: "2026-06-06",
  },
  {
    id: 2,
    title: "Conectar API de tareas",
    description: "Exponer endpoints REST y persistencia local para el tablero.",
    status: "progress",
    priority: "high",
    owner: "Nadia",
    dueDate: "2026-06-03",
  },
  {
    id: 3,
    title: "Revisar estados del Kanban",
    description: "Validar que el equipo pueda mover tareas sin romper el flujo.",
    status: "review",
    priority: "medium",
    owner: "Mica",
    dueDate: "2026-06-05",
  },
  {
    id: 4,
    title: "Publicar version demo",
    description: "Preparar build, smoke test y checklist de entrega.",
    status: "done",
    priority: "low",
    owner: "Leo",
    dueDate: "2026-06-01",
  },
];

export function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}

export function methodNotAllowed(response) {
  sendJson(response, 405, { message: "Metodo no permitido." });
}

export function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

export function createToken() {
  return randomUUID();
}

export function sanitizeUser(user) {
  const { passwordHash, ...publicUser } = user;
  void passwordHash;
  return publicUser;
}

export function getUsers() {
  return [...temporaryUsers, ...demoUsers];
}

export function registerTemporaryUser(user) {
  temporaryUsers.unshift(user);
}

export function getTasks() {
  return tasks;
}

export function addTask(task) {
  tasks.unshift(task);
}

export function updateTask(id, updates) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return null;
  }

  tasks[index] = {
    ...tasks[index],
    ...updates,
  };

  return tasks[index];
}

export function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return false;
  }

  tasks.splice(index, 1);
  return true;
}
