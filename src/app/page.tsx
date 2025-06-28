"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const { data: messages } = useQuery(trpc.messages.getMany.queryOptions());
  const [value, setValue] = useState("");
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("Message created successfully!");
      },
    })
  );

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-3">
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button onClick={() => createMessage.mutate({ value: value })}>
        Invoke Background Job
      </Button>
      {JSON.stringify(messages, null, 2) && (
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(messages, null, 2)
            .split("\n")
            .map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
        </pre>
      )}
    </div>
  );
}
