import { type Chain } from 'viem';

// https://chainlist.org/
// https://wagmi.sh/react/chains
export const victionTestnet = {
  // https://docs.viction.xyz/developer-guide/working-with-viction/viction-testnet
  id: 89,
  name: 'Viction Testnet',
  testnet: true,
  nativeCurrency: {
    decimals: 18,
    name: 'Viction',
    symbol: 'VIC',
  },
  rpcUrls: {
    public: { http: ['https://rpc-testnet.viction.xyz'] },
    default: { http: ['https://rpc-testnet.viction.xyz'] },
  },
  blockExplorers: {
    default: { name: 'VicScan', url: 'https://testnet.vicscan.xyz' },
  },
} as const satisfies Chain;

export const victionMainnet = {
  // https://docs.viction.xyz/developer-guide/working-with-viction/viction-mainnet
  id: 88,
  name: 'Viction',
  nativeCurrency: {
    decimals: 18,
    name: 'Viction',
    symbol: 'VIC',
  },
  rpcUrls: {
    public: { http: ['https://rpc.viction.xyz'] },
    default: { http: ['https://rpc.viction.xyz'] },
  },
  blockExplorers: {
    default: { name: 'VicScan', url: 'https://vicscan.xyz' },
  },
} as const satisfies Chain;

export const shibariumTestnet = {
  // https://chain.shibrpc.com/
  id: 157,
  name: 'Shib Testnet',
  testnet: true,
  nativeCurrency: {
    decimals: 18,
    name: 'Bone',
    symbol: 'BONE',
  },
  rpcUrls: {
    public: { http: ['https://puppynet.shibrpc.com'] },
    default: { http: ['https://puppynet.shibrpc.com'] },
  },
  blockExplorers: {
    default: { name: 'puppyscan', url: 'https://puppyscan.shib.io/' },
  },
} as const satisfies Chain;

export const shibariumMainnet = {
  // https://chain.shibrpc.com/
  id: 109,
  name: 'Shibarium',
  nativeCurrency: {
    decimals: 18,
    name: 'Bone',
    symbol: 'BONE',
  },
  rpcUrls: {
    public: { http: ['https://www.shibrpc.com'] },
    default: { http: ['https://www.shibrpc.com'] },
  },
  blockExplorers: {
    default: { name: 'shibariumscan', url: 'https://shibariumscan.io' },
  },
} as const satisfies Chain;

export const coreTestnet = {
  // https://docs.coredao.org/developer/develop-on-core/using-core-testnet/connect-to-core-testnet
  id: 1115,
  name: 'Core Chain TestNet',
  testnet: true,
  nativeCurrency: {
    decimals: 18,
    name: 'tCORE',
    symbol: 'tCORE',
  },
  rpcUrls: {
    public: { http: ['https://rpc.test.btcs.network/'] },
    default: { http: ['https://rpc.test.btcs.network/'] },
  },
  blockExplorers: {
    default: { name: 'Core TestNet', url: 'https://scan.test.btcs.network/' },
  },
} as const satisfies Chain;

export const coreMainnet = {
  // https://chainlist.org/?chain=1116&testnets=true&search=core
  id: 1116,
  name: 'Core Chain',
  nativeCurrency: {
    decimals: 18,
    name: 'CORE',
    symbol: 'CORE',
  },
  rpcUrls: {
    public: { http: ['https://rpc.coredao.org/'] },
    default: { http: ['https://rpc.coredao.org/'] },
  },
  blockExplorers: {
    default: { name: 'Core', url: 'https://scan.coredao.org/' },
  },
} as const satisfies Chain;

export const apechainTestnet = {
  // https://curtis.hub.caldera.xyz
  id: 33111,
  name: 'Apechain TestNet',
  testnet: true,
  nativeCurrency: {
    decimals: 18,
    name: 'ApeCoin',
    symbol: 'APE',
  },
  rpcUrls: {
    public: { http: ['https://curtis.rpc.caldera.xyz/http'] },
    default: { http: ['https://curtis.rpc.caldera.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'Apechain TestNet', url: 'https://curtis.explorer.caldera.xyz' },
  },
} as const satisfies Chain;

export const apechainMainnet = {
  // https://apechain-hub-96531824.caldera.dev/
  id: 33139,
  name: 'ApeChain',
  nativeCurrency: {
    decimals: 18,
    name: 'ApeCoin',
    symbol: 'APE',
  },
  rpcUrls: {
    public: { http: ['https://apechain.calderachain.xyz/http'] },
    default: { http: ['https://apechain.calderachain.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'ApeChain', url: 'https://apechain.calderaexplorer.xyz' },
  },
} as const satisfies Chain;

export const oasysTestnet = {
  id: 9372,
  name: 'Oasys TestNet',
  testnet: true,
  nativeCurrency: {
    decimals: 18,
    name: 'Oasys',
    symbol: 'OAS',
  },
  rpcUrls: {
    public: { http: ['https://rpc.testnet.oasys.games'] },
    default: { http: ['https://rpc.testnet.oasys.games'] },
  },
  blockExplorers: {
    default: { name: 'Oasys TestNet', url: 'https://explorer.testnet.oasys.games' },
  },
} as const satisfies Chain;
