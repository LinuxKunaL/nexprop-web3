// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

library Structs {
    struct Property {
        uint256 tokenId;
        uint256 businessId;
        address creator;
        address owner;
        string listingType;
        uint256 price;
        string auctionStartPrice;
        string auctionStartTime;
        string auctionEndTime;
        string propertyStatus;
        string metadataCID;
        uint256 createdAt;
    }

    struct MintNFTParams {
        uint256 businessId;
        string listingType;
        uint256 price;
        string auctionStartPrice;
        string auctionStartTime;
        string auctionEndTime;
        string propertyStatus;
        string metadataCID;
    }
}
