import type { Cart, ConnectWallet, AppSettings } from "./types.js";

export const appSettings: AppSettings = {
  isCartViewOpen: false,
  isOrderSuccess: false,
  isWalletModalOpen: false,
};

export const initialCart: Cart = {
  items: [],
  isCheckoutInProgress: false,
};

export const connectWallet: ConnectWallet = {
  isConnectInitiated: false,
  isConnectInProgress: false,
  isEvmLoaded: false,
  evmWallet: null,
};
