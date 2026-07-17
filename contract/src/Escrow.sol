// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "hardhat/console.sol";

import "./libraries/Enums.sol";
import "./libraries/Structs.sol";
import "./libraries/Errors.sol";

import "./interfaces/IAccessManager.sol";
import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IEscrow.sol";

contract Escrow is IEscrow {
    IPropertyNFT public propertyNFT;
    IAccessManager public accessManager;

    constructor(address propertyNFTAddress, address accessManagerAddress) {
        propertyNFT = IPropertyNFT(propertyNFTAddress);
        accessManager = IAccessManager(accessManagerAddress);
    }

    modifier _onlyMarketplace() {
        console.log("error from Escrow", msg.sender);
        if (!(accessManager.isMarketplace(msg.sender))) {
            revert OnlyAccessByMarketplace();
        }
        _;
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

        _onlyEscrowParties(escrow.buyer, escrow.seller);

        return propertyNFT.getDocumentsCID(escrow.tokenId);
    }

    function acceptDocuments(
        uint escrowId,
        address buyer
    ) public _onlyMarketplace {
        Structs.Escrow storage escrow = escrows[escrowId];

        if (!(buyer == escrow.buyer)) {
            revert NotAuthorized();
        }

        escrow.status.documentsVerified = true;
    }

    function releaseProperty(
        uint escrowId,
        address buyer
    ) public _onlyMarketplace returns (uint, address, bool) {
        Structs.Escrow storage escrow = escrows[escrowId];

        if (!(buyer == escrow.buyer)) {
            revert NotAuthorized();
        }

        if (!escrow.status.documentsVerified) {
            revert DocumentsNotVerified();
        }

        propertyNFT.lock(escrow.tokenId, false);
        propertyNFT.transfer(escrow.tokenId, escrow.seller);

        escrow.status.escrowClosed = true;
        escrow.status.paymentReleased = true;

        return (escrow.amount, escrow.seller, true);
    }

    function closeEscrow(
        uint escrowId,
        address buyer,
        EscrowCloseReason reason
    ) public _onlyMarketplace returns (address, uint) {
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

        propertyNFT.lock(escrow.tokenId, false);

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

    function _onlyEscrowParties(address buyer, address seller) internal view {
        console.log("sender: ", msg.sender);
        console.log("buyer: ", buyer);
        console.log("seller: ", seller);
        if (msg.sender != buyer && msg.sender != seller) {
            revert NotAuthorized();
        }
    }
}
