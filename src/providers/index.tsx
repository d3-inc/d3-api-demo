import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import React, { useMemo } from "react";
import { WagmiProvider } from "wagmi";
import { getWagmiConfig } from "../config/evmConfig.js";
import queryClient from "../config/queryClient.js";

interface AppProviderProps {
  children: ReactNode;
}

export const RootProvider: React.FC<AppProviderProps> = ({ children }) => {
  const wagmiConfig = useMemo(() => getWagmiConfig(), []);
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
