const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage")
    console.log("Deploying contract...")
    const simpleStorage = await SimpleStorage.deploy() // Deploy the contract
    console.log("Waiting for contract to deployed...")
    // await simpleStorage.deployed() // Wait for deployment confirmation
    console.log("Contract address")
    const contractAddress = await simpleStorage.getAddress()
    console.log(simpleStorage.target, contractAddress)

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value is: ${currentValue}`)
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
    if (network.config.chainId == 11155111 && process.env.ETHERSCAN_API_KEY) {
        await transactionResponse.wait(6)
        await verify(contractAddress, [])
    }
}

async function verify(contractAdress, args) {
    console.log("Verifying contract...")
    try {
        await run("verify:verify", {
            address: contractAdress,
            constructorArguments: args
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
