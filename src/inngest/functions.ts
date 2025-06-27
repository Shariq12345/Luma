import { inngest } from "./client";
import { openai, createAgent } from "@inngest/agent-kit";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("luma-nextjs-test-2");

      return sandbox.sandboxId;
    });
    const codeAgent = createAgent({
      name: "summarizer",
      system:
        "You are an expert next.js developer. You write readable, maintainable code. You provide simple Next.js & React snippets that achieve the solution in minimum lines of code.",
      model: openai({
        model: "gpt-4o",
      }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet:  + ${event.data.value}`
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);

      const host = sandbox.getHost(3000);

      return `https://${host}`;
    });

    return { output, sandboxUrl };
  }
);
