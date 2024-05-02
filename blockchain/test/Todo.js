const {assert,expect} = require("chai")
const {ethers} = require("hardhat")
describe("wallet",()=>{
    it("Should Connected Succesfully",async ()=>{
        let accounts = await ethers.getSigners()
        assert(accounts,"Wallet error")
    })
})
describe("ToDo",()=>{
    let todolist
    it("Should Deployed Properly",async ()=>{
        var contract = await ethers.getContractFactory("TodoItem")
        todolist = await contract.deploy()
        assert(await todolist.getAddress(),"DeployementError")
    })
    it("Add Todo Properly",async ()=>{
        await todolist.addtasks("title 1","Description one")
        var alltasks = await todolist.getTasks()
        assert(alltasks.length == 1,"Not added properly")
    })
    it("Should get all tasks properly",async ()=>{
        var alltasks = await todolist.getTasks()
        assert(alltasks,"Not retrive task properly")
    })
    it("Should detete a task properly",async ()=>{
        await todolist.deleteTask(0)
        var alltasks = await todolist.getTasks()
        assert(alltasks.length == 0,"Not deleted properly")
    })
})