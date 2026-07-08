// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

struct Property {
    uint256 tokenId;
    uint256 businessId;
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
    address owner;
    string listingType;
    uint256 price;
    string auctionStartPrice;
    string auctionStartTime;
    string auctionEndTime;
    string propertyStatus;
    string metadataCID;
}
