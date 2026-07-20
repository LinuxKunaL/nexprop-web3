// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;
import "../libraries/Structs.sol";

interface IMarketplace {
    function createProperty(Structs.CreatePropertyParams calldata) external;

    function unlistProperty(uint) external;

    function relistProperty(Structs.RelistPropertyParams memory) external;

    function buyProperty(Structs.BuyPropertyParams memory) external payable;

    function placeBid(uint) external payable;

    function declareAuctionWinner(uint) external;

    function withdrawRefund(uint) external payable;

    function acceptDocuments(uint) external;

    function rejectDocuments(uint) external;

    function escrowTimeLimitExceeded(uint) external;

    function releasePayment(uint, bool) external;
}
