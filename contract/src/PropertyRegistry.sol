// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./PropertyNFT.sol";

contract PropertyRegistry {
    PropertyNFT public propertyNFT;

    constructor(address propertyNFTAddress) {
        propertyNFT = PropertyNFT(propertyNFTAddress);
    }

    function registerProperty() public {}

    function getProperty() public {}

    function getProperties() public {}

    function hideProperty() public {}

    function unhideProperty() public {}

    function freezeProperty() public {}

    function unfreezeProperty() public {}

    function listProperties() public {}
}
