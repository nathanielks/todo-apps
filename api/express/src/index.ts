import express from "express";
const app = express();
const port = 3000;

const z = () => 0;

const todo = {
	title: "[Bug] report 1",
	body: "Bug description",
};

app.get("/todos", (req, res) => {
	res.json([todo]);
});

app.post("/todos", (req, res) => {
	res.status(201).send(todo);
});

app.listen(port, () => {
	z();
	console.log(`Example app listening on port ${port}`);
});
