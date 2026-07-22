// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "./libraries/Enums.sol";
import "./libraries/Structs.sol";
import "./libraries/Errors.sol";

import "./interfaces/IPropertyNFT.sol";
import "./interfaces/IAuction.sol";
import "./interfaces/IMarketplace.sol";
import "./interfaces/IEscrow.sol";

contract Marketplace is IMarketplace {
    IAuction public auction;
    IPropertyNFT public propertyNFT;
    IEscrow public escrow;

    /// @notice Initializes the Marketplace contract.
    /// @dev Sets the address of the PropertyNFT, Auction and Escrow contracts.
    /// @param propertyNFTAddress Address of the deployed.
    /// @param auctionAddress Address of the deployed.
    /// @param escrowAddress Address of the deployed.
    constructor(
        address propertyNFTAddress,
        address auctionAddress,
        address escrowAddress
    ) {
        propertyNFT = IPropertyNFT(propertyNFTAddress);
        auction = IAuction(auctionAddress);
        escrow = IEscrow(escrowAddress);
    }

    /// @notice Creates a new property listing.
    /// @dev Mints a new Property NFT and stores its metadata.
    /// @param params Struct containing all property creation details.
    /// @custom:caller Any user
    function createProperty(
        Structs.CreatePropertyParams calldata params
    ) public {
        if (
            params.propertyStatus != PropertyStatus.Available &&
            params.propertyStatus != PropertyStatus.Unlisted
        ) {
            revert InvalidPropertyStatus();
        }
        Structs.NFTMintParams memory propertyNFTData = Structs.NFTMintParams({
            creator: msg.sender,
            businessId: params.businessId,
            listingType: params.listingType,
            price: params.price,
            propertyStatus: params.propertyStatus,
            metadataCID: params.metadataCID,
            documentsCID: params.documentsCID
        });

        uint256 tokenId = propertyNFT.mint(propertyNFTData);

        if (params.propertyStatus == PropertyStatus.Available) {
            if (params.listingType == ListingType.Auction) {
                Structs.CreateAuctionParams memory auctionData = Structs
                    .CreateAuctionParams({
                        tokenId: tokenId,
                        startPrice: params.auctionStartPrice,
                        duration: params.auctionDuration
                    });
                auction.createAuction(auctionData);
            }
        }
    }

    /// @notice Unlist the property.
    /// @dev It can unlist the property and prevanting buy/transfer opration.
    /// @param tokenId the Propertyid
    /// @custom:caller Any user
    function unlistProperty(uint tokenId) public {
        if (propertyNFT.ownerOfToken(tokenId) != msg.sender) {
            revert NotAuthorized();
        }

        propertyNFT.setListingStatus(tokenId, false);
    }

    /// @notice relist the property with
    /// @dev It can unlist the property and prevanting buy/transfer opration
    /// @param params Struct containing tokenId with relisted with new auction.
    /// @custom:caller Any user
    function relistProperty(Structs.RelistPropertyParams memory params) public {
        Structs.Property memory property = propertyNFT.get(params.tokenId);

        if (property.owner != msg.sender) {
            revert NotAuthorized();
        }
        propertyNFT.setListingStatus(params.tokenId, true);

        if (property.listingType == ListingType.Auction) {
            Structs.CreateAuctionParams memory auctionData = Structs
                .CreateAuctionParams({
                    tokenId: params.tokenId,
                    startPrice: params.startPrice,
                    duration: params.duration
                });
            auction.createAuction(auctionData);
        }
    }

    /// @notice Purchase the Property
    /// @dev When user buy it push property into the escrow contract.
    /// @param tokenId ID of the property to purchase.
    /// @custom:caller Any user
    /// @custom:purchase-mode Direct
    function buyProperty(uint tokenId) public payable {
        if (msg.sender == propertyNFT.ownerOfToken(tokenId)) {
            revert CannotBuyOwnProperty();
        }

        uint propertyPrice = propertyNFT.getPrice(tokenId);

        if (msg.value != propertyPrice) {
            revert IncorrectPayment();
        }

        propertyNFT.requireUnlocked(tokenId);

        Structs.CreateEscrowParams memory createEscrowData = Structs
            .CreateEscrowParams({
                purchaseMode: PurchaseMode.Direct,
                tokenId: tokenId,
                amount: msg.value,
                buyer: msg.sender
            });

        escrow.createEscrow(createEscrowData);
    }

    /// @notice Execute the Purchase
    /// @dev The Property Purchase used by auction winner settlement (declareAuctionWinner)
    /// @param params Contains tokenId,amount and buyer
    /// @custom:caller Internal only
    /// @custom:purchase-mode Auction
    function _executePurchase(
        Structs._ExecutePurchaseParams memory params
    ) internal {
        Structs.CreateEscrowParams memory createEscrowData = Structs
            .CreateEscrowParams({
                purchaseMode: PurchaseMode.Auction,
                tokenId: params.tokenId,
                amount: params.amount,
                buyer: params.buyer
            });
        escrow.createEscrow(createEscrowData);
    }

    /// @notice Place the Bid for Aucion
    /// @dev It's payable
    /// @param auctionid ID of the auction.
    function placeBid(uint auctionid) public payable {
        auction.placeBid(auctionid, msg.sender, msg.value);
    }

    /// @notice User for declare the Auction Winner
    /// @dev The function is automatically execute by the platform from backend(cron-Job)
    /// @param auctionId ID of the auction.
    /// @custom:caller platform
    function declareAuctionWinner(uint auctionId) public {
        if (!(auction.isAuctionEnded(auctionId))) {
            revert AuctionNotEnded();
        }

        (uint tokenId, uint amount, address winner) = auction.declareWinner(
            auctionId
        );
        _executePurchase(
            Structs._ExecutePurchaseParams({
                tokenId: tokenId,
                amount: amount,
                buyer: winner
            })
        );
    }

    /// @notice Withdraws the refundable bid amount from an auction.
    /// @dev Allows bidders who did not win the auction to withdraw their refundable balance.
    /// @param auctionId ID of the auction.
    /// @custom:caller Auction bidder
    function withdrawRefund(uint auctionId) public payable {
        uint amount = auction.getPendingRefund(auctionId, msg.sender);

        auction.clearPendingRefund(auctionId, msg.sender);

        (bool success, ) = payable(msg.sender).call{value: amount}("");

        if (!success) {
            revert FundTransferFailed();
        }
    }

    /// @notice Accepting documents which are send by the seller
    /// @dev The buyer can accept the documents in a process of escrow
    /// @param escrowId ID of the escrow.
    /// @custom:caller Property Buyer
    function acceptDocuments(uint escrowId) public {
        address buyer = msg.sender;
        escrow.acceptDocuments(escrowId, buyer);
    }

    /// @notice Rejecting documents which are send by the seller
    /// @dev The buyer can reject the documents in a process of escrow
    /// @param escrowId ID of the escrow.
    /// @custom:caller Property Buyer
    function rejectDocuments(uint escrowId) public {
        (address to, uint amount) = escrow.closeEscrow(
            escrowId,
            msg.sender,
            EscrowCloseReason.DocumentsRejected
        );
        _refundEscrowBalance(to, amount);
    }

    /// @notice When escrow verification time is reached, is refund the fund
    /// @dev The function is automatically execute by the platform from backend(cron-Job)
    /// @param escrowId ID of the escrow.
    /// @custom:caller Platform
    function escrowTimeLimitExceeded(uint escrowId) public {
        (address to, uint amount) = escrow.closeEscrow(
            escrowId,
            address(0),
            EscrowCloseReason.TimeLimitExceeded
        );
        _refundEscrowBalance(to, amount);
    }

    /// @notice Buyer are release the payment
    /// @dev The buyer can release the payment in a finalization of property purchase
    /// @param escrowId ID of the escrow.
    /// @param listProperty Boolean defined property will list or not after escrow completed.
    /// @custom:caller Property Buyer
    function releasePayment(uint escrowId, bool listProperty) public {
        address buyer = msg.sender;

        (uint amount, address seller, uint tokenId, bool escrowSuccess) = escrow
            .releaseProperty(escrowId, buyer);

        propertyNFT.setListingStatus(tokenId, listProperty ? true : false);

        if (escrowSuccess) {
            (bool sucess, ) = payable(seller).call{value: amount}("");
            if (!sucess) {
                revert FundTransferFailed();
            }
        }
    }

    /// @notice The refund is going back to the buyer
    /// @dev The function is transfer back the amount, which is lock in escrow.
    /// @param to Buyer address
    /// @param amount The locked Amount
    /// @custom:caller internal
    function _refundEscrowBalance(address to, uint amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        if (!success) {
            revert FundTransferFailed();
        }
    }
}
