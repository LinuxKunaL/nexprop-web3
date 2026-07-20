// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "hardhat/console.sol";
import "./interfaces/IAuction.sol";
import "./interfaces/IMarketplace.sol";
import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IAccessManager.sol";

import "./libraries/Enums.sol";
import "./libraries/Structs.sol";
import "./libraries/Errors.sol";

import "./AccessManager.sol";

contract Auction is IAuction, AccessManager {
    IPropertyNFT public propertyNFT;
    IAccessManager public accessManager;

    constructor(address propertyNFTAddress, address accessManagerAddress) {
        propertyNFT = IPropertyNFT(propertyNFTAddress);
        accessManager = IAccessManager(accessManagerAddress);
    }

    uint public nextAuctionId = 0;

    mapping(uint => Structs.Auction) auctions;
    mapping(uint => mapping(address => uint)) pendingRefunds;

    function createAuction(
        Structs.CreateAuctionParams calldata params
    ) public onlyMarketplace {
        uint256 auctionId = ++nextAuctionId;

        Structs.Auction memory auctionData = Structs.Auction({
            auctionId: auctionId,
            tokenId: params.tokenId,
            highestBid: 0,
            highestBidder: address(0),
            startPrice: params.startPrice,
            startTime: block.timestamp,
            endTime: block.timestamp + _durationInSeconds(params.duration),
            status: AuctionStatus.Active
        });

        auctions[nextAuctionId] = auctionData;
    }

    function placeBid(
        uint auctionId,
        address bidder,
        uint bidAmount
    ) public onlyMarketplace {
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
    ) public onlyMarketplace {
        pendingRefunds[auctionId][sender] = 0;
    }

    function cancelAuction(uint auctionId) public onlyMarketplace {
        uint tokenId = auctions[auctionId].tokenId;
        address ownerOfAuction = propertyNFT.ownerOfToken(tokenId);

        if (ownerOfAuction != msg.sender) revert NotAuctionOwner();

        auctions[auctionId].status = AuctionStatus.Cancelled;
    }

    function getAuction(
        uint auctionId
    ) public view returns (Structs.Auction memory) {
        if (auctionId == 0 || auctionId > nextAuctionId)
            revert AuctionNotFound();

        return auctions[auctionId];
    }

    function getAllAuctions() public view returns (Structs.Auction[] memory) {
        Structs.Auction[] memory auctionList = new Structs.Auction[](
            nextAuctionId
        );

        for (uint i = 1; i <= nextAuctionId; i++) {
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

    function isAuctionEnded(uint256 auctionId) public view returns (bool) {
        return block.timestamp >= auctions[auctionId].endTime;
    }

    function declareWinner(
        uint auctionId
    ) public onlyMarketplace returns (uint, uint, address) {
        auctions[auctionId].status = AuctionStatus.Ended;

        uint amount = auctions[auctionId].highestBid;
        address winner = auctions[auctionId].highestBidder;
        uint tokenId = auctions[auctionId].tokenId;

        return (tokenId, amount, winner);
    }

    function _durationInSeconds(
        AuctionDuration duration
    ) internal pure returns (uint) {
        uint durationInSeconds;

        if (duration == AuctionDuration.ThreeDays) {
            durationInSeconds = 3 days;
        } else if (duration == AuctionDuration.FiveDays) {
            durationInSeconds = 5 days;
        } else if (duration == AuctionDuration.SevenDays) {
            durationInSeconds = 7 days;
        } else if (duration == AuctionDuration.FourteenDays) {
            durationInSeconds = 14 days;
        } else if (duration == AuctionDuration.ThirtyDays) {
            durationInSeconds = 30 days;
        } else {
            revert InvalidAuctionDuration();
        }
        return durationInSeconds;
    }
}
