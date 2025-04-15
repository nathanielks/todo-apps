import { newUser } from "./entities";

describe("User", () => {
  it("works", async () => {
    const em = newEntityManager();
    newUser(em);
    await em.flush();
  });
});
