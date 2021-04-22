pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract FiveToken is ERC721 {
    constructor() ERC721("FiveToken", "FTK") {}

uint id = 0;
mapping(uint => string) colors;
mapping(string => bool) _colorExists;

function mint(string memory _color) external{
require(_colorExists[_color] = false);
colors[id] = _color;
_safeMint(msg.sender, id);
_colorExists[_color] = true;
id++;

}
}

