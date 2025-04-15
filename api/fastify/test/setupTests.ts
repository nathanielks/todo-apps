import { EntityManager } from "../src/entities/entities.js";
import { knex as createKnex, type Knex } from "knex";
import { PostgresDriver } from "joist-orm";
import { newPgConnectionConfig } from "joist-utils";
import { beforeEach, afterAll, test } from "vitest";

let knex: Knex;

// Knex is used as a single/global connection pool + query builder
function getKnex(): Knex {
	knex ??= createKnex({
		client: "pg",
		connection: newPgConnectionConfig() as any,
		debug: false,
		asyncStackTraces: true,
	});
	return knex;
}

export function newEntityManager() {
	return new EntityManager({}, new PostgresDriver(getKnex()));
}

beforeEach(async () => {
	const knex = await getKnex();
	await knex.select(knex.raw("flush_database()"));
});

afterAll(async () => {
	if (knex) {
		await knex.destroy();
	}
});
