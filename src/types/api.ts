import type { BaseError, TransactionReceipt } from 'viem';

export type WalletAddress = 'EVM';

export type ApiErrorResponse = {
  message: string[];
  error?: string;
  status: unknown;
};

export type SearchResult = {
  sld: string;
  tld: string;
  status: string;
  isListed: boolean;
  registrationExpiresAt: string;
  reservationExpiresAt: string;
  usdPrice: string;
  nativeAmount: string;
  nativeCurrency: string;
  clickUrl: string;
};

export type SearchResultRequestResponse = {
  pageItems: SearchResult[];
  total: number;
};

export type PaymentOption = {
  tokenAddress: string;
  contractAddress: string;
  symbol: string;
  icon: string;
  price: number;
  addressType: WalletAddress;
  chainId: string;
};

export type PaymentOptionRequestResponse = {
  options: PaymentOption[];
};

export type CheckoutOrderRequestResponse = {
  voucher: {
    paymentId: string;
    amount: string;
    token: `0x${string}` | string;
    buyer: `0x${string}` | string;
    voucherExpiration: number;
    orderId: string;
    names: {
      label: string;
      tld: string;
      registry: `0x${string}` | string;
      expirationTime: number;
      owner: `0x${string}` | string;
      renewal: false;
    }[];
  };
  signature: `0x${string}` | string;
};

export type CheckoutCallback = CheckoutOrderRequestResponse & {
  selectedPaymentToken: PaymentOption;
};

export type OnPurchaseInit = (args: {
  handleOnSuccess: (receipt: TransactionReceipt | undefined) => void;
  handleOnError: (error: BaseError | string) => void;
  transactionVoucher: {
    voucher: CheckoutOrderRequestResponse['voucher'];
    signature: `0x${string}` | string;
    selectedPaymentToken: PaymentOption;
  };
}) => Promise<void>;
