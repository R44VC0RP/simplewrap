"use client";

import { type ReactNode, useState } from "react";

type TabKey = "SDK" | "API";

interface APISDKTabsProps {
  sdk: ReactNode;
  api: ReactNode;
  defaultTab?: TabKey;
}

export function APISDKTabs({ sdk, api, defaultTab = "SDK" }: APISDKTabsProps) {
  const [active, setActive] = useState<TabKey>(defaultTab);

  return (
    <div className="space-y-0">
      <div
        className="flex items-center gap-2"
        role="tablist"
        aria-label="API and SDK tabs"
      >
        <button
          id="tab-sdk"
          role="tab"
          aria-selected={active === "SDK"}
          aria-controls="panel-sdk"
          tabIndex={active === "SDK" ? 0 : -1}
          onClick={() => setActive("SDK")}
          className={
            "inline-flex h-8 items-center justify-center whitespace-nowrap px-3 text-sm " +
            "border transition-colors outline-none -mb-px rounded-t-md rounded-b-none " +
            "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring " +
            (active === "SDK"
              ? "bg-primary text-primary-foreground border-primary border-b-transparent shadow-xs"
              : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-input")
          }
        >
          SDK
        </button>
        <button
          id="tab-api"
          role="tab"
          aria-selected={active === "API"}
          aria-controls="panel-api"
          tabIndex={active === "API" ? 0 : -1}
          onClick={() => setActive("API")}
          className={
            "inline-flex h-8 items-center justify-center whitespace-nowrap px-3 text-sm " +
            "border transition-colors outline-none -mb-px rounded-t-md rounded-b-none " +
            "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring " +
            (active === "API"
              ? "bg-primary text-primary-foreground border-primary border-b-transparent shadow-xs"
              : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-input")
          }
        >
          API
        </button>
      </div>
      <div
        id={active === "SDK" ? "panel-sdk" : "panel-api"}
        role="tabpanel"
        aria-labelledby={active === "SDK" ? "tab-sdk" : "tab-api"}
      >
        <div className="rounded-b-md rounded-tr-md border border-input bg-muted overflow-hidden">
          {active === "SDK" ? sdk : api}
        </div>
      </div>
    </div>
  );
}


