// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./libraries/Enums.sol";
import "./libraries/Structs.sol";
import "./libraries/Errors.sol";

import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IAuction.sol";
import "./interfaces/IMarketplace.sol";
import "./interfaces/IEscrow.sol";

contract Marketplace is IMarketplace {
    IAuction public auction;
    IPropertyNFT public propertyNFT;
    IEscrow public escrow;

    constructor(
        address propertyNFTAddress,
        address auctionAddress,
        address escrowAddress
    ) {
        propertyNFT = IPropertyNFT(propertyNFTAddress);
        auction = IAuction(auctionAddress);
        escrow = IEscrow(escrowAddress);
    }

    function createProperty(
        Structs.CreatePropertyParams calldata params
    ) public {
        if (
            params.propertyStatus != PropertyStatus.Available &&
            params.propertyStatus != PropertyStatus.Unlisted
        ) {
            revert InvalidPropertyStatus();
        }

        Structs.NFTMintParams memory propertyNFTData = Structs.NFTMintParams({
            creator: msg.sender,
            businessId: params.businessId,
            listingType: params.listingType,
            price: params.price,
            propertyStatus: params.propertyStatus,
            metadataCID: params.metadataCID,
            documentsCID: params.documentsCID
        });

        uint256 tokenId = propertyNFT.mint(propertyNFTData);

        if (params.propertyStatus == PropertyStatus.Available) {
            if (params.listingType == ListingType.Auction) {
                Structs.CreateAuctionParams memory auctionData = Structs
                    .CreateAuctionParams({
                        tokenId: tokenId,
                        startPrice: params.auctionStartPrice,
                        duration: params.auctionDuration
                    });
                auction.createAuction(auctionData);
            }
        }
    }

    function unlistProperty(uint tokenId) public {
        if (propertyNFT.ownerOfToken(tokenId) != msg.sender) {
            revert NotAuthorized();
        }

        propertyNFT.setListingStatus(tokenId, false);
    }

    function relistProperty(Structs.RelistPropertyParams memory params) public {
        Structs.Property memory property = propertyNFT.get(params.tokenId);

        if (property.owner != msg.sender) {
            revert NotAuthorized();
        }
        propertyNFT.setListingStatus(params.tokenId, true);

        if (property.listingType == ListingType.Auction) {
            Structs.CreateAuctionParams memory auctionData = Structs
                .CreateAuctionParams({
                    tokenId: params.tokenId,
                    startPrice: params.startPrice,
                    duration: params.duration
                });
            auction.createAuction(auctionData);
        }
    }

    function buyProperty(
        Structs.BuyPropertyParams memory params
    ) public payable {
        if (msg.sender == propertyNFT.ownerOfToken(params.tokenId)) {
            revert CannotBuyOwnProperty();
        }

        uint propertyPrice = propertyNFT.getPrice(params.tokenId);

        if (msg.value != propertyPrice) {
            revert IncorrectPayment();
        }

        propertyNFT.requireUnlocked(params.tokenId);

        Structs.CreateEscrowParams memory createEscrowData = Structs
            .CreateEscrowParams({
                purchaseMode: params.purchaseMode,
                tokenId: params.tokenId,
                amount: msg.value,
                buyer: msg.sender
            });

        escrow.createEscrow(createEscrowData);
    }

    function _buyProperty(Structs.BuyPropertyParams memory params) internal {
        Structs.CreateEscrowParams memory createEscrowData = Structs
            .CreateEscrowParams({
                purchaseMode: params.purchaseMode,
                tokenId: params.tokenId,
                amount: params.amount,
                buyer: params.buyer
            });
        escrow.createEscrow(createEscrowData);
    }

    function placeBid(uint auctionid) public payable {
        auction.placeBid(auctionid, msg.sender, msg.value);
    }

    function declareAuctionWinner(uint auctionId) public {
        (uint tokenId, uint amount, address winner) = auction.declareWinner(
            auctionId
        );
        _buyProperty(
            Structs.BuyPropertyParams({
                purchaseMode: PurchaseMode.Auction,
                tokenId: tokenId,
                amount: amount,
                buyer: winner
            })
        );
    }

    function withdrawRefund(uint auctionId) public payable {
        uint amount = auction.getPendingRefund(auctionId, msg.sender);

        auction.clearPendingRefund(auctionId, msg.sender);

        (bool success, ) = payable(msg.sender).call{value: amount}("");

        if (!success) {
            revert FundTransferFailed();
        }
    }

    function acceptDocuments(uint escrowId) public {
        address buyer = msg.sender;
        escrow.acceptDocuments(escrowId, buyer);
    }

    function rejectDocuments(uint escrowId) public {
        (address to, uint amount) = escrow.closeEscrow(
            escrowId,
            msg.sender,
            EscrowCloseReason.DocumentsRejected
        );
        refundEscrowBalance(to, amount);
    }

    function escrowTimeLimitExceeded(uint escrowId) public {
        (address to, uint amount) = escrow.closeEscrow(
            escrowId,
            address(0),
            EscrowCloseReason.TimeLimitExceeded
        );
        refundEscrowBalance(to, amount);
    }

    function releasePayment(uint escrowId) public payable {
        address buyer = msg.sender;

        (uint amount, address seller, bool escrowSuccess) = escrow
            .releaseProperty(escrowId, buyer);

        if (escrowSuccess) {
            (bool sucess, ) = payable(seller).call{value: amount}("");
            if (!sucess) {
                revert FundTransferFailed();
            }
        }
    }

    function refundEscrowBalance(address to, uint amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        if (!success) {
            revert FundTransferFailed();
        }
    }
}
