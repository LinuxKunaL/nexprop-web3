// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

enum LockStatus {
    Unlocked,
    Locked
}

enum ListingType {
    direct,
    auction
}

enum AuctionStatus {
    None,
    Active,
    Ended,
    Cancelled
}

enum AuctionDuration {
    THREE_DAYS,
    FIVE_DAYS,
    SEVEN_DAYS,
    FOURTEEN_DAYS,
    THIRTY_DAYS
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
