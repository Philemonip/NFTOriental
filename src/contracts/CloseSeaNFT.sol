// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract CloseSeaNFT is AccessControlEnumerable, ERC721URIStorage{
using Counters for Counters.Counter;
Counters.Counter private tokenId;

bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
string private _internalBaseURI = "http://localhost:8000/";

constructor() ERC721('BitEth NFT','BTE') {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
}

struct Item{
    string itemName;
    uint id;
    address owner;
    address creator;
    uint64 price;
    bool forSale;
    string tokenURI;
}

Item [] public items;
mapping (uint => address) private _tokenApprovals;
mapping (uint => address) itemToOwner;

modifier onlyOwnerOf (uint _tokenId) {
    require ((ownerOf(_tokenId) == msg.sender), "Caller is not owner of Token");
    _;
}

function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControlEnumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

function mint(string memory _itemName) external{
    uint currentId = tokenId.current();
    string memory idString = Strings.toString(currentId);
    string memory baseURI = _internalBaseURI;
    string memory metadata = "/metadata.json";
    string memory url = string(abi.encodePacked(baseURI, idString, metadata));

    Item memory _item = Item({
        itemName: _itemName,
        id: currentId,
        owner: msg.sender,
        creator: msg.sender,
        price: 0,
        forSale: false,
        tokenURI: url
    });
    items.push(_item);
    _safeMint(msg.sender, currentId);
    _setTokenURI(currentId, url);
    itemToOwner[currentId] = msg.sender;
    tokenId.increment();
}

function tokenOnSale (uint _tokenId, uint64 price) external onlyOwnerOf(_tokenId){
    Item storage _item = items[_tokenId];
    require(_item.forSale == false);
    _item.price = price;
    _item.forSale = true;
    // approve(address(this), _tokenId);
    // safeTransferFrom(ownerOf(_tokenId), address(this), _tokenId);
}

function notForSale (uint _tokenId) external onlyOwnerOf(_tokenId){
    Item storage _item = items[_tokenId];
    require(_item.forSale == true);
    _item.price = 0;
    _item.forSale = false;
}

function approvalTo (address _to, uint _tokenId) external onlyOwnerOf(_tokenId){
    require(_tokenApprovals[_tokenId] != _to);
    Item storage _item = items[_tokenId];
    require(_item.forSale == true);
    require(_item.price > 0);
    approve(_to,_tokenId);
    _tokenApprovals[_tokenId] = _to;
}

function cancelApproval (uint _tokenId) external onlyOwnerOf(_tokenId){
    _tokenApprovals[_tokenId] = address(0);
}

function buyingWithApproval (uint _tokenId) external payable {
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
    _tokenApprovals[_tokenId] = address(0);
}

function buyingWithoutApproval (uint _tokenId) external payable {
    require (ownerOf(_tokenId) != msg.sender);
    Item storage _item = items[_tokenId];
    require(_item.forSale == true);
    address _from = ownerOf(_tokenId);
    _transfer(_from, msg.sender, _tokenId);
    itemToOwner[_tokenId] = msg.sender;
    _item.owner = msg.sender;
    _item.price = 0;
    _item.forSale = false;
}

function burnToken (uint _tokenId) external onlyOwnerOf(_tokenId) {
    Item storage _item = items[_tokenId];
    require(_item.creator == msg.sender);
    _burn(_tokenId);
    delete items[_tokenId];
    delete itemToOwner[_tokenId];
}

function getAllItems () external view returns(Item[] memory){
    return items;
}

function getURI (uint _tokenId) external view returns (string memory){
    return tokenURI(_tokenId);
}

function getOwner (uint _tokenId) external view returns (address){
    return itemToOwner[_tokenId];
}

function isApproved (uint _tokenId) external view returns (address){
    return _tokenApprovals[_tokenId];
}

function getToken(uint _tokenId) external view returns (string memory name, uint id, address owner, address creator, uint64 price, bool forSale, string memory tokenURI){
    Item storage _item = items[_tokenId];
    name = _item.itemName;
    id = _item.id;
    owner = ownerOf(_tokenId);
    creator = _item.creator;
    price = _item.price;
    forSale = _item.forSale;
    tokenURI = _item.tokenURI;
}

function setTokenURI(uint256 _tokenId, string memory _tokenURI) public {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "ERC721: must have admin role to set Token URIs"
        );
        super._setTokenURI(_tokenId, _tokenURI);
        Item storage _item = items[_tokenId];
        _item.tokenURI = _tokenURI;
    }
}