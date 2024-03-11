import { Router } from "express";
import { TodoService } from "./services/TodoService";

const routes = Router();

routes.get("/todo", async (req, res) => {
  const todoService = new TodoService();

  const todos = await todoService.getAll();

  return res.status(200).json(todos);
});

routes.get("/todo/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).send("Missing payload");

  const todoService = new TodoService();
  const todo = await todoService.getById(+id);

  return res.status(200).json(todo);
});

routes.post("/todo", async (req, res) => {
  const newTodo = req.body;

  if (!newTodo) return res.status(404).send("Missing payload");

  const todoService = new TodoService();
  const todos = await todoService.createTodo(newTodo);

  res.status(201).json(todos);
});

routes.put("/todo", async (req, res) => {
  const todoUpdated = req.body;

  if (!todoUpdated) return res.status(404).send("Missing payload");

  const todoService = new TodoService();
  const todos = await todoService.updateTodo(todoUpdated);

  return res.status(200).json(todos);
});

routes.delete("/todo/:todoId", async (req, res) => {
  const { todoId } = req.params;
  console.log(todoId);

  if (!todoId) return res.status(404).send("Missing payload");

  const todoService = new TodoService();
  const todos = await todoService.deleteTodo(+todoId);

  return res.status(200).json(todos);
});

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

export { routes };
