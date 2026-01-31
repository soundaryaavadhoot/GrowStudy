const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/register", (req, res) => {
  const { fullName, username, password } = req.body;
  const sql = "INSERT INTO users (full_name, username, password) VALUES (?, ?, ?)";
  db.query(sql, [fullName, username, password], (err) => {
    if (err) return res.status(500).json({ message: "Database error " });
    res.json({ message: "Registered" });
  });
});

 app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    if (results[0].password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    res.json({ message: "Login successful", user: results[0] });
  });
});


app.get("/api/daily-tasks/:userId", (req, res) => {
  const sql = "SELECT * FROM daily_tasks WHERE user_id = ?";
  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/daily-tasks", (req, res) => {
  const { user_id, task_text } = req.body;
  const sql = "INSERT INTO daily_tasks (user_id, task_text, is_done) VALUES (?, ?, 0)";
  db.query(sql, [user_id, task_text], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, task_text, is_done: 0 });
  });
});

app.put("/api/daily-tasks/:id", (req, res) => {
  const { is_done } = req.body;
  const sql = "UPDATE daily_tasks SET is_done = ? WHERE id = ?";
  db.query(sql, [is_done, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
});

app.delete("/api/daily-tasks/:id", (req, res) => {
  const sql = "DELETE FROM daily_tasks WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

app.get("/api/weekly-tasks/:userId", (req, res) => {
  const sql = "SELECT * FROM weekly_tasks WHERE user_id = ?";
  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/weekly-tasks", (req, res) => {
  const { user_id, task_text } = req.body;
  const sql = "INSERT INTO weekly_tasks (user_id, task_text, is_done) VALUES (?, ?, 0)";
  db.query(sql, [user_id, task_text], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, task_text, is_done: 0 });
  });
});

app.put("/api/weekly-tasks/:id", (req, res) => {
  const { is_done } = req.body;
  const sql = "UPDATE weekly_tasks SET is_done = ? WHERE id = ?";
  db.query(sql, [is_done, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
});

app.delete("/api/weekly-tasks/:id", (req, res) => {
  const sql = "DELETE FROM weekly_tasks WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});


app.get("/api/monthly-tasks/:userId", (req, res) => {
  const sql = "SELECT * FROM monthly_tasks WHERE user_id = ?";
  db.query(sql, [req.params.userId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post("/api/monthly-tasks", (req, res) => {
  const { user_id, task_text } = req.body;
  const sql = "INSERT INTO monthly_tasks (user_id, task_text, is_done) VALUES (?, ?, 0)";
  db.query(sql, [user_id, task_text], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId, task_text, is_done: 0 });
  });
});

app.put("/api/monthly-tasks/:id", (req, res) => {
  const { is_done } = req.body;
  const sql = "UPDATE monthly_tasks SET is_done = ? WHERE id = ?";
  db.query(sql, [is_done, req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
});

app.delete("/api/monthly-tasks/:id", (req, res) => {
  const sql = "DELETE FROM monthly_tasks WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});


app.listen(5000, () => {
  console.log("Server running on port 5000 - All routes loaded!");
});