import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import "@walletconnect/react-native-compat";

import { SignClient } from "@walletconnect/sign-client";

let client: InstanceType<typeof SignClient> | null = null;

export const getClient = async () => {
  if (client) client;

  client = await SignClient.init({
    projectId: "8be9aa238897192da4a9391bba89e9c3",
    metadata: {
      name: "NexProp",
      description: "Buy, sell, and auction tokenized real estate on Web3.",
      url: "https://localhost",
      icons: [
        "https://raw.githubusercontent.com/LinuxKunaL/nexprop-web3/refs/heads/main/client/src/assets/images/logos/icon.png",
      ],
      redirect: {
        native: "nexprop://",
      },
    },
  });
  return client;
};
