"use client";

import { useCallback, useState } from "react";

type CopyButtonPosition = "left" | "right" | "none";

interface ClickToCopyProps {
  copyButton?: CopyButtonPosition;
  text: string;
  variant?: "default" | "minimal";
}

export function ClickToCopy({ copyButton = "right", text, variant = "default" }: ClickToCopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }, [text]);

  const CopyIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="size-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16.5H6.75A2.25 2.25 0 0 1 4.5 14.25V6.75A2.25 2.25 0 0 1 6.75 4.5h7.5A2.25 2.25 0 0 1 16.5 6.75V8M9.75 9.75h7.5A2.25 2.25 0 0 1 19.5 12v6a2.25 2.25 0 0 1-2.25 2.25h-7.5A2.25 2.25 0 0 1 7.5 18V12a2.25 2.25 0 0 1 2.25-2.25Z"
      />
    </svg>
  );

  const CheckIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className="size-4 text-green-600"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
    </svg>
  );

  const codeClassName =
    variant === "minimal"
      ? "font-mono text-sm inline-flex items-center gap-2 p-0 bg-transparent border-0 rounded-none"
      : "font-mono text-sm bg-accent text-foreground rounded-md border px-2 py-1 inline-flex items-center gap-2";

  return (
    <div
      className="inline-flex items-center cursor-pointer select-none"
      onClick={() => void handleCopy()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          void handleCopy();
        }
      }}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      title={copied ? "Copied" : "Copy to clipboard"}
    >
      <code className={codeClassName}>
        {copyButton === "left" && (copied ? CheckIcon : CopyIcon)}
        <span>{text}</span>
        {copyButton === "right" && (copied ? CheckIcon : CopyIcon)}
      </code>
    </div>
  );
}


