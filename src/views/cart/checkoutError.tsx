import type { UseMutationResult } from "@tanstack/react-query";
import type {
  ApiErrorResponse,
  CheckoutOrderRequestResponse,
} from "../../types/api.js";
import type {
  CheckoutState,
  StartCheckoutOrderPayload,
} from "./hooks/types.js";

type CheckoutErrorProps = {
  checkoutState: CheckoutState;
  paymentOptionsError: ApiErrorResponse | null;
  startCheckoutOrder: UseMutationResult<
    CheckoutOrderRequestResponse,
    ApiErrorResponse,
    StartCheckoutOrderPayload,
    unknown
  >;
};

export const CheckoutError = ({
  checkoutState,
  paymentOptionsError,
  startCheckoutOrder,
}: CheckoutErrorProps) => {
  if (startCheckoutOrder.isError) {
    return (
      <p className="text-xs text-red-600">
        {startCheckoutOrder.error?.message}
      </p>
    );
  }
  if (paymentOptionsError) {
    return (
      <p className="text-xs text-red-600">{paymentOptionsError.message}</p>
    );
  }
  return <p className="text-xs text-red-600">{checkoutState.feedback}</p>;
};
