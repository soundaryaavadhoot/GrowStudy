const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// ✅ DB connection (ONLY HERE)
require("./db");

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks"); 

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
