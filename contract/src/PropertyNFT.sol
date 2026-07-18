// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";

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
        console.log("error from PropertyNFT", msg.sender);
        if (!(accessManager.isMarketplace(msg.sender))) {
            revert OnlyAccessByMarketplace();
        }
        _;
    }

    modifier _onlyEscrow() {
        if (!(accessManager.isEscrow(msg.sender))) {
            revert OnlyAccessByEscrow();
        }
        _;
    }

    uint256 public nextTokenId = 0;

    mapping(uint256 => Structs.Property) properties;

    function mint(
        Structs.NFTMintParams calldata params
    ) public _onlyMarketplace returns (uint256) {
        uint256 tokenId = ++nextTokenId;

        _safeMint(params.creator, tokenId);

        bool isAuction = params.listingType == ListingType.Auction;

        Structs.Property memory propertyData = Structs.Property({
            tokenId: tokenId,
            creator: params.creator,
            owner: params.creator,
            price: params.price,
            businessId: params.businessId,
            listingType: params.listingType,
            propertyStatus: params.propertyStatus,
            metadataCID: params.metadataCID,
            documentsCID: params.documentsCID,
            isLocked: isAuction ? true : false,
            lockReason: isAuction ? LockReason.Auction : LockReason.None,
            createdAt: block.timestamp
        });

        properties[tokenId] = propertyData;

        return tokenId;
    }

    function transfer(
        uint tokenId,
        address transferTo
    ) public _onlyEscrow returns (address) {
        require(tokenId > 0 && tokenId <= nextTokenId, "Token not found");

        requireUnlocked(tokenId);

        address PropertyOwner = ownerOf(tokenId);

        _transfer(PropertyOwner, transferTo, tokenId);

        properties[tokenId].owner = transferTo;

        return PropertyOwner;
    }

    function ownerOfToken(uint tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    function lock(
        uint tokenId,
        bool locked,
        LockReason reason
    ) public _onlyEscrow {
        require(tokenId > 0 && tokenId <= nextTokenId, "Token not found");

        properties[tokenId].lockReason = reason;
        properties[tokenId].isLocked = locked;
    }

    function changeStatus(
        uint tokenId,
        PropertyStatus status
    ) public _onlyEscrow {
        properties[tokenId].propertyStatus = status;
    }

    function setListingStatus(
        uint tokenId,
        bool listed
    ) public _onlyMarketplace {
        requireUnlocked(tokenId);

        Structs.Property storage property = properties[tokenId];

        PropertyStatus newStatus = listed
            ? PropertyStatus.Available
            : PropertyStatus.Unlisted;

        if (property.propertyStatus == newStatus) {
            revert PropertyAlreadyInStatus();
        }

        property.propertyStatus = newStatus;
    }

    function updateMetadataCID(
        uint tokenId,
        string calldata newMetadataCID,
        address owner
    ) public _onlyMarketplace {
        requireUnlocked(tokenId);

        Structs.Property storage property = properties[tokenId];

        if (!(owner == property.owner)) {
            revert NotAuthorized();
        }

        property.metadataCID = newMetadataCID;
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

    function requireUnlocked(uint tokenId) public view {
        if (properties[tokenId].isLocked) {
            revert PropertyLocked(properties[tokenId].lockReason);
        }
    }
}
