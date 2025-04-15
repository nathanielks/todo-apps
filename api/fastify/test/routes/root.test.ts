import { test } from "vitest";
import * as assert from "node:assert";
import { build } from "../helper.js";

test("default root route", async (t) => {
	const app = await build();

	const res = await app.inject({
		url: "/",
	});
	assert.deepStrictEqual(JSON.parse(res.payload), { root: true });
});
