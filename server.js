const express = require("express");

const app = express();
app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const todo = {
    id: todos.length + 1,
    task,
    completed: false,
  };

  todos.push(todo);
  res.status(201).json(todo);
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;