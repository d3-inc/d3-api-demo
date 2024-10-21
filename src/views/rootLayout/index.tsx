import { useShallow } from 'zustand/react/shallow';
import { Toaster } from '../../components/ui/toaster.js';
import { D3_DEVELOPER_DASHBOARD_LINK } from '../../config/constants.js';
import { useStore } from '../../state/store/index.js';
import { CartView } from '../cart/index.js';
import { ConnectWallet } from '../connectWallet/index.js';
import { Search } from '../search/index.js';

const appTlds = import.meta.env.VITE_TLDS;

const RootLayout = () => {
  const appSettings = useStore(useShallow((state) => state.appSettings));

  // TO-DO: Add API key validation
  if (!appTlds) {
    return (
      <div
        className={
          'flex flex-col w-[93svw] h-[560px] max-h-[75svh] max-w-[400px] border bg-primary-foreground rounded-lg absolute bottom-16 right-0 overflow-auto shadow-xl dark:border dark:border-interactive-border'
        }
      >
        <p className="text-xs text-red-600 mt-4 p-3 text-left">
          Please configure a list of valid tlds for this search demo. You can get a list of valid
          tlds from{' '}
          <a href={D3_DEVELOPER_DASHBOARD_LINK} target="_blank" rel="noreferrer">
            D3 Dashboard
          </a>
          .
        </p>
      </div>
    );
  }
  return (
    <div
      className={
        'flex flex-col w-[93svw] h-full max-h-[75svh] max-w-[450px] bg-primary-foreground rounded-lg overflow-auto shadow-xl'
      }
    >
      <ConnectWallet />
      {appSettings.isCartViewOpen ? <CartView /> : <Search />}
      <Toaster />
    </div>
  );
};

export default RootLayout;
