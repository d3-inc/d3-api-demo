import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

import { isProductionEnv } from "../../config/appConfig.js";
import { connectWallet, initialCart, widgetSettings } from "./defaultState.js";
import type { Cart, ConnectWallet, WidgetSettings } from "./types.js";

const createStore = combine(
  {
    widgetSettings: { ...widgetSettings },
    cart: { ...initialCart },
    connectWallet: { ...connectWallet },
  },
  (set) => ({
    setWidgetSettings: (newState: WidgetSettings) =>
      set((prevState) => ({
        widgetSettings: {
          ...prevState.widgetSettings,
          isCartViewOpen:
            newState.isCartViewOpen ??
            prevState?.widgetSettings?.isCartViewOpen,
          isOrderSuccess:
            newState.isOrderSuccess ??
            prevState?.widgetSettings?.isOrderSuccess,
          isWalletModalOpen:
            newState.isWalletModalOpen ??
            prevState?.widgetSettings?.isWalletModalOpen,
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
