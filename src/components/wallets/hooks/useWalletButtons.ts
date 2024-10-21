import * as React from 'react';
import { useAccount, useConfig, useConnect, type Connector } from 'wagmi';
import { disconnect } from 'wagmi/actions';
import { useShallow } from 'zustand/react/shallow';

import { useToast } from '../../../hooks/useToast.js';
import { useStore } from '../../../state/store/index.js';
import { createMetaMaskDeepLink } from '../../../utils/wallets.js';

export const useWalletButtons = () => {
  const { toast } = useToast();
  const setConnectWallet = useStore(React.useCallback((state) => state.setConnectWallet, []));
  const connectWallet = useStore(useShallow((state) => state.connectWallet));

  const wagmiConfig = useConfig();

  const { connect, connectors } = useConnect();
  const { address } = useAccount();

  const areAdditionalInjectorsInserted = connectors?.length > 2;

  const handleWalletConnection = async (connector: Connector) => {
    const isInjectedBrowser = !isCoin98Wallet();

    if (!areAdditionalInjectorsInserted && connector?.type === 'injected' && isInjectedBrowser) {
      createMetaMaskDeepLink();
      return;
    }
    if (address) {
      disconnect(wagmiConfig);
    }
    connect(
      { connector },
      {
        onError: async (error) => {
          const errorCode = error?.name;
          if (errorCode === 'ConnectorAlreadyConnectedError') {
            disconnect(wagmiConfig);
          }
          setConnectWallet({ isConnectInitiated: false });
          const errorMessage = error?.message ?? `Something went wrong. Please try again`;

          toast({
            title: errorMessage,
          });
        },
      },
    );
    setConnectWallet({ isConnectInitiated: true });
  };

  const isCoin98Wallet = () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    return /coin98/i.test(userAgent);
  };
  return {
    isCoin98Wallet,
    handleWalletConnection,
    connectors,
    connectWallet,
    areAdditionalInjectorsInserted,
  };
};
