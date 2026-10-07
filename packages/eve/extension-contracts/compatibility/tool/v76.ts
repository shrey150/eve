import { decide } from "#public/ai/index.js";
import { defineTool } from "#public/tools/index.js";
import { z } from "zod";

export default defineTool({
  description: "Classify a support request.",
  inputSchema: z.object({ request: z.string() }),
  async execute({ request }, ctx) {
    const result = await decide({
      state: { request },
      questions: {
        team: {
          type: "choice",
          instructions: "Choose the team that can answer the request.",
          criteria: { billing: "Billing questions", support: "Product questions" },
        },
      },
      abortSignal: ctx.abortSignal,
    });
    return { team: result.answers.team.choice };
  },
});
