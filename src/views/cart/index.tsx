import { Loader2 } from "lucide-react";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { useStore } from "../../state/store/index.js";
import { CartHeader } from "./cartHeader.js";
import { CartItems } from "./cartItems.js";
import { CartPaymentMethods } from "./cartPaymentMethods.js";
import { useCheckout } from "./hooks/useCheckout.js";
import { PurchaseSuccess } from "./purchaseSuccess.js";

export const CartView = () => {
  const setAppSettings = useStore(
    useCallback((state) => state.setAppSettings, [])
  );
  const cart = useStore(useShallow((state) => state.cart));
  const handleSearchView = () => {
    setAppSettings({ isCartViewOpen: false });
  };
  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    handleStartCheckout,
    checkoutState,
    setCheckoutState,
    startCheckoutOrder,
    paymentOptions,
    isPaymentOptionsError,
    isPaymentOptionsLoading,
    paymentOptionsError,
    isSwitchNetworkInProgress,
  } = useCheckout();

  if (checkoutState.isOrderSuccess) {
    return (
      <div className="px-2 flex flex-col gap-y-2 flex-grow">
        <PurchaseSuccess handleSearch={handleSearchView} />
      </div>
    );
  }
  if (isPaymentOptionsLoading) {
    return (
      <div className="px-2 flex items-center justify-center my-5">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className="px-2 flex flex-col gap-y-2 flex-grow">
      <CartHeader handleBack={handleSearchView} />
      {cart.items?.length && paymentOptions?.options?.length ? (
        <CartPaymentMethods
          selectedPaymentMethod={selectedPaymentMethod}
          setSelectedPaymentMethod={setSelectedPaymentMethod}
          paymentOptions={paymentOptions}
          isPaymentOptionsLoading={isPaymentOptionsLoading}
        />
      ) : null}
      <CartItems
        selectedPaymentMethod={selectedPaymentMethod}
        handleStartCheckout={handleStartCheckout}
        checkoutState={checkoutState}
        setCheckoutState={setCheckoutState}
        startCheckoutOrder={startCheckoutOrder}
        paymentOptions={paymentOptions}
        isPaymentOptionsLoading={isPaymentOptionsLoading}
        isPaymentOptionsError={isPaymentOptionsError}
        paymentOptionsError={paymentOptionsError}
        isSwitchNetworkInProgress={isSwitchNetworkInProgress}
      />
    </div>
  );
};
