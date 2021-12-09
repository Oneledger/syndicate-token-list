import { TokenInfo } from "@uniswap/token-lists";
// mainnets
import oneledger from "../../src/oneledger.tokens.json";
import ethereum from "../../src/ethereum.tokens.json";
import bsc from "../../src/bsc.tokens.json";
import polygon from "../../src/polygon.tokens.json";
// testnets
import frankenstein from "../../src/frankenstein.tokens.json";
import ropsten from "../../src/ropsten.tokens.json";
import bsc_testnet from "../../src/bsc_testnet.tokens.json";
import mumbai from "../../src/mumbai.tokens.json";

type IRawToken = Pick<TokenInfo, "address" | "name" | "symbol"> &
  Partial<Pick<TokenInfo, "logoURI" | "decimals">> & {
    isExperimental?: boolean;
    logoFile?: string;
  };

type IRawTokenListJson = readonly IRawToken[];

export const WEB3_NETWORK_NAMES = [
  "oneledger",
  "ethereum",
  "bsc",
  "polygon",

  "frankenstein",
  "ropsten",
  "bsc_testnet",
  "mumbai",
] as const;
export type IWeb3Network = typeof WEB3_NETWORK_NAMES[number];

// assert the JSON is valid
const rawTokensJson: {
  [network in IWeb3Network]: [number, IRawTokenListJson];
} = {
  oneledger: [311752642, oneledger],
  ethereum: [1, ethereum],
  bsc: [56, bsc],
  polygon: [137, polygon],

  frankenstein: [4216137055, frankenstein],
  ropsten: [3, ropsten],
  bsc_testnet: [97, bsc_testnet],
  mumbai: [80001, mumbai],
};

export const getNetworkTokens = (network: IWeb3Network): IRawTokenListJson =>
  rawTokensJson[network][1];

export const rawTokens: readonly (IRawToken & {
  chainId: number;
})[] = Object.values(rawTokensJson).flatMap(([chainId, tokens]) =>
  tokens.map((tok) => ({ ...tok, chainId }))
);
