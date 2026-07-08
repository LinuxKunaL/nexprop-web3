// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./libraries/Structs.sol";

contract PropertyNFT is ERC721URIStorage, Ownable(msg.sender) {
    constructor() ERC721("nexprop main token creation", "NXP") {}

    uint256 public nextTokenId = 0;

    mapping(uint256 => Property) properties;

    function mint(MintNFTParams calldata params) public {
        uint256 tokenId = ++nextTokenId;

        _safeMint(params.owner, tokenId);

        Property memory propertyData = Property({
            tokenId: tokenId,
            businessId: params.businessId,
            owner: params.owner,
            listingType: params.listingType,
            price: params.price,
            auctionStartPrice: params.auctionStartPrice,
            auctionStartTime: params.auctionStartTime,
            auctionEndTime: params.auctionEndTime,
            propertyStatus: params.propertyStatus,
            metadataCID: params.metadataCID,
            createdAt: block.timestamp
        });

        properties[nextTokenId] = propertyData;
    }

    function transfer() public {}

    function get(uint256 tokenId) public view returns (Property memory) {
        return properties[tokenId];
    }

    function getAll() public view returns (Property[] memory) {
        Property[] memory propertyList = new Property[](nextTokenId);
        for (uint256 i = 1; i < nextTokenId; i++) {
            propertyList[i - 1] = properties[i];
        }
        return propertyList;
    }

    function approve() public {}

    function total() public view returns (uint256) {
        return nextTokenId;
    }
}

// [1,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4,"direact",12,null,null,null,"listing","12312"]
