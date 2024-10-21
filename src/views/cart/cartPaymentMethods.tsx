import type { Dispatch, SetStateAction } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.js';
import { useStore } from '../../state/store/index.js';
import type { PaymentOption, PaymentOptionRequestResponse } from '../../types/api.js';
import { cn } from '../../utils/twMerge.js';

type CartPaymentMethodsProps = {
  selectedPaymentMethod: PaymentOption | null;
  setSelectedPaymentMethod: Dispatch<SetStateAction<PaymentOption | null>>;
  isPaymentOptionsLoading: boolean;
  paymentOptions: PaymentOptionRequestResponse;
};

export const CartPaymentMethods = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  isPaymentOptionsLoading,
  paymentOptions,
}: CartPaymentMethodsProps) => {
  const cart = useStore(useShallow((state) => state.cart));
  const paymentMethods = paymentOptions?.options;
  return (
    <div className="flex justify-between items-center gap-2 px-2 mb-1">
      <h3 className={cn('text-md font-semibold text-left')}>Payment Method</h3>
      <div>
        <Select
          value={selectedPaymentMethod?.symbol}
          onValueChange={(updatedValue) => {
            const newMethod = paymentMethods?.find(
              (item) => item.symbol.toLowerCase() === updatedValue.toLowerCase(),
            );
            if (newMethod) {
              setSelectedPaymentMethod(newMethod);
            }
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Payment" aria-label="select payment method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods?.map((payment) => (
              <SelectItem
                disabled={isPaymentOptionsLoading || !cart?.items?.length}
                key={payment.symbol + payment.tokenAddress}
                value={payment.symbol}
              >
                <span className="flex gap-2">
                  <img
                    className="object-cover object-center w-full h-5"
                    src={payment.icon}
                    alt={payment.symbol}
                  />
                  {payment.symbol}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
