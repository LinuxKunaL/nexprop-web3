// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

interface IEscrow {
    function createEscrow(uint) external;

    function lockFunds(uint) external;

    function viewDocuments(uint) external;
    function acceptDocuments(uint) external;
    function rejectDocuments(uint) external;

    function releasePayment(uint) external;

    function completeEscrow(uint) external;
    function cancelEscrow(uint) external;
    function expireEscrow(uint) external;
    function closeEscrow(uint) external;

    function getEscrow(uint) external;
    function getAllEscrows() external;
    function getEscrowStatus(uint) external;
    function isExpired(uint) external;
}
