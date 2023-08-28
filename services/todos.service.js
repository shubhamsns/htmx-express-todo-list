const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getTodosList = async () => {
  return await prisma.todo.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const createTodo = async ({ title }) => {
  return await prisma.todo.create({
    data: {
      title,
    },
  });
};

const updateTodo = async ({ id, title, checked }) => {
  return await prisma.todo.update({
    where: {
      id,
    },
    data: {
      title,
      checked,
    },
  });
};

const deleteTodo = async ({ id }) => {
  return await prisma.todo.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  getTodosList,
  createTodo,
  updateTodo,
  deleteTodo,
};
