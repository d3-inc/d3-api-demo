import { useCallback, useEffect } from 'react';
import { useAccount, useAccountEffect, useConfig } from 'wagmi';
import { disconnect } from 'wagmi/actions';
import { useShallow } from 'zustand/react/shallow';

import { useStore } from '../state/store/index.js';

export function useEvmConnectWallet() {
  const setConnectWallet = useStore(useCallback((state) => state.setConnectWallet, []));
  const setAppSettings = useStore(useCallback((state) => state.setAppSettings, []));
  const connectWallet = useStore(useShallow((state) => state.connectWallet));
  const appSettings = useStore(useShallow((state) => state.appSettings));
  const { address } = useAccount();
  const wagmiConfig = useConfig();
  useAccountEffect({
    onConnect({ address, isReconnected }) {
      fetchAccountData({ address, isReconnected });
    },
  });

  useEffect(() => {
    setConnectWallet({ isEvmLoaded: true });
  }, [setConnectWallet]);

  async function fetchAccountData({
    address,
    isReconnected,
  }: {
    address: `0x${string}`;
    isReconnected: boolean;
  }) {
    if (!connectWallet.isConnectInitiated) {
      setConnectWallet({
        isConnectInProgress: false,
        isConnectInitiated: false,
      });
      disconnect(wagmiConfig);
      return;
    }
    if (isReconnected || !connectWallet?.isConnectInitiated) {
      if (appSettings?.isWalletModalOpen) {
        setAppSettings({ isWalletModalOpen: false });
      }
      return;
    }

    await handleConnectWalletResponse({ address });
  }

  const handleConnectWalletResponse = async ({ address }: { address: `0x${string}` }) => {
    setConnectWallet({
      isConnectInitiated: false,
      isConnectInProgress: false,
      evmWallet: address,
    });
    setAppSettings({
      isWalletModalOpen: false,
    });
  };

  return { address };
}
