// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./interfaces/IAccessManager.sol";
import "./libraries/Errors.sol";

contract AccessManager is IAccessManager {
    address public marketplace;

    function setMarketplace(address marketplaceAddress) public {
        if (!(marketplace == address(0))) {
            revert AlreadyInitialized();
        }
        marketplace = marketplaceAddress;
    }

    function isMarketplace(address account) public view returns (bool) {
        return account == marketplace;
    }
}
