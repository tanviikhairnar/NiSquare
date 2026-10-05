import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";
import { featuredDinnerSet, newArrivals, topPicks } from "../src/data/products.js";

const serverDirectory = dirname(fileURLToPath(import.meta.url));
const databasePath = resolve(process.env.DATABASE_PATH || resolve(serverDirectory, "data", "store.sqlite"));
mkdirSync(dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec("PRAGMA foreign_keys = ON");
database.exec([
  "CREATE TABLE IF NOT EXISTS newsletter_subscriptions (email TEXT PRIMARY KEY, created_at TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS contact_messages (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, created_at TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, status TEXT NOT NULL, email TEXT NOT NULL, name TEXT NOT NULL, address TEXT NOT NULL, city TEXT NOT NULL, postal_code TEXT NOT NULL, phone TEXT NOT NULL, subtotal INTEGER NOT NULL, created_at TEXT NOT NULL)",
  "CREATE TABLE IF NOT EXISTS order_items (order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE, product_id TEXT NOT NULL, product_name TEXT NOT NULL, unit_price INTEGER NOT NULL, quantity INTEGER NOT NULL CHECK(quantity > 0), PRIMARY KEY(order_id, product_id))"
].join(";\n"));

const uniqueProducts = new Map();
[...topPicks, ...newArrivals, featuredDinnerSet].forEach((product) => uniqueProducts.set(product.href, product));
const catalogProducts = [...uniqueProducts.values()];
const productsById = new Map(catalogProducts.map((product) => [product.id, product]));
const productFields = (product) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  compareAt: product.compareAt || null,
  rating: product.rating || null,
  image: product.image,
  secondaryImage: product.secondaryImage || null,
  images: product.images || [],
  href: product.href
});
const emailIsValid = (email) => typeof email === "string" && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const cleanText = (value, maxLength) => typeof value === "string" ? value.trim().slice(0, maxLength) : "";
const jsonHeaders = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };

function sendJson(response, status, payload) {
  response.writeHead(status, jsonHeaders);
  response.end(JSON.stringify(payload));
}

class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function readJson(request) {
  return new Promise((resolveBody, reject) => {
    const chunks = [];
    let size = 0;
    let tooLarge = false;
    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1024 * 1024) {
        tooLarge = true;
        chunks.length = 0;
      } else if (!tooLarge) {
        chunks.push(chunk);
      }
    });
    request.on("end", () => {
      if (tooLarge) return reject(new ApiError(413, "Request body is too large."));
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
        if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("Invalid JSON object");
        resolveBody(body);
      } catch {
        reject(new ApiError(400, "Please send valid JSON."));
      }
    });
    request.on("error", reject);
  });
}

function requiredText(value, field, maxLength) {
  const result = cleanText(value, maxLength);
  if (!result) throw new ApiError(400, field + " is required.");
  return result;
}

