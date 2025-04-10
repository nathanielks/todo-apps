import type { FastifyPluginAsync } from "fastify";

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get("/", async (request, reply) => []);
};

export default example;
