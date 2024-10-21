import { useCallback, useEffect, useMemo, useState } from 'react';
import type { BaseError, TransactionReceipt } from 'viem';
import { useShallow } from 'zustand/react/shallow';
import { apiEndpoints, cacheKeys } from '../../../config/constants.js';
import { useCryptoTransaction } from '../../../hooks/useCryptoTransaction.js';
import { useFetchRequest } from '../../../hooks/useFetchRequest.js';
import { usePostRequest } from '../../../hooks/usePostRequest.js';
import { useStore } from '../../../state/store/index.js';
import type {
  ApiErrorResponse,
  CheckoutOrderRequestResponse,
  PaymentOption,
  PaymentOptionRequestResponse,
} from '../../../types/api.js';
import type { CheckoutState, StartCheckoutOrderPayload } from './types.js';

export const useCheckout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentOption | null>(null);
  const [isNetworkUpdated, setIsNetworkUpdated] = useState(false);
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    feedback: '',
    isError: false,
    isTransactionInProgress: false,
    isOrderSuccess: false,
  });
  const {
    handleCryptoCheckout,
    ensureCorrectEVMChain,
    evmWalletAddress,
    isSwitchNetworkInProgress,
    switchNetworkError,
    walletClient,
  } = useCryptoTransaction({ setIsNetworkUpdated });
  const cart = useStore(useShallow((state) => state.cart));
  const connectWallet = useStore(useShallow((state) => state.connectWallet));
  const resetCart = useStore(useCallback((state) => state.resetCart, []));
  const tlds = useMemo(() => {
    const tlds = cart.items?.map((cartItem) => cartItem.tld.toLowerCase());
    return [...new Set(tlds)];
  }, [cart?.items]);

  const { mutationRes: startCheckoutOrder } = usePostRequest<
    CheckoutOrderRequestResponse,
    ApiErrorResponse,
    StartCheckoutOrderPayload
  >({
    mutationKey: [cacheKeys.startCheckoutOrder],
    endpoint: apiEndpoints.startCheckoutOrder,
  });

  const {
    data: paymentOptions,
    isLoading: isPaymentOptionsLoading,
    isError: isPaymentOptionsError,
    error: paymentOptionsError,
  } = useFetchRequest<PaymentOptionRequestResponse>({
    queryKey: [cacheKeys.fetchSearchResults, { tlds }],
    endpoint: apiEndpoints.paymentOptions,
    method: 'POST',
    requestBody: { tlds },
    queryParameters: {
      enabled: Boolean(tlds?.length),
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  });

  useEffect(() => {
    if (paymentOptions?.options?.length && !selectedPaymentMethod) {
      setSelectedPaymentMethod(paymentOptions?.options[0]);
    }
  }, [selectedPaymentMethod, paymentOptions]);

  const handleOnCheckoutSuccess = useCallback(
    async (transactionReceipt?: TransactionReceipt) => {
      setCheckoutState({
        isError: false,
        feedback: `You've purchased the name tokens successfully`,
        isTransactionInProgress: false,
        isOrderSuccess: true,
      });
      resetCart();
    },
    [resetCart],
  );

  const handleOnCheckoutError = useCallback(async (error: string | BaseError) => {
    const message = typeof error === 'string' ? error : error?.message;
    setCheckoutState({
      isError: true,
      feedback: message,
      isTransactionInProgress: false,
      isOrderSuccess: false,
    });
  }, []);


  const handleCryptoCheckoutCallback = useCallback(
    async (response: CheckoutOrderRequestResponse) => {
      if (connectWallet.evmWallet && selectedPaymentMethod) {
        setCheckoutState((old) => ({
          ...old,
          isTransactionInProgress: true,
          isOrderSuccess: false,
        }));
        await handleCryptoCheckout({
          transactionVoucher: {
            voucher: response.voucher,
            signature: response.signature,
            selectedPaymentToken: selectedPaymentMethod,
          },
          handleOnSuccess: handleOnCheckoutSuccess,
          handleOnError: handleOnCheckoutError,
        });
      }
    },
    [
      selectedPaymentMethod,
      connectWallet.evmWallet,
      handleCryptoCheckout,
      handleOnCheckoutSuccess,
      handleOnCheckoutError,
    ],
  );

  const handleStartCheckout = useCallback(async () => {
    if (!cart?.items?.length || !selectedPaymentMethod) {
      const feedbackMessage = !selectedPaymentMethod
        ? 'Please select a payment method before starting checkout.'
        : 'Your cart is empty. Please add some items before starting checkout.';
      setCheckoutState({
        isError: true,
        feedback: feedbackMessage,
        isTransactionInProgress: false,
        isOrderSuccess: false,
      });
      return;
    }

    const isWalletConnected =  Boolean(connectWallet.evmWallet)
    const walletAddress = connectWallet.evmWallet

    if (!isWalletConnected) {
      setCheckoutState({
        isError: true,
        feedback: 'Please connect wallet to continue with purchase',
        isTransactionInProgress: false,
        isOrderSuccess: false,
      });
      return;
    }

      const isCorrectChain = await ensureCorrectEVMChain(Number(selectedPaymentMethod.chainId));
      if (!isCorrectChain) return;
    if (!startCheckoutOrder.isPending && walletAddress) {
      // Reset the checkout state to initial state
      setCheckoutState({
        isError: false,
        feedback: '',
        isTransactionInProgress: false,
        isOrderSuccess: false,
      });
      const orderItems = cart.items.map((cartItem) => ({
        sld: cartItem.sld,
        tld: cartItem.tld,
        autoRenew: false,
        domainLength: 1,
      }));
      const payload = {
        paymentOptions: {
          contractAddress: selectedPaymentMethod.contractAddress,
          tokenAddress: selectedPaymentMethod.tokenAddress,
          buyerAddress: walletAddress,
        },
        names: orderItems,
      };
      startCheckoutOrder.mutate(payload, {
        onSuccess: async (response) => {
            handleCryptoCheckoutCallback(response);
            return;
        },
        onError: (error) => {
           
          console.log({ error });
          setCheckoutState((old) => ({
            ...old,
            isTransactionInProgress: false,
            isOrderSuccess: false,
            feedback: error.message,
            isError: true,
          }));
        },
      });
    }
  }, [
    startCheckoutOrder,
    cart?.items,
    selectedPaymentMethod,
    handleCryptoCheckoutCallback,
    connectWallet.evmWallet,
    ensureCorrectEVMChain,
  ]);

  useEffect(() => {
    if (isNetworkUpdated && evmWalletAddress && walletClient) {
      handleStartCheckout();
      setIsNetworkUpdated(false);
    }
  }, [
    isNetworkUpdated,
    handleStartCheckout,
    evmWalletAddress,
    walletClient,
  ]);

  return {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    checkoutState,
    handleStartCheckout,
    setCheckoutState,
    startCheckoutOrder,
    paymentOptions,
    isPaymentOptionsError,
    isPaymentOptionsLoading,
    paymentOptionsError,
    isSwitchNetworkInProgress,
    switchNetworkError,
  };
};
