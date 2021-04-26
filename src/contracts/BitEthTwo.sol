// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BitEth is ERC721Enumerable{
using SafeMath for uint256;
using Counters for Counters.Counter;
Counters.Counter private tokenId;

constructor() ERC721('BitEth NFT','BTE') {
}

struct Item{
    string itemName;
    uint id;
    address owner;
    address creator;
    uint price;
    bool forSale;
}

Item [] public items;
mapping (uint => address) private _tokenApprovals;
mapping (uint => address) itemToOwner;

function Mint(string memory _itemName) external{
    uint currentId = tokenId.current();
    Item memory _item = Item({
        itemName: _itemName,
        id: currentId,
        owner: msg.sender,
        creator: msg.sender,
        price: 0,
        forSale: false
    });
    items.push(_item);
    _safeMint(msg.sender, currentId);
    itemToOwner[currentId] = msg.sender;
    tokenId.increment();
}

function tokenOnSale (uint _tokenId, uint price) external{
    require(ownerOf(_tokenId) == msg.sender);
    Item storage _item = items[_tokenId];
    _item.price = price;
    _item.forSale = true;
}

function notForSale (uint _tokenId) external {
    require(ownerOf(_tokenId) == msg.sender);
    Item storage _item = items[_tokenId];
    _item.price = 0;
    _item.forSale = false;
}

function approvalTo (address _to, uint _tokenId) external {
    require (ownerOf(_tokenId) == msg.sender);
    Item storage _item = items[_tokenId];
    require(_item.forSale == true);
    require(_item.price > 0);
    approve(_to,_tokenId);
    _tokenApprovals[_tokenId] = _to;
}

function clearApproval (uint _tokenId) private{
    _tokenApprovals[_tokenId] = address(0);
}

function buyingFrom (uint _tokenId) public payable {
    require (ownerOf(_tokenId) != msg.sender, "Owner cannot execute buy function");
    require (_tokenApprovals[_tokenId] == msg.sender);
    Item storage _item = items[_tokenId];
    require(_item.forSale == true);
    address _from = ownerOf(_tokenId);
    safeTransferFrom(_from, msg.sender, _tokenId);
    itemToOwner[_tokenId] = msg.sender;
    _item.owner = msg.sender;
    _item.price = 0;
    _item.forSale = false;
    clearApproval(_tokenId);
}

function burnToken (uint _tokenId) external {
    Item storage _item = items[_tokenId];
    require(ownerOf(_tokenId) == msg.sender);
    require(_item.creator == msg.sender);
    _burn(_tokenId);
    delete items[_tokenId];
    delete itemToOwner[_tokenId];
}

function getAllItems () public view returns(Item[] memory){
    return items;
}

function getOwner (uint _tokenId) public view returns (address){
    return itemToOwner[_tokenId];
}

function getOwnertwo (uint _tokenId) public view returns (address){
   address owner;
   for (uint i=0; i<items.length;i++){
       if(items[i].id == _tokenId){
           owner = items[i].owner;
       } 
   } return owner;
}

function isApproved (uint _tokenId) external view returns (address){
    return _tokenApprovals[_tokenId];
}

function getToken(uint _tokenId) external view returns (string memory name, uint id, address owner, address creator, uint price, bool forSale){
    Item storage _item = items[_tokenId];
    name = _item.itemName;
    id = _item.id;
    owner = ownerOf(_tokenId);
    creator = _item.creator;
    price = _item.price;
    forSale = _item.forSale;
}


}