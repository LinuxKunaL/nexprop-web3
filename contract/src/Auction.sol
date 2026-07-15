// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./interfaces/IAuction.sol";
import "./interfaces/IMarketplace.sol";
import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IAccessManager.sol";

import "./libraries/Enums.sol";
import "./libraries/Structs.sol";
import "./libraries/Errors.sol";

contract Auction is IAuction {
    IPropertyNFT public propertyNFT;
    IAccessManager public accessManager;

    constructor(address propertyNFTAddress, address accessManagerAddress) {
        propertyNFT = IPropertyNFT(propertyNFTAddress);
        accessManager = IAccessManager(accessManagerAddress);
    }

    modifier _onlyMarketplace() {
        if (!(accessManager.isMarketplace(msg.sender))) {
            revert OnlyAccessByMarketplace();
        }
        _;
    }

    uint public nextAuctionId = 0;

    mapping(uint => Structs.Auction) auctions;
    mapping(uint => mapping(address => uint)) pendingRefunds;

    function createAuction(
        Structs.CreateAuctionParams calldata params
    ) public _onlyMarketplace {

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

    function placeBid(
        uint auctionId,
        address bidder,
        uint bidAmount
    ) public _onlyMarketplace {

        if (auctionId == 0 || auctionId > nextAuctionId) {
            revert AuctionNotFound();
        }

        uint tokenId = auctions[auctionId].tokenId;
        address ownerOfAuction = propertyNFT.ownerOfToken(tokenId);

        if (bidder == ownerOfAuction) {
            revert SellerCantBid();
        }

        Structs.Auction storage auction = auctions[auctionId];

        if (!(auction.status == AuctionStatus.Active)) {
            revert AuctionNotActive();
        }

        if (block.timestamp >= auction.endTime) {
            revert AuctionEnded();
        }

        address currentBidder = bidder;
        uint currentBidPrice = bidAmount;

        if (auction.highestBid == 0) {
            if (bidAmount < auction.startPrice) {
                revert BidTooLow();
            }
        } else {
            if (bidAmount <= auction.highestBid) {
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

    function getPendingRefund(
        uint auctionId,
        address sender
    ) public view returns (uint) {
        uint withdrawAmount = pendingRefunds[auctionId][sender];

        if (withdrawAmount == 0) {
            revert NoRefundAvailable();
        }

        return withdrawAmount;
    }

    function clearPendingRefund(
        uint auctionId,
        address sender
    ) public _onlyMarketplace {
        pendingRefunds[auctionId][sender] = 0;
    }

    function cancelAuction(uint auctionId) public _onlyMarketplace {
        uint tokenId = auctions[auctionId].tokenId;
        address ownerOfAuction = propertyNFT.ownerOfToken(tokenId);

        require(
            ownerOfAuction == msg.sender,
            "You are not owner of this auction"
        );

        auctions[auctionId].status = AuctionStatus.Cancelled;
    }

    function endAuction(uint auctionId) public _onlyMarketplace {
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

    function getHighestBidder(uint auctionId) public view returns (address) {
        return auctions[auctionId].highestBidder;
    }

    function declareWinner(
        uint auctionId
    ) public _onlyMarketplace returns (uint, uint, address) {
        endAuction(auctionId);

        uint amount = auctions[auctionId].highestBid;
        address winner = auctions[auctionId].highestBidder;
        uint tokenId = auctions[auctionId].tokenId;

        return (tokenId, amount, winner);
    }
}
