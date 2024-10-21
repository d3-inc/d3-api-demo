import { useShallow } from 'zustand/react/shallow';
import { Button } from '../../components/ui/button.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog.js';
import EVMWalletButtons from '../../components/wallets/evmWalletButtons.js';
import { useStore } from '../../state/store/index.js';

type ConnectWalletProps = {
  isButtonDisabled?: boolean;
};

export function ConnectWalletModal({ isButtonDisabled }: ConnectWalletProps) {
  const appSettings = useStore(useShallow((state) => state.appSettings));
  const connectWallet = useStore(useShallow((state) => state.connectWallet));
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="w-[150px] ms-auto">
          <div className="flex items-end justify-end my-2 pe-2">
            <Button
              aria-label="connect wallet"
              disabled={
                isButtonDisabled ||
                appSettings.isWalletModalOpen ||
                connectWallet.isConnectInProgress
              }
            >
              Connect Wallet
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent aria-describedby="connect wallet modal" className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Wallet</DialogTitle>
          </DialogHeader>
          <EVMWalletButtons />
        </DialogContent>
      </Dialog>
    </>
  );
}
