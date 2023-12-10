const { expect } = require("chai");
const hre = require("hardhat");

describe("Escrow", function () {
  let contract;
  let erc20;
  let happyPathAccount;
  let unhappyPathAccount;
  const amount = ethers.utils.parseUnits("10.0");

  before(async function () {
    const ERC20Contract = await ethers.getContractFactory("MockDaiToken");
    erc20 = await ERC20Contract.deploy();
    await erc20.deployed();

    const accounts = await hre.ethers.getSigners();
    const deployer = accounts[0];
    happyPathAccount = accounts[1];
    unhappyPathAccount = accounts[2];

    const transferTx = await erc20.transfer(
      happyPathAccount.address,
      "80000000000000000000"
    );
    await transferTx.wait();

    const EscrowContract = await ethers.getContractFactory("Escrow");
    contract = await EscrowContract.deploy(erc20.address);
    await contract.deployed();

    const erc20WithSigner = erc20.connect(happyPathAccount);
    const approveTx = await erc20WithSigner.approve(
      contract.address,
      "90000000000000000000"
    );
    await approveTx.wait();
  });

  it("Happy Path: depositEscrow", async function () {
    const contractWithSigner = contract.connect(happyPathAccount);
    const trxHash = await contract.getHash(amount);
    const depositEscrowTx = await contractWithSigner.depositEscrow(
      trxHash,
      amount
    );
    await depositEscrowTx.wait();
    expect(
      (await erc20.balanceOf(happyPathAccount.address)).toString()
    ).to.equal("70000000000000000000");
  });

  // ... rest of your test cases ...
  it("Unhappy Path: depositEscrow - Transaction hash cannot be empty!", async function () {
    const contractWithSigner = contract.connect(unhappyPathAccount);
    let err = "";
    try {
      await contractWithSigner.depositEscrow(ethers.constants.HashZero, amount);
    } catch (e) {
      err = e.message;
    }
    expect(err).to.equal(
      "VM Exception while processing transaction: reverted with reason string 'Transaction hash cannot be empty!'"
    );
  });
  it("Unhappy Path: depositEscrow - Escrow amount cannot be equal to 0.", async function () {
    const contractWithSigner = contract.connect(unhappyPathAccount);
    const trxHash = await contract.getHash(amount);
    let err = "";
    try {
      await contractWithSigner.depositEscrow(
        trxHash,
        ethers.utils.parseUnits("0")
      );
    } catch (e) {
      err = e.message;
    }
    expect(err).to.equal(
      "VM Exception while processing transaction: reverted with reason string 'Escrow amount cannot be equal to 0.'"
    );
  });
//   it("Unhappy Path: depositEscrow - Unique hash conflict, hash is already in use.", async function () {
//     const contractWithSigner = contract.connect(happyPathAccount);
//     const trxHash = await contract.getHash(amount);
//     const depositEscrowTx = await contractWithSigner.depositEscrow(
//       trxHash,
//       amount
//     );
//     await depositEscrowTx.wait();
//     expect(
//       (await erc20.balanceOf(happyPathAccount.address)).toString()
//     ).to.equal("60000000000000000000");
//     let err = "";
//     try {
//       await contractWithSigner.depositEscrow(trxHash, amount);
//     } catch (e) {
//       err = e.message;
//     }
//     expect(err).to.equal(
//       "VM Exception while processing transaction: reverted with reason string 'Unique hash conflict, the hash is already in use.'"
//     );
//   });
//   it("Unhappy Path: depositEscrow - ERC20: insufficient allowance", async function () {
//     const contractWithSigner = contract.connect(unhappyPathAccount);
//     const trxHash = await contract.getHash(amount);
//     let err = "";
//     try {
//       await contractWithSigner.depositEscrow(trxHash, amount);
//     } catch (e) {
//       err = e.message;
//     }
//     expect(err).to.equal(
//       "VM Exception while processing transaction: reverted with reason string 'ERC20: insufficient allowance'"
//     );
//   });
//   it("Happy Path: withdrawalEscrow", async function () {
//     const contractWithSigner = contract.connect(happyPathAccount);
//     const trxHash = await contract.getHash(amount);
//     const submitEscrowTx = await contractWithSigner.submitEscrow(
//       trxHash,
//       amount
//     );
//     await submitEscrowTx.wait();
//     expect(
//       (await erc20.balanceOf(happyPathAccount.address)).toString()
//     ).to.equal("50000000000000000000");
//     const withdrawalEscrowTx = await contractWithSigner.withdrawalEscrow(
//       trxHash
//     );
//     await withdrawalEscrowTx.wait();
//     expect(
//       (await erc20.balanceOf(happyPathAccount.address)).toString()
//     ).to.equal("60000000000000000000");
//   });
  it("Unhappy Path: withdrawalEscrow - Transaction hash cannot be empty!", async function () {
    const contractWithSigner = contract.connect(unhappyPathAccount);
    let err = "";
    try {
      await contractWithSigner.withdrawalEscrow(ethers.constants.HashZero);
    } catch (e) {
      err = e.message;
    }
    expect(err).to.equal(
      "VM Exception while processing transaction: reverted with reason string 'Transaction hash cannot be empty!'"
    );
  });

  it("Unhappy Path: withdrawalEscrow - Escrow with transaction hash doesn't exist.", async function () {
    const contractWithSigner = contract.connect(happyPathAccount);
    const trxHash = await contract.getHash(ethers.utils.parseUnits("1.0"));
    let err = "";
    try {
      await contractWithSigner.withdrawalEscrow(trxHash);
    } catch (e) {
      err = e.message;
    }
    expect(err).to.equal(
      "VM Exception while processing transaction: reverted with reason string 'Escrow with transaction hash doesn't exist.'"
    );
  });
});
