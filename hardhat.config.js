require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.0",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Default Ganache URL
      accounts: ["<your_private_key>"], // Use one of the Ganache accounts
    },
  },
};