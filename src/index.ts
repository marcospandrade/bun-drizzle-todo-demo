import express from "express";
import { routes } from "./routes";

const port = 8080;

const app = express();
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
