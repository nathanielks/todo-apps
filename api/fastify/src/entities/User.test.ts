import { newUser } from "./entities.js";
import { describe, it } from "vitest";
import { newEntityManager } from "../../test/setupTests.js";

describe("User", () => {
  it("works", async () => {
    const em = newEntityManager();
    newUser(em, { email: "foo@example.com", password: "somehash" });
    await em.flush();
  });
});
