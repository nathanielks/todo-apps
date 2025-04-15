import type { FastifyPluginAsync, FastifyRequest } from "fastify";

type AuthGithubCallbackRequest = FastifyRequest<{
  Querystring: { code: string };
}>;

interface GitHubAuthResponse {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  refresh_token_expires_in: string;
}

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/login", async (request, reply) => {
    console.log(fastify.newEntityManager);
    reply.send("hello, world");
  });
  fastify.get(
    "/github/callback",
    {
      schema: {
        querystring: {
          type: "object",
          required: ["code"],
          properties: {
            code: {
              type: "string",
            },
          },
        },
      },
    },
    async (request: AuthGithubCallbackRequest, reply) => {
      const { code } = request.query;
      const res = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
        },
        body: JSON.stringify({
          code,
          client_id: process.env.GITHUB_APP_CLIENT_ID,
          client_secret: process.env.GITHUB_APP_CLIENT_SECRET,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        request.log.error(`Error from Github: ${body}`);
        throw new Error("Failed to authenticate with Github");
      }

      const params = new URLSearchParams(await res.text());
      const tokens: GitHubAuthResponse = {
        access_token: params.get("access_token") ?? "",
        refresh_token: params.get("refresh_token") ?? "",
        expires_in: params.get("expires_in") ?? "",
        refresh_token_expires_in: params.get("refresh_token_expires_in") ?? "",
      };

      reply.send(tokens);
    },
  );
};

export default example;
