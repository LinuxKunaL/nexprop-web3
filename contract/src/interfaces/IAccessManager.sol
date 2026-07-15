// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

interface IAccessManager {
    function isMarketplace(address account) external view returns (bool);
}
