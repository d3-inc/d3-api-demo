export const searchParams = {
  sld: 'sld',
  tld: 'tld',
  limit: 'limit',
  skip: 'skip',
};

export const cacheKeys = {
  fetchSearchResults: 'FETCH_SEARCH_RESULTS',
  fetchPaymentMethods: 'FETCH_PAYMENT_METHODS',
  startCheckoutOrder: 'START_CHECKOUT_ORDER',
};

export const apiEndpoints = {
  search: '/v1/partner/search',
  paymentOptions: '/v1/partner/payment/options',
  startCheckoutOrder: '/v1/partner/order',
};

export const PAGE_SIZE = 12;

export const currencyConfigForFractionDigits = {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
};
export const numbersConfigForFractionDigits = {
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
};

export const D3_SUPPORT_KEY = 'support@d3.email';
export const D3_DEVELOPER_DASHBOARD_LINK =
  'https://dashboard.d3.app?utm_source=d3-api-demo&d3-campaign=organic';

export const MARKETPLACE_AMOUNT_FLOOR_LIMIT = 0.01;
export const CART_LIMIT = 20;
