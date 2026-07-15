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

        if (params.listingType == ListingType.auction) {
            Structs.CreateAuctionParams memory auctionData = Structs
                .CreateAuctionParams({
                    tokenId: tokenId,
                    startPrice: params.auctionStartPrice,
                    startTime: params.auctionStartTime,
                    endTime: params.auctionEndTime
                });
            auction.createAuction(auctionData);
        }
    }

    function DeclareAuctionWinner(uint auctionId) public {
        (uint tokenId, uint amount, address winner) = auction.declareWinner(
            auctionId
        );

        buyProperty(
            Structs.BuyPropertyParams({
                purchaseMode: PurchaseMode.Auction,
                tokenId: tokenId,
                amount: amount,
                buyer: winner
            })
        );
    }

    function buyProperty(
        Structs.BuyPropertyParams memory params
    ) public payable {
        uint propertyPrice = propertyNFT.getPrice(params.tokenId);

        if (params.purchaseMode == PurchaseMode.Direct) {
            if (msg.value != propertyPrice) {
                revert IncorrectPayment();
            }
        }

        Structs.CreateEscrowParams memory createEscrowData = Structs
            .CreateEscrowParams({
                purchaseMode: params.purchaseMode,
                tokenId: params.tokenId,
                amount: params.purchaseMode == PurchaseMode.Auction
                    ? params.amount
                    : msg.value,
                buyer: params.purchaseMode == PurchaseMode.Auction
                    ? params.buyer
                    : msg.sender
            });

        escrow.createEscrow(createEscrowData);
    }

    function placeBid(uint auctionid) public payable {
        auction.placeBid(auctionid, msg.sender, msg.value);
    }

    function withdrawRefund(uint auctionId) public payable {
        uint amount = auction.getPendingRefund(auctionId, msg.sender);

        auction.clearPendingRefund(auctionId, msg.sender);

        (bool success, ) = payable(msg.sender).call{value: amount}("");

        if (!success) {
            revert FundTransferFailed();
        }
    }

    function releasePayment(uint escrowId) public payable {
        (uint amount, address seller, bool escrowSuccess) = escrow
            .releaseProperty(escrowId);

        if (escrowSuccess) {
            (bool sucess, ) = payable(seller).call{value: amount}("");
            if (!sucess) {
                revert FundTransferFailed();
            }
        }
    }

    function cancelEscrow(uint escrowId, EscrowCloseReason reason) public {
        (uint amount, address buyer) = escrow.closeEscrow(escrowId, reason);

        (bool success, ) = payable(buyer).call{value: amount}("");
        if (!success) {
            revert FundTransferFailed();
        }
    }
}
