import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "node",
		setupFiles: ["test/setupTests.ts"],
		typecheck: {
			tsconfig: "test/tsconfig.json",
		},
	},
});
