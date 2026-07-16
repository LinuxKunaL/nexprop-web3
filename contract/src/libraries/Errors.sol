// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

error IncorrectPayment();

error AuctionNotFound();
error AuctionNotActive();
error AuctionEnded();
error SellerCantBid();
error InvalidAuctionDuration();
error InvalidStartTime();
error FundTransferFailed();
error BidTooLow();
error NoRefundAvailable();

error NotAuthorized();

error AlreadyInitialized();

error  OnlyAccessByMarketplace();