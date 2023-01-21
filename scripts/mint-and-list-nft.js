const { ethers } = require("hardhat")

const mintAndList = async () => {
    const PRICE = ethers.utils.parseEther("0.1")
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const basicNft = await ethers.getContract("BasicNft")

    const mintTX = await basicNft.mintNft()
    const minTxReceipt = await mintTX.wait(1)
    const tokenId = await minTxReceipt.events[0].args.tokenId
    const approvalTx = await basicNft.approve(nftMarketplace.address, tokenId)
    await approvalTx.wait(1)

    console.log("Listing NFT...")
    const tx = await nftMarketplace.listItem(basicNft.address, tokenId, PRICE)
    await tx.wait(1)
    console.log("Listed!")
}

mintAndList()
    .then(() => process.exit(1))
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
