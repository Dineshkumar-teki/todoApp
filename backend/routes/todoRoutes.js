import express from "express";
import { Todo } from "../modal/index.js";

const router = express.Router();

// Create Todo Route
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.tags
    ) {
      return response
        .status(400)
        .send({ message: "Must fill all fields: title, description, tags" });
    }
    const todoItem = {
      title: request.body.title,
      description: request.body.description,
      tags: request.body.tags,
      status: request.body.status,
    };
    const todo = await Todo.create(todoItem);
    return response.status(200).send({ todoItem: todo });
  } catch (error) {
    console.log(error.message);
    response.status(400).send(error.message);
  }
});

// Get Todos Route
router.get("/", async (request, response) => {
  try {
    const todos = await Todo.find({});
    return response.status(200).send({ count: todos.length, todoItems: todos });
  } catch (error) {
    console.log(error.message);
    response.status(400).send(error.message);
  }
});

// Update Todo Route
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.description ||
      !request.body.tags
    ) {
      return response
        .status(400)
        .send({ message: "Must fill all fields: title, description, tags" });
    }
    const todoItem = {
      title: request.body.title,
      description: request.body.description,
      tags: request.body.tags,
      status: request.body.status,
    };
    const { id } = request.params;
    const result = await Todo.findByIdAndUpdate(id, todoItem);
    if (!result) {
      return response
        .status(404)
        .send({ message: "No todo found with that ID." });
    }
    return response.status(200).send({ message: "Todo updated Successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(400).send(error.message);
  }
});

// Route to Delete todo
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Todo.findByIdAndDelete(id);
    if (!result) {
      return response
        .status(404)
        .send({ message: "No todo found with that ID." });
    }
    return response.status(200).send({ message: "Todo deleted Successfully!" });
  } catch (error) {
    console.log(error.message);
    response.status(400).send(error.message);
  }
});

export default router;
