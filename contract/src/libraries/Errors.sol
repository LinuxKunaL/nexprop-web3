// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Enums.sol";

error IncorrectPayment();
error InvalidPropertyStatus();
error PropertyLocked(LockReason reason);
error PropertyAlreadyInStatus();
error SelfTransferNotAllowed();

error AuctionNotFound();
error AuctionNotActive();
error AuctionEnded();
error SellerCantBid();
error InvalidAuctionDuration();
error InvalidStartTime();
error FundTransferFailed();
error BidTooLow();
error NoRefundAvailable();
error AuctionNotEnded();

error NotAuthorized();

error AlreadyInitialized();

error OnlyAccessByMarketplace();
error OnlyAccessByEscrow();

error CannotBuyOwnProperty();

error DocumentsNotVerified();
error TimeExceededInvalid();
