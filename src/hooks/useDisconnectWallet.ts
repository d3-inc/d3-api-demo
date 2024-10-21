import { useCallback } from 'react';
import { useConfig } from 'wagmi';
import { disconnect } from 'wagmi/actions';
import { useStore } from '../state/store/index.js';

export const useDisconnectWallet = () => {
  const resetState = useStore(useCallback((state) => state.resetState, []));
  const WagmiConfig = useConfig();
  const handleDisconnectWallet = useCallback(async () => {
    resetState();
    disconnect(WagmiConfig);
  }, [resetState, WagmiConfig]);

  return { handleDisconnectWallet };
};
