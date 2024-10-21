'use client';
import { lazy, Suspense } from 'react';
import { TooltipProvider } from '../components/ui/tooltipComponent.js';
import { ThemeProvider } from '../providers/themeProvider.js';
import { FallbackLoader } from './rootLayout/fallbackLoader.js';

const RootLayout = lazy(() => import('./rootLayout/index.js'));

export const AppView = () => {
  return (
    <ThemeProvider defaultTheme={'auto'}>
      <div className="d3 flex items-center justify-center w-full h-full relative">
        <TooltipProvider>
          <Suspense fallback={<FallbackLoader />}>
            <RootLayout />
          </Suspense>
        </TooltipProvider>
      </div>
    </ThemeProvider>
  );
};
