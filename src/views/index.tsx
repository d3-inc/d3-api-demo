"use client";
import { lazy, Suspense, useState } from "react";
import { TooltipProvider } from "../components/ui/tooltipComponent.js";
import { ThemeProvider } from "../providers/themeProvider.js";
import { WidgetButton } from "./widgetButton/index.js";
import { FallbackLoader } from "./rootLayout/fallbackLoader.js";

const WidgetLayout = lazy(() => import("./rootLayout/index.js"));

export const AppView = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  return (
    <ThemeProvider defaultTheme={"auto"}>
      <div className="d3">
        <TooltipProvider>
          <WidgetButton
            isWidgetOpen={isWidgetOpen}
            onClick={() => setIsWidgetOpen((old) => !old)}
          />
          {isWidgetOpen ? (
            <Suspense fallback={<FallbackLoader />}>
              <WidgetLayout />
            </Suspense>
          ) : null}
        </TooltipProvider>
      </div>
    </ThemeProvider>
  );
};
