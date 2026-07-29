import { getClient } from "./client.service";
import { Linking } from "react-native";

const connect = async (deepLink: string) => {
  const client = await getClient();

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
    isConncted: true,
    topic: session.topic,
    address: session.namespaces.eip155.accounts[0].split(":")[2],
  };
};
const disconnect = async () => {
  const client = await getClient();

  console.log(client.session.getAll());
};
const signMessage = () => {};
const sendTransaction = () => {};

export default { connect, disconnect, sendTransaction, signMessage };
