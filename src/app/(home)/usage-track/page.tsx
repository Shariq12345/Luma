"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircleIcon } from "lucide-react";
import { CreditStatusCard } from "@/modules/projects/ui/components/credit-status-card";

export default function UsagePage() {
  const trpc = useTRPC();
  const { data: usage } = useQuery(trpc.usage.status.queryOptions());

  return (
    <div className="max-w-6xl mx-auto px-6 pt-[16vh] 2xl:pt-32">
      <h1 className="text-4xl font-bold mb-2 text-foreground tracking-tight">
        Credits
      </h1>
      <p className="text-muted-foreground text-sm mb-10">
        Track your credit usage and purchase more if needed.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Usage Card */}
        <CreditStatusCard
          remainingPoints={usage?.remainingPoints ?? 0}
          msBeforeNext={usage?.msBeforeNext ?? 0}
        />

        {/* Purchase Card */}
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold text-foreground">
              Purchase More
            </CardTitle>
            <Button variant="ghost" size="sm">
              <PlusCircleIcon className="mr-1 h-4 w-4" />
              Buy Credits
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { credits: 10, price: "$5" },
                { credits: 25, price: "$10" },
                { credits: 50, price: "$18" },
                { credits: 100, price: "$30" },
              ].map((option) => (
                <div
                  key={option.credits}
                  className="rounded-lg border hover:shadow-md transition p-4 flex flex-col items-center justify-center text-center bg-muted/50"
                >
                  <p className="text-2xl font-bold text-foreground">
                    {option.credits}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">credits</p>
                  <Button
                    variant="outline"
                    className="w-full text-sm font-medium"
                  >
                    {option.price}
                  </Button>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Payments handled securely. Credits do not auto-renew.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
