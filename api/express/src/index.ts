import express from "express";
import { ulid } from "ulid";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ephemerally store things for now
const todos = new Map();

app.get("/todos", (req, res) => {
  res.json(Array.from(todos.values()));
});

app.post("/todos", (req, res) => {
  const id = ulid();
  const todo = todos.set(id, {
    ...req.body,
    id,
  });
  res.status(201).send(todo);
});

const port = process.env.API_PORT ?? 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
