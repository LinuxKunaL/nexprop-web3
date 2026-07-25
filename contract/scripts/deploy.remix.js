import { ethers } from "ethers";

async function getArtifact(name) {
    return JSON.parse(
        await remix.call(
            "fileManager",
            "getFile",
            `artifacts/src/${name}.sol/${name}.json`
        )
    );
}

async function deploy(name, signer, args = []) {
    const artifact = await getArtifact(name);

    const factory = new ethers.ContractFactory(
        artifact.abi,
        artifact.bytecode,
        signer
    );

    const contract = await factory.deploy(...args);
    await contract.waitForDeployment();

    return contract;
}

(async () => {
    try {
        console.log("====================================");
        console.log("Deploying Smart Contracts");
        console.log("====================================");

        const provider = new ethers.BrowserProvider(web3Provider);
        const signer = await provider.getSigner();

        console.log("Deployer:", await signer.getAddress());

        // 1. AccessManager
        const accessManager = await deploy(
            "AccessManager",
            signer
        );

        // 2. PropertyNFT
        const propertyNFT = await deploy(
            "PropertyNFT",
            signer,
            [
                await accessManager.getAddress()
            ]
        );

        // 3. Auction
        const auction = await deploy(
            "Auction",
            signer,
            [
                await propertyNFT.getAddress(),
                await accessManager.getAddress()
            ]
        );

        // 4. Escrow
        const escrow = await deploy(
            "Escrow",
            signer,
            [
                await propertyNFT.getAddress(),
                await accessManager.getAddress()
            ]
        );

        // 5. Marketplace
        const marketplace = await deploy(
            "Marketplace",
            signer,
            [
                await propertyNFT.getAddress(),
                await auction.getAddress(),
                await escrow.getAddress()
            ]
        );

        console.log("Initializing contracts...");

        await (await accessManager.setMarketplace(
            await marketplace.getAddress()
        )).wait();

        await (await accessManager.setEscrow(
            await escrow.getAddress()
        )).wait();

        console.log("\n========== DEPLOYMENT COMPLETE ==========");
        console.log("AccessManager :", await accessManager.getAddress());
        console.log("PropertyNFT   :", await propertyNFT.getAddress());
        console.log("Auction       :", await auction.getAddress());
        console.log("Escrow        :", await escrow.getAddress());
        console.log("Marketplace   :", await marketplace.getAddress());

    } catch (err) {
        console.error(err.message ?? err);
    }
})();