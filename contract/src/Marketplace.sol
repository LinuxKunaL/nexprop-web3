// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./libraries/Structs.sol";
import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IAuction.sol";
import "./interfaces/IMarketplace.sol";

contract Marketplace is IMarketplace {
    IAuction public auction;
    IPropertyNFT public propertyNFT;

    constructor(address auctionAddress, address propertyNFTAddress) {
        auction = IAuction(auctionAddress);
        propertyNFT = IPropertyNFT(propertyNFTAddress);
    }

    function createProperty(
        Structs.CreatePropertyParams calldata params
    ) public {
        Structs.NFTMintParams memory propertyNFTData = Structs.NFTMintParams({
            businessId: params.businessId,
            listingType: params.listingType,
            price: params.price,
            propertyStatus: params.propertyStatus,
            metadataCID: params.metadataCID
        });

        uint256 tokenId = propertyNFT.mint(propertyNFTData);

        if (params.listingType == ListingType.auction) {
            Structs.CreateAuctionParams memory auctionData = Structs
                .CreateAuctionParams({
                    tokenId: tokenId,
                    startPrice: params.auctionStartPrice,
                    startTime: params.auctionStartPrice,
                    endTime: params.auctionStartPrice
                });
            auction.createAuction(auctionData);
        }
    }
}
