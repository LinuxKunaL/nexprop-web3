import { router } from "expo-router";
import { getClient } from "./client.service";
import Client from "@walletconnect/sign-client";
import { useWalletStore } from "@stores/wallet.store";
import AsyncStorage from "@react-native-async-storage/async-storage";

class InitWalletEvents {
  private static instance: InitWalletEvents | null = null;
  private static initializing: Promise<InitWalletEvents> | null = null;

  private constructor(private client: Client) {}

  static async getInstance(): Promise<InitWalletEvents> {
    if (this.instance) {
      return this.instance;
    }

    if (this.initializing) {
      return this.initializing;
    }

    this.initializing = (async () => {
      const client = await getClient();

      const instance = new InitWalletEvents(client);

      instance.registerEvents();

      this.instance = instance;

      return instance;
    })();

    return this.initializing;
  }

  private registerEvents() {
    this.client.on("session_delete", async ({topic}) => {
      useWalletStore.getState().clearWallet();
      await AsyncStorage.removeItem("token");
      console.log("session deleted",{topic});
      router.replace("/splash");
    });
  }
}

export default InitWalletEvents;

