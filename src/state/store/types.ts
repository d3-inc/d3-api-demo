import type { SearchResult } from "../../types/api";

export type AppSettings = {
  isCartViewOpen?: boolean;
  isOrderSuccess?: false;
  isWalletModalOpen?: false;
};

export type Cart = {
  items?: SearchResult[];
  isCheckoutInProgress?: boolean;
};

export type ConnectWallet = {
  isConnectInitiated?: boolean;
  isConnectInProgress?: boolean;
  isEvmLoaded?: boolean;
  evmWallet?: `0x${string}` | null;
};
