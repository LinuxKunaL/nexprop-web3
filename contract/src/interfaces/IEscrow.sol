// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "../libraries/Structs.sol";

interface IEscrow {
    function createEscrow(Structs.CreateEscrowParams memory) external;

    function viewDocuments(uint) external view returns (string memory);

    function acceptDocuments(uint) external;

    function releaseProperty(uint) external returns (uint, address, bool);

    function closeEscrow(
        uint,
        EscrowCloseReason
    ) external returns (uint, address);

    function getEscrow(uint) external view returns (Structs.Escrow memory);

    function getAllEscrows() external view returns (Structs.Escrow[] memory);

    function getEscrowStatus(
        uint
    ) external view returns (Structs.EscrowProgress memory);
}
