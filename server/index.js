const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ROUTES IMPORT
const taskRoutes = require("./routes/tasks");
const aiRoutes = require("./routes/ai");

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/tasks", taskRoutes);
app.use("/api/ai", aiRoutes);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Server is running");
});

// MONGODB CONNECTION
mongoose
  .connect(
    "mongodb+srv://santoshkydev_db_user:Cl1r6XT7tAIwGF3w@taskapp.6arz0ol.mongodb.net/"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

const PORT = 5000;

// START SERVER
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
