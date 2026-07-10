// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;
import "../libraries/Structs.sol";

interface IMarketplace {
    function createProperty(
        Structs.CreatePropertyParams calldata params
    ) external;
}
