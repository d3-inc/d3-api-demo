import clsx from 'clsx';
import * as React from 'react';
import { Button } from '../ui/button.js';

import { CoinbaseWalletIcon, WalletConnectIcon } from '../icons/wallet.js';
import { useWalletButtons } from './hooks/useWalletButtons.js';

const ButtonContent = ({ icon, label }: { icon?: React.ReactElement | string; label: string }) => {
  return (
    <span className={clsx('flex align-center gap-2 justify-center')}>
      {icon ? <span>{icon}</span> : null}
      <span className="font-semibold text-base">{label}</span>
    </span>
  );
};

export default function EVMWalletButtons() {
  const {
    isCoin98Wallet,
    handleWalletConnection,
    connectors,
    connectWallet,
    areAdditionalInjectorsInserted,
  } = useWalletButtons();

  return (
    <div className={clsx('flex items-center justify-center flex-col gap-3 mt-3')}>
      {Array.from(connectors)
        .reverse()
        .map((connector) => {
          if (areAdditionalInjectorsInserted && connector?.id === 'injected') return null;
          return (
            <Button
              variant={'secondary'}
              key={connector.id}
              disabled={connectWallet?.isConnectInitiated}
              onClick={() => handleWalletConnection(connector)}
              className="w-full"
            >
              {connector?.id.toLowerCase().includes('walletconnect') ? (
                <ButtonContent
                  icon={<WalletConnectIcon width={24} height={24} />}
                  label={connector?.name}
                />
              ) : connector?.id.toLowerCase().includes('coinbase') ? (
                <ButtonContent
                  icon={<CoinbaseWalletIcon width={24} height={24} />}
                  label={connector?.name}
                />
              ) : connector?.id !== 'injected' ? (
                <span className={clsx('flex items-center gap-2 justify-center')}>
                  <span>
                    {/* Connector could contain icon links for third party domains and for the next.js Image component to work, */}
                    {/* they need to be added to the domain list first. Which might not possible without a thorough testing */}
                    {connector?.icon ? (
                      <img src={connector.icon} alt={connector.name} width={24} height={24} />
                    ) : null}
                  </span>
                  <span className="font-semibold text-base">{connector.name}</span>
                </span>
              ) : connector?.id === 'injected' && isCoin98Wallet() ? (
                <ButtonContent label={'Coin98'} icon={connector.icon} />
              ) : (
                <ButtonContent
                  label={'MetaMask'}
                  icon={
                    connector.icon || (
                      <img
                        src="https://d3.app/images/icons/MetaMask.png"
                        alt="metamask"
                        width={24}
                        height={24}
                      />
                    )
                  }
                />
              )}
            </Button>
          );
        })}
    </div>
  );
}
