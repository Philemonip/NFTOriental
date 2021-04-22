const FiveToken = artifacts.require("FiveToken");

module.exports = function (deployer) {
    deployer.deploy(FiveToken);
};
