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
        PropertyStatus propertyStatus;
        string metadataCID;
        string documentsCID;
        bool isLocked;
        LockReason lockReason;
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
        AuctionDuration auctionDuration;
        PropertyStatus propertyStatus;
        string metadataCID;
        string documentsCID;
    }

    struct RelistPropertyParams {
        uint tokenId;
        uint startPrice;
        AuctionDuration duration;
    }

    struct CreateAuctionParams {
        uint tokenId;
        uint startPrice;
        AuctionDuration duration;
    }

    struct NFTMintParams {
        address creator;
        uint256 businessId;
        ListingType listingType;
        uint256 price;
        PropertyStatus propertyStatus;
        string metadataCID;
        string documentsCID;
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
        PurchaseMode purchaseMode;
        address seller;
        address buyer;
        uint amount;
        uint createdAt;
        uint expiresAt;
        EscrowCloseReason closeReason;
        EscrowProgress status;
    }

    struct CreateEscrowParams {
        PurchaseMode purchaseMode;
        uint tokenId;
        uint amount;
        address buyer;
    }

    struct BuyPropertyParams {
        uint tokenId;
    }

    struct _ExecutePurchaseParams {
        uint tokenId;
        uint amount;
        address buyer;
    }
}
