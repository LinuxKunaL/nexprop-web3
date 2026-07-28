import { writeFile } from "node:fs/promises";

const API_URL =
  "https://explorer-api.walletconnect.com/v3/wallets?projectId=8be9aa238897192da4a9391bba89e9c3&platforms=ios,android";

function getAndroidPackage(playStoreUrl = "") {
  try {
    return new URL(playStoreUrl).searchParams.get("id");
  } catch {
    return null;
  }
}

async function main() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const data = await response.json();
  const listings = data.listings ?? data;

  const wallets = Object.values(listings)
    .map((wallet) => {
      const androidPackage = getAndroidPackage(wallet.app?.android);
      const nativeDeepLink = wallet.mobile?.native?.trim();

      return {
        id: wallet.id,
        name: wallet.name,
        logoUrl:
          wallet.image_url?.md ??
          wallet.image_url?.lg ??
          wallet.image_url?.sm ??
          null,
        androidPackage,
        nativeDeepLink,
        universalDeepLink: wallet.mobile?.universal || null,
      };
    })
    .filter(
      (wallet) =>
        wallet.androidPackage &&
        wallet.nativeDeepLink &&
        wallet.nativeDeepLink.length > 0,
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  await writeFile("./wallets.json", JSON.stringify(wallets, null, 2), "utf8");

  console.log(`✅ Saved ${wallets.length} wallets.`);
}

main().catch(console.error);
