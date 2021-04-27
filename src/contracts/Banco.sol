pragma solidity 0.8.0;

import "./Token.sol";

contract banco {
	Token private token;
	mapping(address => uint256) public depositStart;
	mapping(address => uint256) public etherBalanceOf;
	mapping(address => bool) public isDeposited;

	event Deposit(address indexed user, uint256 etherAmount, uint256 timeSeart);
	event Withdraw(
		address indexed user,
		uint256 etherAmount,
		uint256 depositTime,
		uint256 interest
	);

	constructor(Token _token) public {
		token = _token;
	}

	function deposit() public payable {
		require(isDeposited[msg.sender] == false, "Error, account deposited");
		require(msg.value >= 1e16, "Error, amount must be >= 0.01 ETH");
		etherBalanceOf[msg.sender] += msg.value;
		depositStart[msg.sender] += block.timestamp;
		isDeposited[msg.sender] = true;
		emit Deposit(msg.sender, msg.value, block.timestamp);
	}

	function withdraw() public {
		require(isDeposited[msg.sender] == true, "Error, account not deposited");
		uint256 userBalance = etherBalanceOf[msg.sender];
		uint256 depositTime = block.timestamp - depositStart[msg.sender];

		//calculation below
		// uint256 interestPerSecond = (etherBalanceOf[msg.sender] / 1e16);
		uint256 interestPerSecond = 1e16;
		uint256 interest = interestPerSecond * depositTime;

		payable(msg.sender).transfer(etherBalanceOf[msg.sender]);
		token.mint(msg.sender, interest);
		depositStart[msg.sender] = 0;
		etherBalanceOf[msg.sender] = 0;
		isDeposited[msg.sender] = false;
		emit Withdraw(msg.sender, userBalance, depositTime, interest);
	}
}
