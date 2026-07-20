// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "hardhat/console.sol";

import "./libraries/Enums.sol";
import "./libraries/Structs.sol";
import "./libraries/Errors.sol";

import "./interfaces/IAccessManager.sol";
import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IEscrow.sol";
import "./AccessManager.sol";

contract Escrow is IEscrow, AccessManager {
    IPropertyNFT public propertyNFT;
    IAccessManager public accessManager;

    constructor(address propertyNFTAddress, address accessManagerAddress) {
        propertyNFT = IPropertyNFT(propertyNFTAddress);
        accessManager = IAccessManager(accessManagerAddress);
    }

    uint256 public nextEscrowId = 0;

    mapping(uint => Structs.Escrow) escrows;

    function createEscrow(
        Structs.CreateEscrowParams memory params
    ) public onlyMarketplace {
        uint256 escrowId = ++nextEscrowId;
        address propertyOwner = propertyNFT.ownerOfToken(params.tokenId);

        propertyNFT.lock(params.tokenId, true, LockReason.Escrow);
        propertyNFT.changeStatus(params.tokenId, PropertyStatus.InEscrow);

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
            purchaseMode: params.purchaseMode,
            buyer: params.buyer,
            amount: params.amount,
            createdAt: block.timestamp,
            expiresAt: block.timestamp + 3 days,
            closeReason: EscrowCloseReason.None,
            status: initalEscrowStates
        });

        escrows[nextEscrowId] = escrowData;
    }

    function viewDocuments(uint escrowId) public view returns (string memory) {
        Structs.Escrow memory escrow = escrows[escrowId];

        onlyEscrowParties(escrow.buyer, escrow.seller);

        return propertyNFT.getDocumentsCID(escrow.tokenId);
    }

    function acceptDocuments(
        uint escrowId,
        address buyer
    ) public onlyMarketplace {
        Structs.Escrow storage escrow = escrows[escrowId];

        if (!(buyer == escrow.buyer)) {
            revert NotAuthorized();
        }

        escrow.status.documentsVerified = true;
    }

    function releaseProperty(
        uint escrowId,
        address buyer
    ) public onlyMarketplace returns (uint, address, uint, bool) {
        Structs.Escrow storage escrow = escrows[escrowId];

        if (!(buyer == escrow.buyer)) {
            revert NotAuthorized();
        }

        if (!escrow.status.documentsVerified) {
            revert DocumentsNotVerified();
        }

        propertyNFT.lock(escrow.tokenId, false, LockReason.None);
        propertyNFT.transfer(escrow.tokenId, escrow.buyer);

        escrow.status.escrowClosed = true;
        escrow.status.paymentReleased = true;

        return (escrow.amount, escrow.seller, escrow.tokenId, true);
    }

    function closeEscrow(
        uint escrowId,
        address buyer,
        EscrowCloseReason reason
    ) public onlyMarketplace returns (address, uint) {
        Structs.Escrow storage escrow = escrows[escrowId];

        if (reason == EscrowCloseReason.DocumentsRejected) {
            if (!(buyer == escrow.buyer)) {
                revert NotAuthorized();
            }
        }

        if (reason == EscrowCloseReason.TimeLimitExceeded) {
            if (!(block.timestamp > escrow.expiresAt)) {
                console.log("TimeExceededInvalid");
                revert TimeExceededInvalid();
            }
        }

        propertyNFT.lock(escrow.tokenId, false, LockReason.None);

        escrow.status.escrowClosed = true;
        escrow.status.fundsLocked = false;
        escrow.closeReason = reason;

        return (escrow.buyer, escrow.amount);
    }

    function getEscrow(
        uint escrowId
    ) public view returns (Structs.Escrow memory) {
        return escrows[escrowId];
    }

    function getAllEscrows() public view returns (Structs.Escrow[] memory) {
        Structs.Escrow[] memory escrowList = new Structs.Escrow[](nextEscrowId);
        for (uint256 i = 1; i <= nextEscrowId; i++) {
            escrowList[i - 1] = escrows[i];
        }
        return escrowList;
    }

    function getEscrowStatus(
        uint escrowId
    ) public view returns (Structs.EscrowProgress memory) {
        return escrows[escrowId].status;
    }

    function onlyEscrowParties(address buyer, address seller) internal view {
        if (msg.sender != buyer && msg.sender != seller) {
            revert NotAuthorized();
        }
    }
}
