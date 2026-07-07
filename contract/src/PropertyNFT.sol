// SPDX-License-Identifier: MIT
pragma solidity ^0.8.34;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./libraries/Structs.sol";


contract PropertyNFT is ERC721URIStorage,Ownable(msg.sender) {
    constructor() ERC721("nexprop main registry","NXP"){}
    
    uint256 public nextTokenId = 0;

    function mint(address owner) public returns (uint256) {

          nextTokenId += 1;

          _safeMint(owner,nextTokenId); 

          return nextTokenId;
    }
}
