// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FiveToken is ERC721Enumerable{
    constructor() ERC721("FiveToken", "FTK") public {}

string [] public colors;
mapping(string => bool) _colorExists;

function mint(string memory _color) public{
require(_colorExists[_color] == false);
colors.push(_color);
uint _id = colors.length;

_safeMint(msg.sender, _id);
_colorExists[_color] = true;

}

function getArray() public view returns(string [] memory){
    return colors;
}
// function getToken(uint _id)public view returns(string memory){


// }


}

