const NETWORK = process.env.REACT_APP_NETWORK || "testnet";
const INFURA_ID = process.env.REACT_APP_INFURA_ID || "";
const BANDCHAIN_ENDPOINT =
  process.env.REACT_APP_BANDCHAIN_ENDPOINT || "https://api-gm-lb.bandchain.org";
const GAS_FEE_ENDPOINT =
  process.env.REACT_APP_GAS_FEE_ENDPOINT ||
  "https://api.anyblock.tools/ethereum/latest-minimum-gasprice/?pretty";
const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY || null;
const FIREBASE_PROJECT_ID =
  process.env.REACT_APP_FIREBASE_PROJECT_ID || "ren-auth";

const DEV = Boolean(process.env.NODE_ENV === "development");

const XSTATE_DEVTOOLS = Boolean(process.env.REACT_APP_XSTATE_DEVTOOLS || DEV);

const MEWCONNECT_ENABLED = Boolean(process.env.REACT_APP_MEWCONNECT_ENABLED);
const WALLETCONNECT_ENABLED = Boolean(
  process.env.REACT_APP_WALLETCONNECT_ENABLED
);
const BSC_MM_ENABLED = Boolean(process.env.REACT_APP_BSC_MM_ENABLED);

export const env = {
  DEV,
  NETWORK,
  INFURA_ID,
  FIREBASE_KEY,
  FIREBASE_PROJECT_ID,
  BANDCHAIN_ENDPOINT,
  GAS_FEE_ENDPOINT,
  XSTATE_DEVTOOLS,
  BSC_MM_ENABLED,
  MEWCONNECT_ENABLED,
  WALLETCONNECT_ENABLED,
};

if (DEV) console.debug("env", env, process);
