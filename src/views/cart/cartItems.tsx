import type { UseMutationResult } from "@tanstack/react-query";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { CartItem } from "../../components/cart/cartItem.js";
import { Button } from "../../components/ui/button.js";
import { ScrollArea } from "../../components/ui/scrollArea.js";
import { useCart } from "../../hooks/useCart.js";
import { useStore } from "../../state/store/index.js";
import type {
  ApiErrorResponse,
  CheckoutOrderRequestResponse,
  PaymentOption,
  PaymentOptionRequestResponse,
} from "../../types/api.js";
import { cn } from "../../utils/twMerge.js";
import { CheckoutError } from "./checkoutError.js";
import type {
  CheckoutState,
  StartCheckoutOrderPayload,
} from "./hooks/types.js";

type CartItemsProps = {
  selectedPaymentMethod: PaymentOption | null;
  setCheckoutState: Dispatch<SetStateAction<CheckoutState>>;
  checkoutState: CheckoutState;
  handleStartCheckout: () => Promise<void>;
  paymentOptions?: PaymentOptionRequestResponse;
  isPaymentOptionsError: boolean;
  isSwitchNetworkInProgress: boolean;
  isPaymentOptionsLoading: boolean;
  paymentOptionsError: ApiErrorResponse | null;
  startCheckoutOrder: UseMutationResult<
    CheckoutOrderRequestResponse,
    ApiErrorResponse,
    StartCheckoutOrderPayload,
    unknown
  >;
};

export function CartItems({
  selectedPaymentMethod,
  checkoutState,
  handleStartCheckout,
  startCheckoutOrder,
  paymentOptions,
  isPaymentOptionsError,
  isPaymentOptionsLoading,
  paymentOptionsError,
  isSwitchNetworkInProgress,
}: CartItemsProps) {
  const setAppSettings = useStore(
    useCallback((state) => state.setAppSettings, [])
  );
  const cart = useStore(useShallow((state) => state.cart));

  const { handleRemoveFromCart } = useCart();
  if (!cart?.items?.length) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center flex-grow">
        <p className="text-md">
          Looks like you haven&apos;t added anything to your cart yet.
        </p>
        <Button
          variant="secondary"
          onClick={() => setAppSettings({ isCartViewOpen: false })}
        >
          Back to Search
        </Button>
      </div>
    );
  }
  if (!paymentOptions?.options?.length) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center flex-grow">
        <p className="text-md">
          No payment methods found for this checkout. Please try again
        </p>
        <Button
          variant="secondary"
          onClick={() => setAppSettings({ isCartViewOpen: false })}
        >
          Back to Search
        </Button>
      </div>
    );
  }

  return (
    <div
      id="cart-items"
      className={cn("flex flex-col flex-grow gap-3 overflow-auto pb-2 px-2")}
    >
      <ScrollArea className={clsx("h-9/12 w-full max-h-[335px]")}>
        <div
          id="cart-items-container"
          className={cn("flex flex-col flex-grow gap-y-3 py-3 pe-2")}
        >
          {cart.items?.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.tld + cartItem.sld}
                cartItem={cartItem}
                handleCartAction={() => handleRemoveFromCart(cartItem)}
                disabled={
                  isPaymentOptionsError ||
                  isPaymentOptionsLoading ||
                  startCheckoutOrder.isPending ||
                  checkoutState.isTransactionInProgress ||
                  isSwitchNetworkInProgress
                }
              />
            );
          })}
        </div>
      </ScrollArea>
      <div className="flex flex-col gap-2 mt-auto px-1">
        {startCheckoutOrder.isError ||
        checkoutState.isError ||
        isPaymentOptionsError ? (
          <CheckoutError
            checkoutState={checkoutState}
            startCheckoutOrder={startCheckoutOrder}
            paymentOptionsError={paymentOptionsError}
          />
        ) : null}
        <Button
          disabled={
            !cart.items?.length ||
            !selectedPaymentMethod ||
            startCheckoutOrder.isPending ||
            checkoutState.isTransactionInProgress ||
            isPaymentOptionsError ||
            isPaymentOptionsLoading ||
            isSwitchNetworkInProgress
          }
          className="mt-auto"
          onClick={handleStartCheckout}
        >
          {isSwitchNetworkInProgress ||
          startCheckoutOrder.isPending ||
          checkoutState?.isTransactionInProgress ||
          isPaymentOptionsLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Buy Now
        </Button>
      </div>
    </div>
  );
}
