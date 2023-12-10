require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.20",
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL,
      chainId: 80001,
      accounts: [process.env.RINKEBY_DEPLOYER_PRIVATE_KEY],
    },
  },
};
