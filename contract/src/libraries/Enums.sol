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