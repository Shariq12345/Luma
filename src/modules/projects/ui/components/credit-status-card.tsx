import { formatDuration, intervalToDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CrownIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  remainingPoints: number;
  msBeforeNext: number;
}

export const CreditStatusCard = ({ remainingPoints, msBeforeNext }: Props) => {
  const resetIn = formatDuration(
    intervalToDuration({
      start: new Date(),
      end: new Date(Date.now() + msBeforeNext),
    }),
    { format: ["days", "hours"] }
  );

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-foreground">
          Credits
        </CardTitle>
        <Button asChild size="sm" variant="outline">
          <Link href="/pricing">
            <CrownIcon className="h-4 w-4 mr-1" />
            Upgrade
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-col">
          <span className="text-5xl font-bold text-foreground leading-tight">
            {remainingPoints}
          </span>
          <span className="text-sm text-muted-foreground">
            credits remaining
          </span>
        </div>

        <div className="text-sm text-muted-foreground">
          Resets in: <span className="font-medium">{resetIn}</span>
        </div>
      </CardContent>
    </Card>
  );
};
