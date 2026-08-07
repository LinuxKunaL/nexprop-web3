import { Linking } from "react-native";
import { SignatureLike } from "ethers";
import { getClient } from "./client.service";
import { useWalletStore } from "@stores/wallet.store";
import type { ErrorResponse } from "@walletconnect/jsonrpc-types";
import { TWalletConnection, TWalletMethods } from "../types/wallet";

function timeout(ms: number): Promise<never> {
  return new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject(new Error("Connection timed out"));
    }, ms);
  });
}

const connect = async (
  deepLink: string,
): Promise<TWalletConnection | undefined> => {
  const client = await getClient();

  // if (client.session.getAll().length == 1) {
  //   throw "Wallet is already connected";
  // }

  try {
    const { uri, approval } = await client.connect({
      optionalNamespaces: {
        eip155: {
          chains: ["eip155:1", "eip155:31337"],
          methods: [
            "eth_requestAccounts",
            "personal_sign",
            "eth_sign",
            "eth_signTypedData",
            "eth_sendTransaction",
            "wallet_switchEthereumChain",
          ],
          events: ["accountsChanged", "chainChanged"],
        },
      },
    });

    if (uri) {
      const walletDeepLink = `${deepLink}wc?uri=${encodeURIComponent(uri)}`;
      Linking.openURL(walletDeepLink);
    }

    const session = await Promise.race([approval(), timeout(40000)]);

    return {
      authState: "disconnected",
      topic: session.topic,
      nativeDeepLink: deepLink,
      walletName: session.peer.metadata.name,
      chainId: Number(session.namespaces.eip155.chains?.[0]!),
      address: session.namespaces.eip155.accounts[0].split(":")[2],
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error.message;
    }
    if ((error as ErrorResponse).code == 4001) {
      throw "Connection is rejected by user";
    }
  }
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

const signature = async (
  address: string,
  message: string,
): Promise<SignatureLike | undefined> => {
  if (!address && !message) {
    console.log("Fialds are required");
    return;
  }
  try {
    const result = walletRequest<SignatureLike>("personal_sign", [
      message,
      address,
    ]);
    return await Promise.race([result, timeout(30000)]);
  } catch (error) {
    if ((error as ErrorResponse).code === 5000) {
      return Promise.reject("User rejected for sign");
    }
    return Promise.reject(error)
  }
};

const walletRequest = async <T>(
  method: TWalletMethods,
  params: unknown[],
): Promise<T> => {
  const client = await getClient();
  const { nativeDeepLink } = useWalletStore.getState();

  const session = client.session.getAll()[0];
  const chainId = session.namespaces.eip155.chains?.[1]!;
  try {
    const promise = client.request<T>({
      topic: session.topic,
      chainId,
      request: {
        method: method,
        params: params,
      },
    });

    if (nativeDeepLink) {
      await Linking.openURL(nativeDeepLink);
    }
    return await promise;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  connect,
  disconnect,
  signature,
  walletRequest,
};
