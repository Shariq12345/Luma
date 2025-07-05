"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { UserControls } from "@/components/user-controls";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SunMoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const isScrolled = useScroll();
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className={cn(
        "p-4 fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b",
        "bg-white dark:bg-[#0f0f0f]", // Base background
        isScrolled &&
          "backdrop-blur-md shadow-md border-gray-200 dark:border-neutral-800"
      )}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Luma" width={24} height={24} />
          <span className="font-semibold text-lg text-foreground">Luma</span>
        </Link>

        {/* Auth Actions */}
        <SignedOut>
          <div className="flex gap-2">
            <SignUpButton>
              <Button variant="outline" size="sm">
                Sign up
              </Button>
            </SignUpButton>
            <SignInButton>
              <Button size="sm">Sign in</Button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center gap-3">
            {/* Credits Button */}
            <Link href="/usage-track">
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-muted-foreground dark:text-white dark:hover:text-muted-foreground hover:text-foreground"
              >
                Credits
              </Button>
            </Link>

            {/* Appearance Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <SunMoonIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar */}
            <UserControls showName={true} />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};
