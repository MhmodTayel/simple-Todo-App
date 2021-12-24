const express = require("express");
const mongoose = require("mongoose");
const todosRoutes = require("./routes/todo");
const usersRoutes = require("./routes/user");
const authMiddleware = require("./middlewares/auth");

const app = express();

process.env.SECRET = "dfwSDCVSC7e4evDVC@#$bvdvsdv@#$%%44181@#";

mongoose.connect("mongodb://localhost:27017/todoApp");

app.use(express.json());
app.use(authMiddleware);
app.use("/users", usersRoutes);
app.use("/todos", todosRoutes);

app.use("*", (req, res) => {
  res.status(404).end();
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => {
  console.log("Connection Started on port 3000");
});
