// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "../libraries/Structs.sol";

interface IAuction {
    function createAuction(
        Structs.CreateAuctionParams calldata params
    ) external;

    function placeBid(uint, address, uint) external;

    function getPendingRefund(uint, address) external returns (uint);

    function clearPendingRefund(uint, address) external;

    function cancelAuction(uint) external;

    function getAuction(uint) external view returns (Structs.Auction memory);

    function getAllAuctions() external view returns (Structs.Auction[] memory);

    function getHighestBid(uint) external view returns (uint);

    function getHighestBidder(uint) external view returns (address);

    function isAuctionEnded(uint) external view returns (bool);

    function declareWinner(uint) external returns (uint, uint, address);
}
