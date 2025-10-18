const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// Models
const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");
const Invoice = require("./models/Invoice");
const Client = require("./models/Client"); // dedicated client table

// Routes
const projectRoutes = require("./routes/projects");
const invoiceRoutes = require("./routes/invoices");
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/user"); // users auth
const clientRoutes = require("./routes/clients"); // client routes

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

/* ==============================
   Database Sync
   ============================= */
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected!");
    return sequelize.sync({ alter: true }); // auto update schema
  })
  .then(() => console.log("✅ Tables ready!"))
  .catch((err) => console.error("❌ DB Error:", err));


/* ==============================
   Mount Routes
   ============================= */
app.use("/api/projects", projectRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);


/* ==============================
   DASHBOARD API
   ============================= */
app.get("/api/dashboard", async (req, res) => {
  try {
    // Use Client.count() instead of User.count({ role: "client" }) to get correct clients count
    const clientsCount = await Client.count();

    // Projects by status
    const projects = await Project.findAll({
      attributes: ["status", [sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      group: ["status"],
      raw: true,
    });

    // Tasks by status
    const tasks = await Task.findAll({
      attributes: ["status", [sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      group: ["status"],
      raw: true,
    });

    // Invoices by status
    const invoices = await Invoice.findAll({
      attributes: ["status", [sequelize.fn("COUNT", sequelize.col("id")), "count"]],
      group: ["status"],
      raw: true,
    });

    res.json({
      clients: clientsCount,
      projects: {
        total: projects.reduce((acc, p) => acc + parseInt(p.count), 0),
        breakdown: projects,
      },
      tasks: {
        total: tasks.reduce((acc, t) => acc + parseInt(t.count), 0),
        breakdown: tasks,
      },
      invoices: {
        total: invoices.reduce((acc, i) => acc + parseInt(i.count), 0),
        breakdown: invoices,
      },
    });
  } catch (err) {
    console.error("❌ Dashboard fetch error:", err);
    res.status(500).json({ error: "Server error fetching dashboard data" });
  }
});


/* ==============================
   AUTH ROUTES
   ============================= */
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "⚠️ All fields are required" });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "⚠️ Email already registered" });
    }
    const newUser = await User.create({
      username,
      email,
      password, // plain text (local use only)
      role: role || "client",
    });
    return res.json({ message: "✅ Signup successful!", user: newUser });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});


app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "⚠️ Username and password required" });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "❌ Invalid credentials" });
    }
    return res.json({
      message: "✅ Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});


/* ==============================
   START SERVER
   ============================= */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
