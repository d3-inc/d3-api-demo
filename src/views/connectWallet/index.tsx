import { useShallow } from 'zustand/react/shallow';
import { useEvmConnectWallet } from '../../hooks/useEvmConnectWallet.js';
import { useStore } from '../../state/store/index.js';
import { ConnectWalletModal } from './connectWalletModal.js';
import { HeaderDropdown } from './headerDropdown.js';

type ConnectWalletProps = {
  isButtonDisabled?: boolean;
};

export function ConnectWallet({ isButtonDisabled }: ConnectWalletProps) {
  const connectWallet = useStore(useShallow((state) => state.connectWallet));
  const { address } = useEvmConnectWallet();

  return (
    <>
      {!connectWallet.evmWallet ? (
        <ConnectWalletModal isButtonDisabled={isButtonDisabled} />
      ) : (
        <HeaderDropdown evmAddress={address} />
      )}
    </>
  );
}
