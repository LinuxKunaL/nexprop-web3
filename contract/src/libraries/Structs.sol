// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./Enums.sol";

library Structs {
    struct Property {
        uint256 tokenId;
        uint256 businessId;
        address creator;
        address owner;
        ListingType listingType;
        uint256 price;
        string propertyStatus;
        string metadataCID;
        bool isLocked;
        uint256 createdAt;
    }

    struct Auction {
        uint auctionId;
        uint tokenId;
        uint highestBid;
        address highestBidder;
        uint startPrice;
        uint startTime;
        uint endTime;
        AuctionStatus status;
    }

    struct CreatePropertyParams {
        uint256 businessId;
        ListingType listingType;
        uint256 price;
        string auctionStartPrice;
        string auctionStartTime;
        string auctionEndTime;
        string propertyStatus;
        string metadataCID;
    }

    struct CreateAuctionParams {
        uint tokenId;
        uint startPrice;
        uint startTime;
        uint endTime;
    }

    struct NFTMintParams {
        uint256 businessId;
        ListingType listingType;
        uint256 price;
        string propertyStatus;
        string metadataCID;
    }
}
