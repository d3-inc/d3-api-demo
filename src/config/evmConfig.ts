import { createConfig, http } from "wagmi";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  polygon,
  polygonAmoy,
  polygonMumbai,
  sepolia,
} from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";

import {
  apechainMainnet,
  apechainTestnet,
  coreMainnet,
  coreTestnet,
  shibariumMainnet,
  shibariumTestnet,
  victionMainnet,
  victionTestnet,
} from "./evmDefaultChains.js";

const DEFAULT_POLLING_INTERVAL = 8_000;

// Allow test networks in non-production environments
export const chainsList = [
  sepolia,
  victionTestnet,
  coreTestnet,
  shibariumTestnet,
  polygonMumbai,
  polygon,
  victionMainnet,
  shibariumMainnet,
  coreMainnet,
  arbitrumSepolia,
  polygonAmoy,
  apechainMainnet,
  apechainTestnet,
  base,
  baseSepolia,
];

// Set up wagmi config
export const getWagmiConfig = () => {
  const defaultAppMeta = {
    name: "D3 api demo",
    description: "Official Identity Service for Top web3 communities",
    url: window.location.origin,
    icons: ["https://d3.app/favicon.png"],
  };
  return createConfig({
    chains: [mainnet, ...chainsList],
    connectors: [
      coinbaseWallet({
        appLogoUrl: defaultAppMeta.icons[0],
        darkMode: true,
      }),
      injected({ shimDisconnect: false }),
    ],
    ssr: true,
    syncConnectedChain: true,
    multiInjectedProviderDiscovery: true,
    cacheTime: DEFAULT_POLLING_INTERVAL,
    pollingInterval: DEFAULT_POLLING_INTERVAL,
    transports: {
      [mainnet.id]: http(),
      [coreMainnet.id]: http(),
      [shibariumMainnet.id]: http(),
      [victionMainnet.id]: http(),
      [polygon.id]: http(),
      [sepolia.id]: http(),
      [polygonMumbai.id]: http(),
      [victionTestnet.id]: http(),
      [shibariumTestnet.id]: http(),
      [coreTestnet.id]: http(),
      [arbitrum.id]: http(),
      [arbitrumSepolia.id]: http(),
      [polygonAmoy.id]: http(),
      [apechainMainnet.id]: http(),
      [apechainTestnet.id]: http(),
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  });
};
