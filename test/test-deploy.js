describe("simplastorage",(()=>{
  beforeEach(async  )
  it("deploy",async()=>{
    const SimpleStorage = await ethers.getContractFactory("SimpleStorage")
    const simpleStorage = await SimpleStorage.deploy()
    await simpleStorage.deployed()
    console.log(simpleStorage.address)
  })
}))