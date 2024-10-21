import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

import { isProductionEnv } from "../../config/appConfig.js";
import { connectWallet, initialCart, appSettings } from "./defaultState.js";
import type { Cart, ConnectWallet, AppSettings } from "./types.js";

const createStore = combine(
  {
    appSettings: { ...appSettings },
    cart: { ...initialCart },
    connectWallet: { ...connectWallet },
  },
  (set) => ({
    setAppSettings: (newState: AppSettings) =>
      set((prevState) => ({
        appSettings: {
          ...prevState.appSettings,
          isCartViewOpen:
            newState.isCartViewOpen ??
            prevState?.appSettings?.isCartViewOpen,
          isOrderSuccess:
            newState.isOrderSuccess ??
            prevState?.appSettings?.isOrderSuccess,
          isWalletModalOpen:
            newState.isWalletModalOpen ??
            prevState?.appSettings?.isWalletModalOpen,
        },
      })),
    setCart: (newState: Cart) =>
      set((prevState) => ({
        cart: {
          ...prevState.cart,
          isCheckoutInProgress:
            newState.isCheckoutInProgress ??
            prevState?.cart?.isCheckoutInProgress,
          items: newState.items ?? prevState?.cart?.items,
        },
      })),
    setConnectWallet: (newState: ConnectWallet) =>
      set((prevState) => ({
        connectWallet: {
          ...prevState.connectWallet,
          isConnectInitiated:
            newState.isConnectInitiated ??
            prevState?.connectWallet?.isConnectInitiated,
          isEvmLoaded:
            newState.isEvmLoaded ?? prevState?.connectWallet?.isEvmLoaded,
          evmWallet: newState.evmWallet ?? prevState?.connectWallet?.evmWallet,
          isConnectInProgress:
            newState.isConnectInProgress ??
            prevState?.connectWallet?.isConnectInProgress,
        },
      })),
    resetCart: () =>
      set({
        cart: { ...initialCart },
      }),
    resetState: () =>
      set({
        connectWallet: { ...connectWallet },
      }),
  })
);
export const useStore = isProductionEnv
  ? create(createStore)
  : create(devtools(createStore));
