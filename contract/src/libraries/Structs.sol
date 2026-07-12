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
        uint auctionStartPrice;
        uint auctionStartTime;
        uint auctionEndTime;
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

    struct EscrowProgress {
        bool fundsLocked;
        bool documentsVerified;
        bool paymentReleased;
        bool escrowClosed;
    }

    struct Escrow {
        uint escrowId;
        uint tokenId;
        address seller;
        address buyer;
        uint amount;
        uint createdAt;
        uint expiresAt;
        EscrowProgress status;
    }
  struct CreateEscrowParams {
        PurchaseMode purchaseMode;
        uint tokenId;
        uint amount;
        address buyer;
    }
    struct BuyPropertyParams {
        PurchaseMode purchaseMode;
        uint tokenId;
        uint amount;
        address buyer;
    }

  
}
