'use client';
import { lazy } from 'react';
import { TooltipProvider } from '../components/ui/tooltipComponent.js';
import { ThemeProvider } from '../providers/themeProvider.js';

const RootLayout = lazy(() => import('./rootLayout/index.js'));

export const AppView = () => {
  return (
    <ThemeProvider defaultTheme={'auto'}>
      <div className="d3 flex items-center justify-center w-full h-full relative">
        <TooltipProvider>
          <RootLayout />
        </TooltipProvider>
      </div>
    </ThemeProvider>
  );
};
