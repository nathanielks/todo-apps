import { test } from "node:test";
import * as assert from "node:assert";
import { build } from "../helper.js";

test("lists todos", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/todos/",
  });

  assert.equal(res.payload, "[]");
});
