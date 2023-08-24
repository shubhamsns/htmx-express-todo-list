const express = require('express');
const { PrismaClient } = require('@prisma/client')

const router = express.Router();
const prisma = new PrismaClient()


/* GET todos listing. */
router.get('/', async function(req, res, next) {
  const todoList = await prisma.todo.findMany()

  res.json(todoList)
});

router.post('/', async function(req, res, next) {
  const { title, content } = req.body

  const todo = await prisma.todo.create({
    data: {
      title,
      content,
    }
  })

  res.json(todo)
})

router.put('/:id', async function(req, res, next) {
  const { title, content } = req.body

  const todo = await prisma.todo.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      title,
      content,
    }
  })

  res.json(todo)
})


router.delete('/:id', async function(req, res, next) {
  const deletedTodo = await prisma.todo.delete({
    where: {
      id: Number(req.params.id)
    }
  })

  res.json(deletedTodo)
})

module.exports = router;
