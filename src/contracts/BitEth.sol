// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract BitEth is ERC721Enumerable{

constructor() ERC721('BitEth NFT','BTE') {}

struct Item{
    string itemName;
    uint id;
}

Item [] public items;
mapping(string => bool) _itemExists;
mapping (uint => address) public itemToOwner;

function MintandBuy(string memory _itemName) public{
require (_itemExists[_itemName] == false);
uint _id = items.length;
items.push(Item(_itemName, _id));
itemToOwner[_id] = msg.sender;
_safeMint(msg.sender, _id);
_itemExists[_itemName] == true;
}

function transfer (address _to, uint _id) public {
// require (ownerOf(_id) == msg.sender);
// address owner = ownerOf(_id);
// address buyer = _to;
// approve(buyer, _id);
// itemApprovals[_id] = buyer;
address _from = ownerOf(_id);
safeTransferFrom(_from, _to, _id);
itemToOwner[_id] = _to;
}

function getItem ()public view returns(Item[] memory){
    return items;
}




}