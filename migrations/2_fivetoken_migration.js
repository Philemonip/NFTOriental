const FiveToken = artifacts.require("FiveToken");
const Token = artifacts.require("./Token");
const Banco = artifacts.require("./Banco");
module.exports = async function (deployer) {
	await deployer.deploy(FiveToken);
	await deployer.deploy(Token);
	const token = await Token.deployed();
	await deployer.deploy(Banco, token.address);
	const banco = await Banco.deployed();
	await token.passMinterRole(banco.address);
};
