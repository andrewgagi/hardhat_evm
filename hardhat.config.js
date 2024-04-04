require("@nomicfoundation/hardhat-toolbox")
require("@nomicfoundation/hardhat-verify")

/** @type import('hardhat/config').HardhatUserConfig */

const dotenv = require("dotenv")
dotenv.config()

const SEPOLIA_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API = process.env.ETHERSCAN_API_KEY
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_URL,
            accounts: [PRIVATE_KEY],
            chainId: 11155111
        }
    },
    solidity: "0.8.24",
    etherscan: {
        apiKey: ETHERSCAN_API
    }
}
