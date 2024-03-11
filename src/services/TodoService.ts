import { eq } from "drizzle-orm";
import { db } from "../db";
import { todos } from "../db/schema";
type TodoType = {
  id: number;
  title: string;
  completed: 1 | 0;
};

type DTOTodo = Omit<TodoType, "id">;
export class TodoService {
  private todos: TodoType[] = [
    { id: 1, title: "todo 1", completed: 1 },
    { id: 2, title: "todo 2", completed: 0 },
    { id: 3, title: "todo 3", completed: 0 },
    { id: 4, title: "todo 4", completed: 0 },
  ];

  public async getAll() {
    const allTodos = await db.select().from(todos);

    return allTodos;
  }

  public async getById(id: number) {
    const todoMatch = await db.select().from(todos).where(eq(todos.id, id));

    return todoMatch;
  }

  public async createTodo(payload: DTOTodo) {
    const newTodo = await db
      .insert(todos)
      .values(payload)
      .returning()
      .onConflictDoUpdate({
        target: todos.id,
        set: { title: payload.title },
      });

    return newTodo;
  }

  public async updateTodo(payload: TodoType) {
    const updatedTodo = await db
      .update(todos)
      .set({
        ...payload,
      })
      .where(eq(todos.id, payload.id))
      .returning();

    return updatedTodo;
  }

  public async deleteTodo(id: number) {
    const deletedField = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning();

    return deletedField;
  }
}
