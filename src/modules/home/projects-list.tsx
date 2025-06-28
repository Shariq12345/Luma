"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";

export const ProjectsList = () => {
  const { isSignedIn } = useUser();
  const trpc = useTRPC();

  // Always call the hook, but only enable it if signed in
  const { data: projects } = useQuery({
    ...trpc.projects.getMany.queryOptions(),
    enabled: isSignedIn,
  });

  if (!isSignedIn) {
    return (
      <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border text-center space-y-4">
        <Image
          src="/logo.svg"
          alt="Luma Logo"
          width={36}
          height={36}
          className="mx-auto"
        />
        <h2 className="text-xl font-semibold">Sign in to view your Lumens</h2>
        <p className="text-muted-foreground max-w-sm mx-auto text-sm">
          To access your saved projects and continue building with Luma, please
          sign in or create a free account.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link href="/sign-in">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white dark:bg-sidebar rounded-xl p-8 border flex flex-col gap-y-6 sm:gap-y-4">
      <h2 className="text-2xl font-semibold">Saved Lumens</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {projects?.length === 0 && (
          <div className="col-span-full text-center">
            <p className="text-sm text-muted-foreground">
              No projects found. Start creating your first Lumen!
            </p>
          </div>
        )}
        {projects?.map((project) => (
          <Button
            key={project.id}
            variant="outline"
            className="font-normal h-auto justify-start w-full text-start p-4"
            asChild
          >
            <Link href={`/projects/${project.id}`}>
              <div className="flex items-center gap-x-4">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={22}
                  height={22}
                  className="object-contain"
                />
                <div className="flex flex-col">
                  <h3 className="truncate font-medium">{project.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {formatDistanceToNow(new Date(project.updatedAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};
