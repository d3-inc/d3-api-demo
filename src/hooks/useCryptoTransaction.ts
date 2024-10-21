import { useCallback } from 'react';
import type { BaseError, TransactionReceipt, WalletClient } from 'viem';
import { erc20Abi, zeroAddress } from 'viem';
import { useAccount, usePublicClient, useSwitchChain, useWalletClient } from 'wagmi';
import { mintManagerAbi } from '../config/evmAbi.js';
import type { CheckoutCallback, PaymentOption } from '../types/api.js';

type HandleCryptoCheckoutProps = {
  handleOnSuccess: (receipt: TransactionReceipt | undefined) => void;
  handleOnError: (error: BaseError | string) => void;
  transactionVoucher: CheckoutCallback;
};

type UseCryptoTransactionProps = {
  setIsNetworkUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useCryptoTransaction = ({ setIsNetworkUpdated }: UseCryptoTransactionProps) => {
  const { address: evmWalletAddress, chain } = useAccount();
  const {
    switchChainAsync,
    chains,
    isPending: isSwitchNetworkInProgress,
    error: switchNetworkError,
  } = useSwitchChain();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const ensureCorrectEVMChain = useCallback(
    async (paymentChainId: number): Promise<boolean> => {
      if (!evmWalletAddress) {
        return false;
      }

      if (paymentChainId === chain?.id) {
        return true;
      }

      const targetChain = chains.find((chain) => chain.id === paymentChainId);
      if (!targetChain) {
        return false;
      }

      if (!switchChainAsync) {
        return false;
      }

      const switchedChain = await switchChainAsync({ chainId: targetChain.id });
      setIsNetworkUpdated(switchedChain.id === paymentChainId);
      return false;
    },
    [chain?.id, chains, evmWalletAddress, switchChainAsync, setIsNetworkUpdated],
  );

  const ensureCorrectChainId = useCallback(
    async (selectedPaymentToken: PaymentOption, walletClient: WalletClient) => {
      const currentChainId = await walletClient?.getChainId();

      if (currentChainId?.toString() !== selectedPaymentToken?.chainId?.toString()) {
        throw new Error('Chain switched during payment process, aborting transaction');
      }
    },
    [],
  );

  const handleEvmTransactionConfirmation = useCallback(
    async (
      evmTransactionHash: `0x${string}`,
      handleOnSuccess: (receipt: TransactionReceipt | undefined) => void,
    ) => {
      const confirmationReceipt = await publicClient?.waitForTransactionReceipt({
        hash: evmTransactionHash,
      });
      if (confirmationReceipt?.status !== 'success') {
        throw new Error('Transaction confirmation failed. Please try again');
      }
      handleOnSuccess(confirmationReceipt);
    },
    [publicClient],
  );

  const executePaymentTransactions = useCallback(
    async (
      voucher: CheckoutCallback['voucher'],
      signature: string,
      paymentChainId: number,
      selectedPaymentToken: PaymentOption,
      handleOnSuccess: (receipt: TransactionReceipt | undefined) => void,
    ) => {
      const targetChain = chains.find((chain) => chain.id === paymentChainId);
      const isERC20Used = voucher.token !== undefined && voucher.token !== zeroAddress;
      if (!walletClient) return;
      if (isERC20Used) {
        const approvalHash = await walletClient?.writeContract({
          address: voucher.token as `0x${string}`,
          abi: erc20Abi,
          functionName: 'approve',
          account: evmWalletAddress as `0x${string}`,
          chain: targetChain,
          args: [selectedPaymentToken?.contractAddress as `0x${string}`, BigInt(voucher.amount)],
        });
        await publicClient?.waitForTransactionReceipt({
          hash: approvalHash as `0x${string}`,
        });
      }

      const namesArgs = voucher.names?.map((name) => [
        name.registry,
        name.label,
        name.tld,
        name.expirationTime,
        name.owner,
        name.renewal,
      ]);
      const voucherArgs = [
        voucher.buyer,
        voucher.token,
        voucher.amount,
        voucher.voucherExpiration,
        voucher.paymentId,
        voucher.orderId,
        namesArgs,
      ];

      const simulateRequest = await publicClient?.simulateContract({
        chain: targetChain,
        address: selectedPaymentToken?.contractAddress as `0x${string}`,
        abi: mintManagerAbi,
        functionName: 'pay',
        // Explicit wallet address is important to make sure that the transaction is signed by the correct wallet
        account: evmWalletAddress as `0x${string}`,
        args: [voucherArgs, signature],
        value: !isERC20Used ? BigInt(voucher.amount ?? 0) : undefined,
      });
      await ensureCorrectChainId(selectedPaymentToken, walletClient);
      const transactionHash = await walletClient?.writeContract(simulateRequest!.request);
      if (transactionHash) {
        await handleEvmTransactionConfirmation(transactionHash, handleOnSuccess);
      }
    },
    [
      chains,
      ensureCorrectChainId,
      handleEvmTransactionConfirmation,
      evmWalletAddress,
      publicClient,
      walletClient,
    ],
  );

  const handleCryptoCheckout = useCallback(
    async ({ transactionVoucher, handleOnError, handleOnSuccess }: HandleCryptoCheckoutProps) => {
      try {
        const { voucher, signature, selectedPaymentToken } = transactionVoucher || {};

        await executePaymentTransactions(
          voucher,
          signature,
          Number(selectedPaymentToken.chainId),
          selectedPaymentToken,
          handleOnSuccess,
        );
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
        const errorMessage: string = (error as BaseError)?.shortMessage ?? 'Something went wrong';
        handleOnError(errorMessage);
      }
    },
    [executePaymentTransactions],
  );

  return {
    handleCryptoCheckout,
    ensureCorrectEVMChain,
    evmWalletAddress,
    isSwitchNetworkInProgress,
    switchNetworkError,
    walletClient,
  };
};
