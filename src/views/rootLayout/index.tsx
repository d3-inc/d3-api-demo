import { useShallow } from 'zustand/react/shallow';
import { Toaster } from '../../components/ui/toaster.js';
import { useStore } from '../../state/store/index.js';
import { CartView } from '../cart/index.js';
import { ConnectWallet } from '../connectWallet/index.js';
import { Search } from '../search/index.js';

const appTlds = import.meta.env.VITE_TLDS;

const RootLayout = () => {
  const appSettings = useStore(useShallow((state) => state.appSettings));

  if (!appTlds) return null;
  return (
    <div
      className={
        'flex flex-col w-[93svw] h-dvh max-h-[90svh] max-w-[450px] bg-primary-foreground rounded-lg overflow-auto shadow-xl'
      }
    >
      <ConnectWallet />
      {appSettings.isCartViewOpen ? <CartView /> : <Search />}
      <Toaster />
    </div>
  );
};

export default RootLayout;
