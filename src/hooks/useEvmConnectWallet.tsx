import { useCallback, useEffect } from 'react';
import { useAccount, useAccountEffect, useConfig } from 'wagmi';
import { disconnect } from 'wagmi/actions';
import { useShallow } from 'zustand/react/shallow';

import { useStore } from '../state/store/index.js';

export function useEvmConnectWallet() {
  const setConnectWallet = useStore(useCallback((state) => state.setConnectWallet, []));
  const setWidgetSettings = useStore(useCallback((state) => state.setWidgetSettings, []));
  const connectWallet = useStore(useShallow((state) => state.connectWallet));
  const widgetSettings = useStore(useShallow((state) => state.widgetSettings));
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
      if (widgetSettings?.isWalletModalOpen) {
        setWidgetSettings({ isWalletModalOpen: false });
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
    setWidgetSettings({
      isWalletModalOpen: false,
    });
  };

  return { address };
}
