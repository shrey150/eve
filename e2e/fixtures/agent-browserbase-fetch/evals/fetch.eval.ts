import { defineEval } from "eve/evals";

const TARGET_URL = "https://example.com/";

export default defineEval({
  tags: ["real-model"],
  description: "Browserbase Gateway fetch returns a public page for the agent to read.",
  async test(t) {
    const turn = await t.send(
      [
        "Bob is checking the public example page used in an onboarding guide.",
        `Use web_fetch once with URL ${JSON.stringify(TARGET_URL)}.`,
        "Explain the page's purpose in one sentence.",
      ].join("\n"),
    );

    turn.expectOk();
    turn.calledTool("web_fetch", {
      count: 1,
      input: { url: TARGET_URL },
      output: (value) => {
        if (
          typeof value !== "object" ||
          value === null ||
          !("statusCode" in value) ||
          !("content" in value) ||
          !("contentType" in value)
        ) {
          return false;
        }
        return (
          value.statusCode === 200 &&
          typeof value.content === "string" &&
          value.content.includes("documentation") &&
          typeof value.contentType === "string" &&
          value.contentType.includes("markdown")
        );
      },
    });
    turn.noFailedActions();
    turn.messageIncludes("documentation");
  },
});
