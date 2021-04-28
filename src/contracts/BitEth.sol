// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BitEth is ERC721Enumerable{
// using Counters for Counters.Counter;
// Counters.Counter private _tokenIdTracker;
using SafeMath for uint256;
using Counters for Counters.Counter;
Counters.Counter private tokenId;

constructor() ERC721('BitEth NFT','BTE') {
}

struct Item{
    string itemName;
    uint id;
    address owner;
}

Item [] public items;
mapping(string => bool) private _itemExists;
mapping (uint => address) itemToOwner;

function MintandBuy(string memory _itemName) public{
require (_itemExists[_itemName] == false);
uint _id = tokenId.current();
items.push(Item(_itemName, _id,msg.sender));
itemToOwner[_id] = msg.sender;
_safeMint(msg.sender, _id);
_itemExists[_itemName] == true;
tokenId.increment();
}

function transfer (address _to, uint _tokenId) public payable {
require (ownerOf(_tokenId) == msg.sender, "Only owner can execute transfer function");
address _from = ownerOf(_tokenId);
safeTransferFrom(_from, _to, _tokenId);
itemToOwner[_tokenId] = _to;
setnewOwner(_tokenId, _to);
}

function setnewOwner(uint _tokenId, address _newOwner) private{
    for (uint i=0; i<items.length; i++){
        if(items[i].id == _tokenId){
            items[i].owner = _newOwner;
        }
    }
}

function getItem ()public view returns(Item[] memory){
    return items;
}

function getowner (uint _tokenId) public view returns (address){
    return itemToOwner[_tokenId];
}

function getownertwo (uint _tokenId) public view returns (address){
    address owner;
    for (uint i=0; i<items.length;i++){
        if(items[i].id == _tokenId){
            owner = items[i].owner;
        } 
    } return owner;
}

}