async function handleRequest(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(204, { "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type" });
    return response.end();
  }

  const url = new URL(request.url, "http://localhost");
  if (request.method === "GET" && url.pathname === "/api/health") {
    return sendJson(response, 200, { status: "ok" });
  }
  if (request.method === "GET" && url.pathname === "/api/products") {
    return sendJson(response, 200, catalogProducts.map(productFields));
  }
  if (request.method === "GET" && url.pathname.startsWith("/api/products/")) {
    let handle;
    try {
      handle = decodeURIComponent(url.pathname.slice("/api/products/".length));
    } catch {
      throw new ApiError(400, "Invalid product handle.");
    }
    const product = catalogProducts.find((item) => item.id === handle || item.href.split("/").filter(Boolean).at(-1) === handle);
    if (!product) throw new ApiError(404, "Product not found.");
    return sendJson(response, 200, productFields(product));
  }

  if (request.method !== "POST") throw new ApiError(404, "Endpoint not found.");
  const body = await readJson(request);
  const now = new Date().toISOString();

  if (url.pathname === "/api/newsletter") {
    const email = cleanText(body.email, 254).toLowerCase();
    if (!emailIsValid(email)) throw new ApiError(400, "Enter a valid email address.");
    const result = database.prepare("INSERT OR IGNORE INTO newsletter_subscriptions (email, created_at) VALUES (?, ?)").run(email, now);
    return sendJson(response, result.changes ? 201 : 200, { subscribed: true, alreadySubscribed: !result.changes });
  }

  if (url.pathname === "/api/contact") {
    const name = requiredText(body.name, "Name", 120);
    const email = cleanText(body.email, 254).toLowerCase();
    const message = requiredText(body.message, "Message", 10000);
    if (!emailIsValid(email)) throw new ApiError(400, "Enter a valid email address.");
    if (message.length < 5) throw new ApiError(400, "Your message must be at least 5 characters.");
    const id = randomUUID();
    database.prepare("INSERT INTO contact_messages (id, name, email, message, created_at) VALUES (?, ?, ?, ?, ?)").run(id, name, email, message, now);
    return sendJson(response, 201, { received: true, messageId: id });
  }

  if (url.pathname === "/api/orders") {
    const email = cleanText(body.email, 254).toLowerCase();
    if (!emailIsValid(email)) throw new ApiError(400, "Enter a valid email address.");
    const customer = {
      name: requiredText(body.name, "Full name", 120),
      address: requiredText(body.address, "Address", 240),
      city: requiredText(body.city, "City", 120),
      postalCode: requiredText(body.postalCode, "Postal code", 24),
      phone: requiredText(body.phone, "Phone", 32)
    };
    if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 100) {
      throw new ApiError(400, "Your cart must contain between 1 and 100 items.");
    }

    const quantities = new Map();
    for (const line of body.items) {
      const id = typeof line?.id === "string" ? line.id : "";
      const quantity = Number(line?.quantity);
      if (!productsById.has(id)) throw new ApiError(400, "Your cart contains an unknown product.");
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) throw new ApiError(400, "Item quantities must be between 1 and 99.");
      const combined = (quantities.get(id) || 0) + quantity;
      if (combined > 99) throw new ApiError(400, "An item quantity cannot exceed 99.");
      quantities.set(id, combined);
    }

    const lines = [...quantities].map(([id, quantity]) => {
      const product = productsById.get(id);
      return { id, name: product.name, unitPrice: Number(product.price), quantity };
    });
    const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0);
    if (!Number.isSafeInteger(subtotal)) throw new ApiError(400, "Order total is invalid.");

    const orderId = randomUUID();
    database.exec("BEGIN IMMEDIATE");
    try {
      database.prepare("INSERT INTO orders (id, status, email, name, address, city, postal_code, phone, subtotal, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")
        .run(orderId, "pending_payment", email, customer.name, customer.address, customer.city, customer.postalCode, customer.phone, subtotal, now);
      const insertLine = database.prepare("INSERT INTO order_items (order_id, product_id, product_name, unit_price, quantity) VALUES (?, ?, ?, ?, ?)");
      for (const line of lines) insertLine.run(orderId, line.id, line.name, line.unitPrice, line.quantity);
      database.exec("COMMIT");
    } catch (error) {
      database.exec("ROLLBACK");
      throw error;
    }
    return sendJson(response, 201, { orderId, status: "pending_payment", subtotal });
  }

  throw new ApiError(404, "Endpoint not found.");
}

const port = Number(process.env.PORT || 3001);
const server = createServer((request, response) => {
  handleRequest(request, response).catch((error) => {
    if (response.headersSent || response.destroyed) return;
    const status = error instanceof ApiError ? error.status : 500;
    const message = status === 500 ? "The server could not complete that request." : error.message;
    if (status === 500) console.error("Store API request failed.");
    sendJson(response, status, { error: message });
  });
});
server.listen(port, "127.0.0.1", () => {
  console.log("Store API listening at http://127.0.0.1:" + port);
});
process.on("SIGINT", () => server.close(() => {
  database.close();
  process.exit(0);
}));