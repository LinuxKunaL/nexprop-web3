// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "../libraries/Structs.sol";

interface IPropertyNFT {
    function mint(
        Structs.NFTMintParams calldata params
    ) external returns (uint256);

    function transfer(uint, address) external;

    function ownerOfToken(uint) external returns (address);

    function lock(uint, bool, LockReason) external;

    function changeStatus(uint, PropertyStatus) external;

    function setListingStatus(uint, bool) external;

    function get(uint256) external view returns (Structs.Property memory);

    function getDocumentsCID(uint) external view returns (string memory);

    function getPrice(uint) external view returns (uint);

    function getAll() external view returns (Structs.Property[] memory);

    function total() external view returns (uint256);

    function requireUnlocked(uint) external view;
}
