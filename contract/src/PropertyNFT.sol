// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;
import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./libraries/Errors.sol";
import "./libraries/Structs.sol";

import "./interfaces/IAccessManager.sol";
import "./interfaces/IPropertyNFT.sol";

contract PropertyNFT is ERC721URIStorage, Ownable(msg.sender), IPropertyNFT {
    IAccessManager public accessManager;

    constructor(
        address accessManagerAddress
    ) ERC721("nexprop main token creation", "NXP") {
        accessManager = IAccessManager(accessManagerAddress);
    }

    modifier _onlyMarketplace() {
      if (!(accessManager.isMarketplace(msg.sender))) {
            revert OnlyAccessByMarketplace();
        }
        _;
    }

    uint256 public nextTokenId = 0;

    mapping(uint256 => Structs.Property) properties;

    function mint(
        Structs.NFTMintParams calldata params
    ) public _onlyMarketplace returns (uint256) {
        uint256 tokenId = ++nextTokenId;

        _safeMint(msg.sender, tokenId);

        Structs.Property memory propertyData = Structs.Property({
            tokenId: tokenId,
            creator: msg.sender,
            owner: msg.sender,
            price: params.price,
            businessId: params.businessId,
            listingType: params.listingType,
            propertyStatus: params.propertyStatus,
            metadataCID: params.metadataCID,
            documentsCID: params.documentsCID,
            isLocked: false,
            createdAt: block.timestamp
        });

        properties[tokenId] = propertyData;

        return tokenId;
    }

    function transfer(uint tokenId) public _onlyMarketplace returns (address) {
        require(tokenId > 0 && tokenId <= nextTokenId, "Token not found");
        checkLock(tokenId);

        address PropertyOwner = ownerOf(tokenId);

        _transfer(PropertyOwner, msg.sender, tokenId);

        properties[tokenId].owner = msg.sender;

        return PropertyOwner;
    }

    function ownerOfToken(uint tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    function lock(uint tokenId, bool locked) public _onlyMarketplace {
        require(tokenId > 0 && tokenId <= nextTokenId, "Token not found");
        // implement the permission for only Aution SM has access of lock
        properties[tokenId].isLocked = locked;
    }

    function get(
        uint256 tokenId
    ) public view returns (Structs.Property memory) {
        require(tokenId > 0 && tokenId <= nextTokenId, "Token not found");

        return properties[tokenId];
    }

    function getDocumentsCID(
        uint256 tokenId
    ) public view returns (string memory) {
        return properties[tokenId].documentsCID;
    }

    function getPrice(uint tokenId) public view returns (uint) {
        return properties[tokenId].price;
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

    function checkLock(uint tokenId) public view {
        require(!properties[tokenId].isLocked, "Token is locked");
    }
}

// [1,"direact",12,null,null,null,"listing","12312"]
