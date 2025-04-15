import fp from "fastify-plugin";
import { EntityManager } from "../entities/entities.js";
import { newPgConnectionConfig, PostgresDriver } from "joist-orm";
import { knex as createKnex, type Knex } from "knex";

declare module "fastify" {
  interface FastifyInstance {
    newEntityManager: () => EntityManager;
  }
}

export default fp(async function dbPlugin(fastify) {
  // Create our global knex connection
  const knex: Knex = createKnex({
    client: "pg",
    connection: newPgConnectionConfig(),
    debug: false,
    asyncStackTraces: true,
  });

  // Create a helper method for our requests to create a new EntityManager
  function newEntityManager(): EntityManager {
    // If you have a per-request context object, you can create that here
    const ctx = {};
    return new EntityManager(ctx, new PostgresDriver(knex));
  }

  fastify.decorate("newEntityManager", newEntityManager);
});
