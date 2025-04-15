import { test } from "vitest";
import * as assert from "node:assert";
import { build } from "../helper.js";

test("lists todos", async () => {
	const app = await build();

	const res = await app.inject({
		url: "/todos/",
	});

	assert.equal(res.payload, "[]");
});
