import React, { useEffect, useState } from "react";
import Image from "next/image";

const ShimmerMessages = () => {
  const messages = [
    "Understanding your project goals...",
    "Analyzing user intent and branding...",
    "Mapping out site structure and pages...",
    "Designing responsive layout components...",
    "Generating smart copy and content blocks...",
    "Optimizing for SEO and performance...",
    "Applying visual design principles...",
    "Reviewing and refining your website...",
    "Preparing your intelligent website preview...",
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-muted-foreground animate-pulse">
        {messages[currentMessageIndex]}
      </span>
    </div>
  );
};

export const MessageLoading = () => {
  return (
    <div className="flex flex-col group px-2 pb-4">
      <div className="flex items-center gap-2 pl-2 mb-2">
        <Image
          src="/logo.svg"
          alt="Luma"
          width={18}
          height={18}
          className="shrink-0"
        />
        <span className="text-sm font-medium">Luma</span>
      </div>
      <div className="pl-8.5 flex flex-col gap-y-4">
        <ShimmerMessages />
      </div>
    </div>
  );
};
