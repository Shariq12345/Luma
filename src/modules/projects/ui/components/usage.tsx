import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

interface Props {
  points: number;
  msBeforeNext: number;
}

export const Usage = ({ msBeforeNext, points }: Props) => {
  const { has } = useAuth();

  const isGlow = has?.({ plan: "glow_user" });
  const isShine = has?.({ plan: "shine_user" });
  const isRadiate = has?.({ plan: "radiate_user" });

  const isPaidPlan = isShine || isRadiate;
  const labelPrefix = isGlow ? "free " : "";

  return (
    <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
      <div className="flex items-center gap-x-2">
        <div>
          <p className="text-sm">
            {points} {labelPrefix}credits remaining
          </p>
          <p className="text-xs text-muted-foreground">
            Resets in{" "}
            {formatDuration(
              intervalToDuration({
                start: new Date(),
                end: new Date(Date.now() + msBeforeNext),
              }),
              {
                format: ["months", "days", "hours"],
              }
            )}
          </p>
        </div>

        {/* Upgrade button only visible to free users */}
        {!isPaidPlan && (
          <Button asChild variant="tertiary" className="ml-auto" size="sm">
            <Link href="/pricing">
              <CrownIcon className="mr-1 h-4 w-4" />
              Upgrade
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
