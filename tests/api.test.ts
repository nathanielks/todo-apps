import { test, expect } from "@playwright/test";

test("should create todo", async ({ request }) => {
	const newTodo = await request.post("/todos", {
		data: {
			title: "[Bug] report 1",
			body: "Bug description",
		},
	});
	expect(newTodo.ok()).toBeTruthy();

	const todos = await request.get("/todos");
	expect(todos.ok()).toBeTruthy();
	expect(await todos.json()).toContainEqual(
		expect.objectContaining({
			title: "[Bug] report 1",
			body: "Bug description",
		}),
	);
});
