import { inngest } from "./client";
import { Agent, openai, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
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

    return { output };
  }
);
