import { Linking } from "react-native";
import { getClient } from "./client.service";
import { TWalletConnection } from "../types/wallet";

const connect = async (deepLink: string): Promise<TWalletConnection | undefined> => {
  const client = await getClient();

  try {
    const { uri, approval } = await client.connect({
      optionalNamespaces: {
        eip155: {
          chains: ["eip155:1"],
          methods: ["eth_requestAccounts"],
          events: ["accountsChanged", "chainChanged"],
        },
      },
    });

    if (uri) {
      const walletDeepLink = `${deepLink}wc?uri=${encodeURIComponent(uri)}`;
      Linking.openURL(walletDeepLink);
    }
    const session = await approval();

    return {
      isConnected: true,
      topic: session.topic,
      chainId: Number(session.namespaces.eip155.chains?.[0]!),
      address: session.namespaces.eip155.accounts[0].split(":")[2],
    };
  } catch (error: unknown) {
    console.log("connectivity is rejected");
    return undefined;
  }
};

const getBalance = async () => {
  const client = await getClient();
};

const disconnect = async (topic: string) => {
  if (!topic) {
    console.log("Topic id is not provided.");
    return;
  }
  const client = await getClient();
  client.disconnect({
    topic: topic,
    reason: { code: 404, message: "disconnect from user" },
  });
};

const requestHalper = async (method: string, params: unknown[]) => {
  const client = await getClient();

  const session = client.session.getAll()[0];
  const chainId = session.namespaces.eip155.chains?.[0]!;

  console.log(session.topic);
  console.log(chainId);

  return client.request({
    topic: session.topic,
    chainId,
    request: {
      method,
      params,
    },
  });
};

export default { connect, disconnect, requestHalper };
