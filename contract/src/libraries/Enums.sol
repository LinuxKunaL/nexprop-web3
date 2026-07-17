// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

enum LockStatus {
    Unlocked,
    Locked
}

enum ListingType {
    Direct,
    Auction
}

enum AuctionStatus {
    None,
    Active,
    Ended,
    Cancelled
}

enum AuctionDuration {
    ThreeDays,
    FiveDays,
    SevenDays,
    FourteenDays,
    ThirtyDays
}

enum PurchaseMode {
    Direct,
    Auction
}

enum EscrowCloseReason {
    None,
    DocumentsRejected,
    TimeLimitExceeded
}