// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "../libraries/Structs.sol";

interface IEscrow {
    function createEscrow(Structs.CreateEscrowParams memory) external;

    function viewDocuments(uint) external view returns (string memory);

    function acceptDocuments(uint, address) external;

    function releaseProperty(
        uint,
        address
    ) external returns (uint, address, bool);

    function closeEscrow(
        uint,
        address,
        EscrowCloseReason
    ) external returns (address, uint);

    function getEscrow(uint) external view returns (Structs.Escrow memory);

    function getAllEscrows() external view returns (Structs.Escrow[] memory);

    function getEscrowStatus(
        uint
    ) external view returns (Structs.EscrowProgress memory);
}
