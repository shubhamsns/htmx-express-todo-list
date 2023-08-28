const express = require("express");
const {
  getTodosList,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todos.service");

const router = express.Router();

/* GET todos listing. */
router.get("/", async function (req, res, next) {
  try {
    const todoList = await getTodosList();
    res.render("todo-list", { todos: todoList });
  } catch (err) {
    res.render("error", { error: err });
  }
});

// todo: handle errors/failures
router.post("/", async function (req, res, next) {
  const { title } = req.body;
  await createTodo({ title });

  const todoList = await getTodosList();
  res.render("todo-list", { todos: todoList });
});

router.put("/:id", async function (req, res, next) {
  const { title, checked } = req.body;
  const id = Number(req.params.id);

  const todo = await updateTodo({
    title,
    checked: checked === "on" ? true : false,
    id,
  });

  const todoList = await getTodosList();
  res.render("todo-list", { todos: todoList });
});

router.delete("/:id", async function (req, res, next) {
  const id = Number(req.params.id);
  const deletedTodo = await deleteTodo({ id });

  const todoList = await getTodosList();
  res.render("todo-list", { todos: todoList });
});

module.exports = router;
