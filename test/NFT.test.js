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
      const result = await contractInstance.Mint(coinNames[0], { from: alice });
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
      const result = await contractInstance.Mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await utils.shouldThrow(
        contractInstance.buyingFrom(tokenId, { from: alice })
      );
    });

    it("should not be able to approve buyer without token being on sale", async () => {
      const result = await contractInstance.Mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await utils.shouldThrow(
        contractInstance.approvalTo(bob, tokenId, { from: alice })
      );
    });
    it("transfer success with approval by owner", async () => {
      const result = await contractInstance.Mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await contractInstance.tokenOnSale(tokenId, 33, {
        from: alice,
      });
      const tokenInfo = await contractInstance.getToken(tokenId);
      expect(tokenInfo.forSale).to.equal(true);
      expect(tokenInfo.price.words[0]).to.equal(33);
      await contractInstance.approvalTo(bob, tokenId, { from: alice });
      await contractInstance.buyingFrom(tokenId, { from: bob });
      const newOwner = await contractInstance.getOwner(tokenId);
      expect(newOwner).to.equal(bob);
    });
    it("After owner cancelled approval to buyer, buyer cannot buy Token", async () => {
      const result = await contractInstance.Mint(coinNames[0], { from: alice });
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
        contractInstance.buyingFrom(tokenId, { from: bob })
      );
      expect(tokenInfo.owner).to.equal(alice);
    });
  });
  describe("testing burn Token", () => {
    it("burn Token", async () => {
      const result = await contractInstance.Mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await contractInstance.burnToken(tokenId, { from: alice });
      const newOwner = await contractInstance.getOwner(tokenId);
      expect(newOwner).to.equal("0x0000000000000000000000000000000000000000");
    });
    it("cannot burn Token if you are not Owner", async () => {
      const result = await contractInstance.Mint(coinNames[0], { from: alice });
      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      await utils.shouldThrow(
        contractInstance.burnToken(tokenId, { from: bob })
      );
    });
  });
  describe("contract functions should not work if token has not been minted", () => {
    it("Cannot send approval to others", async () => {
      await utils.shouldThrow(
        contractInstance.approvalTo(bob, 0, { from: alice })
      );
    });
    it("Cannot buy Coin from others", async () => {
      await utils.shouldThrow(
        contractInstance.buyingFrom(alice, 0, { from: bob })
      );
    });
    it("Cannot set Token on sale", async () => {
      await utils.shouldThrow(contractInstance.tokenOnSale(1, { from: alice }));
    });
    it("Cannot burn Token", async () => {
      await utils.shouldThrow(contractInstance.burnToken(2, { from: alice }));
    });
  });
});
