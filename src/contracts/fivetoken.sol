// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract FiveToken is ERC721Enumerable{
    constructor() ERC721("FiveToken", "FTK") public {}

struct Colors{
    string color;
    uint id;
}
Colors [] public colors;

mapping(string => bool) _colorExists;

function mint(string memory _color) public{
require(_colorExists[_color] == false);

uint _id = colors.length;
colors.push(Colors(_color, _id));
_safeMint(msg.sender, _id);
_colorExists[_color] = true;
}

function getArray() public view returns(Colors[] memory){
    return colors;
}




}

