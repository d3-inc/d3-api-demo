## Project Overview

This demo project illustrates how to integrate with the [D3 API](https://docs.d3.app/channel-partner-integrations/d3-api) to enable name token purchases using cryptocurrency. It's designed to help developers quickly implement similar functionality in their own applications, regardless of the frontend framework used. This demo specifically uses ReactJS, but the API integration remains consistent across different frameworks.

## Getting Started

### Local setup

to setup & run the project, you can follow these steps

- clone the repo
- run `yarn` in the root directory
- create a `.env` file and copy the variables from `.env.local.sample`. Make sure to obtain a valid API key from [d3-dashboard](https://dashboard.d3.app/) to test the flow.
- run `yarn dev` to see the output at [localhost:3000](http://localhost:3000)

## Built with

This section includes libraries/frameworks used to bootstrap this project.

- Yarn
- Vite
- React
- Typescript
- Tailwind css

## api docs

This project integrates with the D3 API to perform key functions such as searching for name tokens and handling payments. Below are details of the most important API endpoints:

### search

As the name implies, this endpoint `/v1/partner/search` can be used to perform search for one or multiple tlds with one or multiple slds (search terms). You can see a live example of such integration [here](https://github.com/d3-inc/d3-api-demo/blob/main/src/views/search/hooks/useSearch.ts#L27).

below request parameters could be sent in the

```
type SearchQueryParams = {
  sld: string;
  tld: string;
  skip: number;
  limit: number;
};
```

For a **successful request**, below response will be returned from the search api. To determine, whether the name is available for purchase, you can check the `status` property in the response, which will be `available`.

```
export type SearchResult = {
  sld: string;
  tld: string;
  status: string; // this could be used to check whether the name is available or not for purchase
  isListed: boolean;
  registrationExpiresAt: string;
  reservationExpiresAt: string;
  usdPrice: string;
  nativeAmount: string; // equivalent price in native token
  nativeCurrency: string;
  clickUrl: string;
  lockExpiresAt: string; // if the name is locked for an active order, this will contain the date in UTC format
};

export type SearchResultRequestResponse = {
  pageItems: SearchResult[];
  total: number;
};
```

After you've integrated the above response, the UI will look like ![this](https://github.com/user-attachments/assets/f448af10-417e-4707-a9c1-524a9b337f54)

If the api returns an error (e.g. either for invalid api key or invalid request), it'll contain below type.

```
export type ApiErrorResponse = {
  message: string[];
  error?: string;
  status: unknown;
};
```

### payment options

This endpoint is used to fetch the payment methods available for one tld or multiple tlds (separate by comma). You can see a live example of payment options integration [here](https://github.com/d3-inc/d3-api-demo/blob/main/src/views/cart/hooks/useCheckout.ts#L46). The payment options also contain the network, which is important for starting checkout to complete the purchase flow.

If you want to check the live endpoint, you can do so in [swagger](https://api-public.d3.app/swagger#/Partner%20API/PartnerController_getPaymentOptions)

below request parameters could be sent in the

```
type paymentOptionsParams = string
```

For a **successful request**, below response will be returned from the payment options api.

```
export type PaymentOption = {
  tokenAddress: string; // will be empty for native token
  contractAddress: string;
  symbol: string;
  icon: string;
  price: number;
  addressType: WalletAddress;
  chainId: string; // this is important to determine the token's chain
};

export type PaymentOptionRequestResponse = {
  options: PaymentOption[];
};
```

After integrating the above response in the UI, the user will see a UI like ![this](https://github.com/user-attachments/assets/a49b33b8-6cca-4723-a431-decd827cce82)

In case of no payment options configured for the tld, the `options` will be empty.

### start order/checkout
