import hardhatEthersPlugin from "@nomicfoundation/hardhat-ethers";
import { defineConfig } from "hardhat/config";

export default defineConfig({
  solidity: {
    version: "0.8.34",
  },
  paths: {
    sources: "./src",
  },
  plugins: [hardhatEthersPlugin],
  networks: {
    localhost: {
      type: "http",
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic: "test test test test test test test test test test test junk",
      },
    },
  },
});
