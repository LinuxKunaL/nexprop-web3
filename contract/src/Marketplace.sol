// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./libraries/Structs.sol";

import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IAuction.sol";
import "./interfaces/IMarketplace.sol";
import "./interfaces/IEscrow.sol";

contract Marketplace is IMarketplace {
    IAuction public auction;
    IPropertyNFT public propertyNFT;
    IEscrow public escrow;

    constructor(
        address auctionAddress,
        address propertyNFTAddress,
        address escrowAddress
    ) {
        auction = IAuction(auctionAddress);
        propertyNFT = IPropertyNFT(propertyNFTAddress);
        escrow = IEscrow(escrowAddress);
    }

    function createProperty(
        Structs.CreatePropertyParams calldata params
    ) public {
        Structs.NFTMintParams memory propertyNFTData = Structs.NFTMintParams({
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
                    startTime: params.auctionStartPrice,
                    endTime: params.auctionStartPrice
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

    function buyProperty(Structs.BuyPropertyParams memory params) public {
        escrow.createEscrow();
    }
}
