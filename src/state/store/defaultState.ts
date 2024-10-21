import type { Cart, ConnectWallet, WidgetSettings } from "./types.js";

export const widgetSettings: WidgetSettings = {
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
