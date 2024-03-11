import { db } from ".";
import * as schema from "./schema";

await db.insert(schema.todos).values([
  {
    title: "Study Javascript",
    completed: 1,
  },
  {
    title: "Create Database",
    completed: 1,
  },
  {
    title: "Populate database",
    completed: 0,
  },
]);
console.log("Seeding complete");
