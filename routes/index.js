const express = require("express");
const { getTodosList } = require("../services/todos.service");
const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const todos = await getTodosList();
  res.render("index", { title: "Todos", todos: todos });
});

module.exports = router;
