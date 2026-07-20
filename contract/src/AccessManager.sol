// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./interfaces/IAccessManager.sol";
import "./libraries/Errors.sol";

contract AccessManager is IAccessManager {
    address public marketplace;
    address public escrow;

    function setMarketplace(address marketplaceAddress) public {
        if (!(marketplace == address(0))) {
            revert AlreadyInitialized();
        }
        marketplace = marketplaceAddress;
    }

    function setEscrow(address escrowAddress) public {
        if (!(escrow == address(0))) {
            revert AlreadyInitialized();
        }
        escrow = escrowAddress;
    }

    function isMarketplace(address account) public view returns (bool) {
        return account == marketplace;
    }

    function isEscrow(address account) public view returns (bool) {
        return account == escrow;
    }

    modifier onlyMarketplace() {
        if (!(isMarketplace(msg.sender))) {
            revert OnlyAccessByMarketplace();
        }
        _;
    }

    modifier onlyEscrow() {
        if (!(isEscrow(msg.sender))) {
            revert OnlyAccessByEscrow();
        }
        _;
    }
}
