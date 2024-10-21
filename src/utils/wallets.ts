export const createMetaMaskDeepLink = () => {
  const origin = window.location.origin;
  // Don't attach the query params symbol ? in case of no query params found
  const link = `https://metamask.app.link/dapp/${origin}`;
  return window.open(link);
};
