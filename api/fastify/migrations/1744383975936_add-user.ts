import {
	createCreatedAtFunction,
	createEntityTable,
	createUpdatedAtFunction,
	foreignKey,
} from "joist-migration-utils";
import type { MigrationBuilder } from "node-pg-migrate";

export function up(b: MigrationBuilder): void {
	createUpdatedAtFunction(b);
	createCreatedAtFunction(b);

	createEntityTable(b, "users", {
		email: { type: "varchar(255)", notNull: true },
		// username: { type: "varchar(255)", notNull: true },
		// password: { type: "varchar(255)", notNull: true },
	});
}
