require("dotenv").config();

const bcrypt = require("bcryptjs");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const { Pool } = require("pg");
const Stripe = require("stripe");

const app = express();
const port = process.env.PORT || 3001;
const jwtSecret = process.env.JWT_SECRET || "replace-this-secret";
const stripe = process.env.STRIPE_SECRET_KEY ? Stripe(process.env.STRIPE_SECRET_KEY) : null;
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSLMODE === "require" ? { rejectUnauthorized: false } : false })
  : null;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json({ limit: "100kb" }));
app.use(rateLimit({ windowMs: 60 * 1000, limit: 90 }));

function signUser(user) {
  return jwt.sign({ sub: user.id, email: user.email, role: user.role || "player" }, jwtSecret, { expiresIn: "7d" });
}

function requireAuth(req, res, next) {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: "unauthorized" });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "admin_only" });
  next();
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "the-crazy-island-api" });
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 8) return res.status(400).json({ error: "invalid_payload" });
  const passwordHash = await bcrypt.hash(password, 12);
  if (!pool) return res.status(201).json({ token: signUser({ id: "demo", email, role: "player" }), demo: true });
  const result = await pool.query(
    "insert into users (name, email, password_hash) values ($1, $2, $3) returning id, email, role",
    [name, email.toLowerCase(), passwordHash]
  );
  res.status(201).json({ token: signUser(result.rows[0]) });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "invalid_payload" });
  if (!pool) return res.json({ token: signUser({ id: "demo", email, role: "player" }), demo: true });
  const result = await pool.query("select id, email, password_hash, role from users where email = $1", [email.toLowerCase()]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ error: "invalid_credentials" });
  res.json({ token: signUser(user) });
});

app.post("/api/auth/password-reset", (req, res) => {
  res.json({ ok: true, message: "password_reset_email_queued" });
});

app.get("/api/player/profile", requireAuth, async (req, res) => {
  if (!pool) return res.json({ id: req.user.sub, coins: 500, level: 4, inventory: ["Espada de Coral"] });
  const result = await pool.query("select id, name, email, coins, level from users where id = $1", [req.user.sub]);
  res.json(result.rows[0]);
});

app.post("/api/checkout/stripe", requireAuth, async (req, res) => {
  const { productId } = req.body;
  if (!stripe) return res.json({ checkoutUrl: null, demo: true, productId });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: productId, quantity: 1 }],
    success_url: `${process.env.CLIENT_ORIGIN}/?payment=success`,
    cancel_url: `${process.env.CLIENT_ORIGIN}/?payment=cancel`,
    metadata: { userId: req.user.sub },
  });
  res.json({ checkoutUrl: session.url });
});

app.get("/api/admin/stats", requireAuth, requireAdmin, async (req, res) => {
  if (!pool) return res.json({ users: 1, payments: 0, items: 12, demo: true });
  const [users, payments, items] = await Promise.all([
    pool.query("select count(*)::int as count from users"),
    pool.query("select count(*)::int as count from purchases"),
    pool.query("select count(*)::int as count from items"),
  ]);
  res.json({ users: users.rows[0].count, payments: payments.rows[0].count, items: items.rows[0].count });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "server_error" });
});

app.listen(port, () => {
  console.log(`The Crazy Island API running on http://localhost:${port}`);
});
