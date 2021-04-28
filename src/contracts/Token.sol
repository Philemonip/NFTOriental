pragma solidity 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
	address public minter;

	event MinterChanged(address indexed from, address to);

	constructor() public payable ERC20("Cinco Chicos", "CCH") {
		minter = msg.sender;
	}

	function passMinterRole(address banco) public returns (bool) {
		require(
			msg.sender == minter,
			"Error, must be owner to call passMinterRole"
		);
		minter = banco;
		emit MinterChanged(msg.sender, banco);
		return true;
	}

	function mint(address account, uint256 amount) public {
		require(msg.sender == minter, "Error, must be owner to call mint");
		_mint(account, amount);
	}
}
