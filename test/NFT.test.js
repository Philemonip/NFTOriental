const { assert } = require("chai");
const CloseSeaNFT = artifacts.require("./CloseSeaNFT");
const utils = require("./utils");
const coinNames = ["Dagger", "Dogger"];

contract("CloseSeaNFT", (accounts) => {
  let [alice, bob] = accounts;
  let contractInstance;
  beforeEach("should set up the contract instance", async () => {
    contractInstance = await CloseSeaNFT.new();
  });
  describe("testing minting", () => {
    it("should be able to Mint NFT", async () => {
      const result = await contractInstance.mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      expect(result.receipt.status).to.equal(true);
      expect(tokenId).to.equal(0);
      expect(event.to).to.equal(alice);
      const tokenInfo = await contractInstance.getToken(tokenId);
      expect(tokenInfo.name).to.equal(coinNames[0]);
      expect(tokenInfo.creator).to.equal(alice);
      expect(tokenInfo.owner).to.equal(alice);
    });
  });
  describe("testing transfer", () => {
    it("should not be able to transfer without token being on sale or being approved by owner", async () => {
      const result = await contractInstance.mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await utils.shouldThrow(
        contractInstance.buyingWithApproval(tokenId, { from: alice })
      );
    });

    it("should not be able to approve buyer without token being on sale", async () => {
      const result = await contractInstance.mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await utils.shouldThrow(
        contractInstance.approvalTo(bob, tokenId, { from: alice })
      );
    });
    it("buying without approval then cross-transfer again", async () => {
      const result = await contractInstance.mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await contractInstance.tokenOnSale(tokenId, 33, {
        from: alice,
      });
      const result2 = await contractInstance.buyingWithoutApproval(0, {
        from: bob,
      });
      console.log(result2);
      const newOwner = await contractInstance.getOwner(tokenId);
      expect(newOwner).to.equal(bob);
      const tokenInfo = await contractInstance.getToken(tokenId);
      console.log(tokenInfo);
      expect(tokenInfo.owner).to.equal(bob);
      await contractInstance.tokenOnSale(tokenId, 33, {
        from: bob,
      });
      const result3 = await contractInstance.buyingWithoutApproval(0, {
        from: alice,
      });
      console.log(result3);
      const renewedOwner = await contractInstance.getOwner(tokenId);
      expect(renewedOwner).to.equal(alice);
      const renewedtokenInfo = await contractInstance.getToken(tokenId);
      console.log(renewedtokenInfo);
      expect(renewedtokenInfo.owner).to.equal(alice);
    });
    xit("transfer success with approval by owner", async () => {
      const result = await contractInstance.mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await contractInstance.tokenOnSale(tokenId, 33, {
        from: alice,
      });
      const tokenInfo = await contractInstance.getToken(tokenId);
      expect(tokenInfo.forSale).to.equal(true);
      expect(tokenInfo.price.words[0]).to.equal(33);
      await contractInstance.approvalTo(bob, tokenId, { from: alice });
      await contractInstance.buyingWithApproval(tokenId, { from: bob });
      const newOwner = await contractInstance.getOwner(tokenId);
      expect(newOwner).to.equal(bob);
    });
    xit("After owner cancelled approval to buyer, buyer cannot buy Token", async () => {
      const result = await contractInstance.mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await contractInstance.tokenOnSale(tokenId, 33, {
        from: alice,
      });
      const tokenInfo = await contractInstance.getToken(tokenId);
      expect(tokenInfo.forSale).to.equal(true);
      expect(tokenInfo.price.words[0]).to.equal(33);
      await contractInstance.approvalTo(bob, tokenId, { from: alice });
      await contractInstance.cancelApproval(tokenId, { from: alice });
      await utils.shouldThrow(
        contractInstance.buyingWithApproval(tokenId, { from: bob })
      );
      expect(tokenInfo.owner).to.equal(alice);
    });
  });
  describe("testing burn Token", () => {
    xit("burn Token", async () => {
      const result = await contractInstance.mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await contractInstance.burnToken(tokenId, { from: alice });
      const newOwner = await contractInstance.getOwner(tokenId);
      expect(newOwner).to.equal("0x0000000000000000000000000000000000000000");
    });
    xit("cannot burn Token if you are not Owner", async () => {
      const result = await contractInstance.mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await utils.shouldThrow(
        contractInstance.burnToken(tokenId, { from: bob })
      );
    });
  });
  describe("contract functions should not work if token has not been minted", () => {
    xit("Cannot send approval to others", async () => {
      await utils.shouldThrow(
        contractInstance.approvalTo(bob, 0, { from: alice })
      );
    });
    xit("Cannot buy Coin from others", async () => {
      await utils.shouldThrow(
        contractInstance.buyingWithApproval(alice, 0, { from: bob })
      );
    });
    xit("Cannot set Token on sale", async () => {
      await utils.shouldThrow(contractInstance.tokenOnSale(1, { from: alice }));
    });
    xit("Cannot burn Token", async () => {
      await utils.shouldThrow(contractInstance.burnToken(2, { from: alice }));
    });
  });
});
