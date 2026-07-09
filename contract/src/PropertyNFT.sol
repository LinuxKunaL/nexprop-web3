// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./libraries/Structs.sol";

contract PropertyNFT is ERC721URIStorage, Ownable(msg.sender) {
    constructor() ERC721("nexprop main token creation", "NXP") {}

    uint256 public nextTokenId = 0;

    mapping(uint256 => Structs.Property) properties;

    function mint(
        Structs.MintNFTParams calldata params
    ) public returns (uint256) {
        uint256 tokenId = ++nextTokenId;

        _safeMint(msg.sender, tokenId);

        Structs.Property memory propertyData = Structs.Property({
            tokenId: tokenId,
            creator: msg.sender,
            owner:msg.sender,
            price: params.price,
            businessId: params.businessId,
            listingType: params.listingType,
            auctionStartPrice: params.auctionStartPrice,
            auctionStartTime: params.auctionStartTime,
            auctionEndTime: params.auctionEndTime,
            propertyStatus: params.propertyStatus,
            metadataCID: params.metadataCID,
            createdAt: block.timestamp
        });

        properties[tokenId] = propertyData;

        return tokenId;
    }

    function transfer(uint tokenId) public payable returns (address) {
        require(tokenId <= nextTokenId,"Token not found");

        address payable PropertyOwner = payable(ownerOf(tokenId));

        _transfer(PropertyOwner, msg.sender, tokenId);

        properties[tokenId].owner = msg.sender;
        
        return PropertyOwner;
    }

    function get(
        uint256 tokenId
    ) public view returns (Structs.Property memory) {
        return properties[tokenId];
    }

    function getAll() public view returns (Structs.Property[] memory) {
        Structs.Property[] memory propertyList = new Structs.Property[](
            nextTokenId
        );
        for (uint256 i = 1; i <= nextTokenId; i++) {
            propertyList[i - 1] = properties[i];
        }
        return propertyList;
    }

    function total() public view returns (uint256) {
        return nextTokenId;
    }
}

// [1,"direact",12,null,null,null,"listing","12312"]
