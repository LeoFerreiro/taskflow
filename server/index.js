import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash, randomUUID } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFile = join(__dirname, "data", "tasks.json");
const usersFile = join(__dirname, "data", "users.json");
const port = Number(process.env.PORT) || 4000;
const demoUsers = await readUsers();
const temporaryUsers = [];

async function readTasks() {
  const file = await readFile(dataFile, "utf8");
  return JSON.parse(file);
}

async function saveTasks(tasks) {
  await mkdir(dirname(dataFile), { recursive: true });
  await writeFile(dataFile, JSON.stringify(tasks, null, 2));
}

async function readUsers() {
  const file = await readFile(usersFile, "utf8");
  return JSON.parse(file);
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  });
  response.end(JSON.stringify(payload));
}

async function parseBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function normalizeTask(task) {
  return {
    title: String(task.title || "").trim(),
    description: String(task.description || "").trim(),
    status: task.status || "backlog",
    priority: task.priority || "medium",
    owner: String(task.owner || "Leo").trim(),
    dueDate: task.dueDate || "",
  };
}

function normalizeUser(user) {
  return {
    name: String(user.name || "").trim(),
    email: String(user.email || "").trim().toLowerCase(),
    role: String(user.role || "Team Member").trim(),
    password: String(user.password || ""),
  };
}

function hashPassword(password) {
  return createHash("sha256").update(password).digest("hex");
}

function sanitizeUser(user) {
  const { passwordHash, ...publicUser } = user;
  void passwordHash;
  return publicUser;
}

function getUsers() {
  return [...temporaryUsers, ...demoUsers];
}

const server = createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 200, { ok: true });
    return;
  }

  const url = new URL(request.url, `http://${request.headers.host}`);
  const taskId = Number(url.pathname.split("/").at(-1));

  try {
    if (url.pathname === "/api/health") {
      sendJson(response, 200, { ok: true, service: "taskflow-api" });
      return;
    }

    if (url.pathname === "/api/users" && request.method === "GET") {
      sendJson(response, 200, getUsers().map(sanitizeUser));
      return;
    }

    if (url.pathname === "/api/auth/register" && request.method === "POST") {
      const body = await parseBody(request);
      const user = normalizeUser(body);

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

      const users = getUsers();
      const alreadyExists = users.some(
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

      temporaryUsers.unshift(nextUser);
      sendJson(response, 201, {
        user: sanitizeUser(nextUser),
        token: randomUUID(),
      });
      return;
    }

    if (url.pathname === "/api/auth/login" && request.method === "POST") {
      const body = await parseBody(request);
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const users = getUsers();
      const user = users.find((currentUser) => currentUser.email === email);

      if (!user || user.passwordHash !== hashPassword(password)) {
        sendJson(response, 401, {
          message: "Email o password incorrectos.",
        });
        return;
      }

      sendJson(response, 200, {
        user: sanitizeUser(user),
        token: randomUUID(),
      });
      return;
    }

    if (url.pathname === "/api/tasks" && request.method === "GET") {
      const tasks = await readTasks();
      sendJson(response, 200, tasks);
      return;
    }

    if (url.pathname === "/api/tasks" && request.method === "POST") {
      const body = await parseBody(request);
      const task = normalizeTask(body);

      if (!task.title) {
        sendJson(response, 400, { message: "El titulo es obligatorio." });
        return;
      }

      const tasks = await readTasks();
      const nextTask = {
        id: Date.now(),
        ...task,
      };

      await saveTasks([nextTask, ...tasks]);
      sendJson(response, 201, nextTask);
      return;
    }

    if (url.pathname.startsWith("/api/tasks/") && request.method === "PATCH") {
      const body = await parseBody(request);
      const tasks = await readTasks();
      const index = tasks.findIndex((task) => task.id === taskId);

      if (index === -1) {
        sendJson(response, 404, { message: "Tarea no encontrada." });
        return;
      }

      tasks[index] = {
        ...tasks[index],
        ...body,
      };

      await saveTasks(tasks);
      sendJson(response, 200, tasks[index]);
      return;
    }

    if (url.pathname.startsWith("/api/tasks/") && request.method === "DELETE") {
      const tasks = await readTasks();
      const nextTasks = tasks.filter((task) => task.id !== taskId);

      if (nextTasks.length === tasks.length) {
        sendJson(response, 404, { message: "Tarea no encontrada." });
        return;
      }

      await saveTasks(nextTasks);
      sendJson(response, 200, { id: taskId });
      return;
    }

    sendJson(response, 404, { message: "Ruta no encontrada." });
  } catch (error) {
    sendJson(response, 500, {
      message: "Error interno del servidor.",
      detail: error.message,
    });
  }
});

server.listen(port, () => {
  console.log(`TaskFlow API running on http://localhost:${port}`);
});
