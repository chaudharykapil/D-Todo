require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config()
module.exports = {
  solidity: "0.8.24",
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
