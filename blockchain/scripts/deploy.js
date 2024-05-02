const {ethers} = require("hardhat")
async function deploy(){
    let contract = await ethers.getContractFactory("TodoItem")
    let todo = await contract.deploy()
    console.log(`Todo contract is deployed at: ${await todo.getAddress()}`)
}

deploy().then(res=>{
    process.exit(0)
},err=>{
    console.log(err)
    process.exit(1)
})