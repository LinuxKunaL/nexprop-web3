// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "../libraries/Structs.sol";

interface IAuction {
    function createAuction(
        Structs.CreateAuctionParams calldata params
    ) external;

    function placeBid(uint) external payable;

    function withdrawRefund(uint) external;

    function cancelAuction(uint) external;

    function endAuction(uint) external;

    function getAuction(uint) external view returns (Structs.Auction memory);

    function getAllAuctions() external view returns (Structs.Auction[] memory);

    function getHighestBid(uint) external view returns (uint);

    function getHighestBidder(uint) external view returns (address);

    function declareWinner(uint) external returns (uint, uint, address);
}
