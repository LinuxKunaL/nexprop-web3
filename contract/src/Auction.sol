// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./interfaces/IAuction.sol";
import "./interfaces/IMarketplace.sol";
import "./interfaces/IPropertyNFT.sol";

import "./libraries/Enums.sol";
import "./libraries/Structs.sol";
import "./libraries/Errors.sol";

contract Auction is IAuction {
    IPropertyNFT public propertyNFT;

    constructor(address propertyNFTAddress) {
        propertyNFT = IPropertyNFT(propertyNFTAddress);
    }

    uint public nextAuctionId = 0;

    mapping(uint => Structs.Auction) auctions;
    mapping(uint => mapping(address => uint)) pendingRefunds;

    function createAuction(Structs.CreateAuctionParams calldata params) public {
        uint256 auctionId = ++nextAuctionId;

        Structs.Auction memory auctionData = Structs.Auction({
            auctionId: auctionId,
            tokenId: params.tokenId,
            highestBid: 0,
            highestBidder: address(0),
            startPrice: params.startPrice,
            startTime: params.startTime,
            endTime: params.endTime,
            status: AuctionStatus.Active
        });

        auctions[nextAuctionId] = auctionData;
    }

    function placeBid(uint auctionId) public payable {
        if (auctionId == 0 || auctionId > nextAuctionId) {
            revert AuctionNotFound();
        }

        uint tokenId = auctions[auctionId].tokenId;
        address ownerOfAuction = propertyNFT.ownerOfToken(tokenId);

        if (msg.sender == ownerOfAuction) {
            revert SellerCantBid();
        }

        Structs.Auction storage auction = auctions[auctionId];

        if (!(auction.status == AuctionStatus.Active)) {
            revert AuctionNotActive();
        }

        if (block.timestamp >= auction.endTime) {
            revert AuctionEnded();
        }

        address currentBidder = msg.sender;
        uint currentBidPrice = msg.value;

        if (auction.highestBid == 0) {
            if (msg.value < auction.startPrice) {
                revert BidTooLow();
            }
        } else {
            if (msg.value <= auction.highestBid) {
                revert BidTooLow();
            }
        }

        address previousBidder = auction.highestBidder;
        uint previousBidPrice = auction.highestBid;

        if (previousBidder != address(0)) {
            pendingRefunds[auctionId][previousBidder] += previousBidPrice;
        }

        auction.highestBidder = currentBidder;
        auction.highestBid = currentBidPrice;
    }

    function withdrawRefund(uint auctionId) public {
        uint withdrawAmount = pendingRefunds[auctionId][msg.sender];

        if (withdrawAmount == 0) {
            revert NoRefundAvailable();
        }

        pendingRefunds[auctionId][msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{value: withdrawAmount}("");

        if (!success) {
            revert FundTransferFailed();
        }
    }

    function cancelAuction(uint auctionId) public {
        uint tokenId = auctions[auctionId].tokenId;
        address ownerOfAuction = propertyNFT.ownerOfToken(tokenId);

        require(
            ownerOfAuction == msg.sender,
            "You are not owner of this auction"
        );

        auctions[auctionId].status = AuctionStatus.Cancelled;
    }

    function endAuction(uint auctionId) public {
        auctions[auctionId].status = AuctionStatus.Ended;
    }

    function getAuction(
        uint auctionId
    ) public view returns (Structs.Auction memory) {
        require(
            auctionId > 0 && auctionId <= nextAuctionId,
            "Auction not found"
        );
        return auctions[auctionId];
    }

    function getAllAuctions() public view returns (Structs.Auction[] memory) {
        Structs.Auction[] memory auctionList = new Structs.Auction[](
            nextAuctionId
        );

        for (uint i = 1; i < nextAuctionId; i++) {
            auctionList[i - 1] = auctions[i];
        }

        return auctionList;
    }

    function getHighestBid(uint auctionId) public view returns (uint) {
        return auctions[auctionId].highestBid;
    }
}
