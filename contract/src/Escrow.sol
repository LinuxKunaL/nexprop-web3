// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./libraries/Enums.sol";

import "./libraries/Structs.sol";
import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IEscrow.sol";

contract Escrow is IEscrow {
    IPropertyNFT public propertyNFT;

    constructor(address propertyNFTAddress) {
        propertyNFT = IPropertyNFT(propertyNFTAddress);
    }

    uint256 public nextEscrowId = 0;

    mapping(uint => Structs.Escrow) escrows;

    function createEscrow(Structs.CreateEscrowParams memory params) public {
        uint256 escrowId = ++nextEscrowId;
        address propertyOwner = propertyNFT.ownerOfToken(params.tokenId);

        propertyNFT.lock(params.tokenId, true);

        Structs.EscrowProgress memory initalEscrowStates = Structs
            .EscrowProgress({
                fundsLocked: true,
                documentsVerified: false,
                paymentReleased: false,
                escrowClosed: false
            });

        Structs.Escrow memory escrowData = Structs.Escrow({
            escrowId: escrowId,
            tokenId: params.tokenId,
            seller: propertyOwner,
            buyer: params.buyer,
            amount: params.amount,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + 3 days,
            status: initalEscrowStates
        });
    }
}
