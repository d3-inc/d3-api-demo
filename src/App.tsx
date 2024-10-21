"use client";
import { useIsClient } from "./hooks/useIsClient";
import { RootProvider } from "./providers/index";
import { AppView } from "./views/index";

export const App = () => {
  const isClient = useIsClient();
  if (!isClient) return null;
  return (
    <RootProvider>
      <AppView />
    </RootProvider>
  );
};

export default App;
