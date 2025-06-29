import { RateLimiterPrisma } from "rate-limiter-flexible";
import { prisma } from "./database";
import { auth } from "@clerk/nextjs/server";

const FREE_POINTS = 3;
const SHINE_POINTS = 50;
const RADIATE_POINTS = 75;
const DURATION = 30 * 24 * 60 * 60; // 30 days
const GENERATION_COST = 1; // Cost per generation

export async function getUsageTracker() {
  const { has } = await auth();

  const hasShineAccess = has({ plan: "shine_user" });
  const hasRadiateAccess = has({ plan: "radiate_user" });

  const usageTracker = new RateLimiterPrisma({
    storeClient: prisma,
    tableName: "Usage",
    points: hasRadiateAccess
      ? RADIATE_POINTS
      : hasShineAccess
      ? SHINE_POINTS
      : FREE_POINTS,
    duration: DURATION,
  });

  return usageTracker;
}

export async function consumeCredits() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.consume(userId, GENERATION_COST);

  return result;
}

export async function getUsageStatus() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const usageTracker = await getUsageTracker();
  const result = await usageTracker.get(userId);

  return result;
}
