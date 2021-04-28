// const Color = artifacts.require('./fivetoken.sol')

const { assert } = require("chai");

// require('chai')
//     .use(require('chai-as-promised'))
//     .should()

// contract('Color', (accounts) => {
//     let contract

//     before(async () => {
//         contract = await Color.deployed()
//     })

//     describe('deployment', async () => {
//         it('deploys successfully', async () => {
//             const address = contract.address
//             assert.notEqual(address, 0x0)
//             assert.notEqual(address, '')
//             assert.notEqual(address, null)
//             assert.notEqual(address, undefined)
//         })

//         it('has a name', async () => {
//             const name = await contract.name()
//             assert.equal(name, 'FiveToken')
//         })

//         it('has a symbol', async () => {
//             const symbol = await contract.symbol()
//             assert.equal(symbol, 'FTK')
//         })

//     })

//     describe('minting', async () => {

//         it('creates a new token', async () => {
//             const result = await contract.mint('#EC058E')
//             console.log('able to mint', result)
//             const totalSupply = await contract.totalSupply()
//             console.log('total supply', totalSupply)
//             // SUCCESS
//             assert.equal(totalSupply, 1)
//             const event = result.logs[0].args
//             assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
//             assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
//             assert.equal(event.to, accounts[0], 'to is correct')

//             // FAILURE: cannot mint same color twice
//             await contract.mint('#EC058E').should.be.rejected;
//         })
//     })

//     describe('indexing', async () => {
//         it('lists colors', async () => {
//             // Mint 3 more tokens
//             await contract.mint('#5386E4')
//             await contract.mint('#FFFFFF')
//             await contract.mint('#000000')
//             const totalSupply = await contract.totalSupply()
//             let hello1 = await contract.getArray()
//             await console.log("hello", hello1)

//             let color
//             let result = []

//             for (var i = 1; i <= totalSupply; i++) {
//                 color = contract.colors(i - 1)
//                 result.push(color)
//             }

//             let expected = ['#EC058E', '#5386E4', '#FFFFFF', '#000000']
//             assert.equal(result.join(','), expected.join(','))
//         })
//     })

// })

const Token = artifacts.require("./Token");
const Banco = artifacts.require("./Banco");
const revert = "VM Exception while processing transaction: revert";
const wait = (s) => {
  const milliseconds = s * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

require("chai").use(require("chai-as-promised")).should();

// contract("Banco", ([deployer, user]) => {
//   let banco, token;
//   const interestPerSecond = 1e16;
//   beforeEach(async () => {
//     token = await Token.new();
//     banco = await Banco.new(token.address);
//     await token.passMinterRole(banco.address, { from: deployer });
//   });

//   describe("testing token contract", () => {
//     describe("successfully deployed", () => {
//       it("token name", async () => {
//         expect(await token.name()).to.be.eq("Cinco Chicos");
//       });

//       it("token symbol", async () => {
//         expect(await token.symbol()).to.be.eq("CCH");
//       });

//       it("token initial total supply", async () => {
//         expect(Number(await token.totalSupply())).to.eq(0);
//       });

//       it("Banco should have Token minter role", async () => {
//         expect(await token.minter()).to.eq(banco.address);
//       });
//     });

//     describe("fail to depoly", () => {
//       it("only owner can pass minter role, passing minter role should be rejected", async () => {
//         await token
//           .passMinterRole(user, { from: deployer })
//           .should.be.rejectedWith(revert);
//       });

//       it("only minter can mint token, tokens minting should be rejected", async () => {
//         await token
//           .mint(user, "1", { from: deployer })
//           .should.be.rejectedWith(revert);
//       });
//     });
//   });

//   describe("testing deposit", () => {
//     describe("successfully deposited", () => {
//       beforeEach(async () => {
//         await banco.deposit({ value: 10 ** 16, from: user });
//       });

//       it("balance should increase", async () => {
//         expect(Number(await banco.etherBalanceOf(user))).to.eq(10 ** 16);
//       });

//       it("deposit time should > 0", async () => {
//         expect(Number(await banco.depositStart(user))).to.be.above(0);
//       });

//       it("deposit status should eq true", async () => {
//         expect(await banco.isDeposited(user)).to.eq(true);
//       });
//     });

//     describe("fail to deposit", () => {
//       it("amount too small, depositing should be rejected", async () => {
//         await banco
//           .deposit({ value: 10 ** 15, from: user })
//           .should.be.rejectedWith(revert);
//       });
//     });
//   });

//   describe("testing withdraw", () => {
//     let balance;

//     describe("successfully withdraw", () => {
//       beforeEach(async () => {
//         await banco.deposit({ value: 10 ** 16, from: user });

//         await wait(2);

//         balance = await web3.eth.getBalance(user);
//         await banco.withdraw({ from: user });
//       });

//       it("balances should decrease", async () => {
//         expect(Number(await web3.eth.getBalance(banco.address))).to.eq(0);
//         expect(Number(await banco.etherBalanceOf(user))).to.eq(0);
//       });

//       it("user should receive ether back", async () => {
//         expect(Number(await web3.eth.getBalance(user))).to.be.above(
//           Number(balance)
//         );
//       });

//       it("user should receive proper amount of interest", async () => {
//         balance = Number(await token.balanceOf(user));
//         expect(balance).to.be.above(0);
//         expect(balance % interestPerSecond).to.eq(0);
//         expect(balance).to.be.below(interestPerSecond * 4);
//       });

//       it("depositer data should be reseted", async () => {
//         expect(Number(await banco.depositStart(user))).to.eq(0);
//         expect(Number(await banco.etherBalanceOf(user))).to.eq(0);
//         expect(await banco.isDeposited(user)).to.eq(false);
//       });
//     });

//     describe("fail to withdraw", () => {
//       it("withdrawing should be rejected from wrong user", async () => {
//         await banco.deposit({ value: 10 ** 16, from: user });
//         await wait(2);
//         await banco.withdraw({ from: deployer }).should.be.rejectedWith(revert);
//       });
//     });
//   });
// });

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
      console.log(tokenInfo);
      expect(tokenInfo.forSale).to.equal(true);
      expect(tokenInfo.price.words[0]).to.equal(33);
      await contractInstance.approvalTo(bob, tokenId, { from: alice });
      await contractInstance.buyingFrom(tokenId, { from: bob });
      const newOwner = await contractInstance.getOwner(tokenId);
      expect(newOwner).to.equal(bob);
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
  // let banco, token;
  // const interestPerSecond = 1e16;
  // beforeEach(async () => {
  // 	token = await Token.new();
  // 	banco = await Banco.new(token.address);
  // 	await token.passMinterRole(banco.address, { from: deployer });
  // });
});
