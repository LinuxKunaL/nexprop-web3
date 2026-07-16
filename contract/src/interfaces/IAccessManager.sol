// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

interface IAccessManager {
    function isMarketplace(address) external view returns (bool);
    function isEscrow(address) external view returns (bool);
}
