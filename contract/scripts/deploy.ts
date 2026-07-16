import hardhat from "hardhat";

async function main() {
  const connection = await hardhat.network.create();
  const ethers = connection.ethers;

  // Deploy AccessManager
  const AccessManager = await ethers.getContractFactory("AccessManager");
  const accessManager = await AccessManager.deploy();
  await accessManager.waitForDeployment();
  console.log("AccessManager:", await accessManager.getAddress());

  // Deploy PropertyNFT
  const PropertyNFT = await ethers.getContractFactory("PropertyNFT");
  const propertyNFT = await PropertyNFT.deploy(
    await accessManager.getAddress(),
  );
  await propertyNFT.waitForDeployment();
  console.log("PropertyNFT:", await propertyNFT.getAddress());

  // Deploy Auction
  const Auction = await ethers.getContractFactory("Auction");
  const auction = await Auction.deploy(
    await propertyNFT.getAddress(),
    await accessManager.getAddress(),
  );
  await auction.waitForDeployment();
  console.log("Auction:", await auction.getAddress());

  // Deploy Escrow
  const Escrow = await ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(
    await propertyNFT.getAddress(),
    await accessManager.getAddress(),
  );
  await escrow.waitForDeployment();
  console.log("Escrow:", await escrow.getAddress());

  // Deploy Marketplace
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const marketplace = await Marketplace.deploy(
    await propertyNFT.getAddress(),
    await auction.getAddress(),
    await escrow.getAddress(),
  );
  await marketplace.waitForDeployment();
  console.log("Marketplace:", await marketplace.getAddress());

  await accessManager.setMarketplace(await marketplace.getAddress());
  await accessManager.setEscrow(await escrow.getAddress());

  console.log("Initialization Complete");
}

main().catch((err) => {
  console.log(err);
});
