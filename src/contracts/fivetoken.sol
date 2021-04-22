pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FiveToken is ERC721Enumerable{
    constructor() ERC721("FiveToken", "FTK") {}

uint id = 0;
mapping(uint => string) colors;
mapping(string => bool) _colorExists;
uint256[] private _allTokens;

// function totalSupply() public view returns (uint256) {
//     return _allTokens.length;
// }

function mint(string memory _color) external{
require(_colorExists[_color] = false);
colors[id] = _color;

_safeMint(msg.sender, id);
_colorExists[_color] = true;
id++;

}

function getToken(uint _id)public view returns(string memory){


}


}

