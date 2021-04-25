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
    address creator;
    uint price;
    bool forSale;
}

Item [] public items;
mapping(string => bool) private _itemExists;
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
    // items.push(Item(_itemName,currentId,msg.sender,msg.sender,0,false));
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

// function MintandBuy(string memory _itemName) public{
// require (_itemExists[_itemName] == false);
// uint _id = tokenId.current();
// items.push(Item(_itemName, _id,msg.sender));
// itemToOwner[_id] = msg.sender;
// _safeMint(msg.sender, _id);
// _itemExists[_itemName] == true;
// tokenId.increment();
// }

function transfer (address _to, uint _tokenId) public payable {
require (ownerOf(_tokenId) == msg.sender, "Only owner can execute transfer function");
Item storage _item = items[_tokenId];
require(_item.forSale == true);
address _from = ownerOf(_tokenId);
safeTransferFrom(_from, _to, _tokenId);
itemToOwner[_tokenId] = _to;
// setnewOwner(_tokenId, _to);
_item.owner = _to;
_item.price = 0;
_item.forSale = false;
}

// function setnewOwner(uint _tokenId, address _newOwner) private{
//     for (uint i=0; i<items.length; i++){
//         if(items[i].id == _tokenId){
//             items[i].owner = _newOwner;
//         }
//     }
// }

function getItem () public view returns(Item[] memory){
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