import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import {abi,bytecode} from "../blockchain/artifacts/contracts/Todo.sol/TodoItem.json"
function App() {
  const [provider,setProvider] = useState(null)
  const [address,setAddress] = useState("")
  const [title,setTitle] = useState("")
  const [description,setDesc] = useState("")
  const [allTasks,setAllTasks] = useState([])
  const [isloading,setLoading] = useState(false)
  useEffect(()=>{
    async function init(){
      if(window.ethereum){
       await window.ethereum.request({
        method:"eth_requestAccounts",
        params:[]
       })
       const provider = await  new ethers.BrowserProvider(window.ethereum)
       setProvider(provider)
       let add = await (await provider.getSigner()).getAddress()
       setAddress(add)
       await getTasks()
      }
    }
    init()
  },[])

  async function getContract(){
    if(provider){
      const signer = await provider.getSigner();
      let contract = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3",abi,signer)
      return contract
    }
  }
  async function addTask(){
    setLoading(true)
    let todocontract = await getContract()
    if(todocontract){
      await todocontract.addtasks(title,description)
      await getTasks()
    }
    setLoading(false)
  }
  async function getTasks(){
    let todocontract = await getContract()
    if(todocontract){
      let all_tasks = await todocontract.getTasks();
      setAllTasks(all_tasks)
    }
     
  }
  async function deleteTask(id){
    setLoading(true)
    let todocontract = await getContract()
    if(todocontract){
      await todocontract.deleteTask(id)
      await getTasks()
    }
    setLoading(false)
  }
  return (
    <div className='d-flex flex-column align-items-center' style={{height:"100vh",width:"100vw"}}>
      <nav className="navbar navbar-dark bg-dark w-100">
        <div className="container-fluid w-100">
          <span className="navbar-text">
            {address}
          </span>
          <div className='d-flex'>
            <button disabled = {isloading} class="btn btn-outline-success" type="button" onClick={async ()=>{
              setLoading(true)
              await getTasks()
              setLoading(false)
            }}>Refresh</button>
          </div>
        </div>
      </nav>
      <div className='w-100 d-flex align-items-center justify-content-center flex-column mt-5'>
        <span><h3>Welecome, Let's make your day better</h3></span>
        <div class="row ">
          <div class="col">
            <input type="text" class="form-control" placeholder="title" onChange={(ev)=>{setTitle(ev.target.value)}} />
          </div>
          <div class="col" style={{width:"500px"}}>
            <input type="text" class="form-control" placeholder="Description" onChange={(ev)=>{setDesc(ev.target.value)}} />
          </div>
          <div className='col'>
            <button class="btn btn-primary" type="button" disabled = {isloading} onClick={addTask}>Add Task</button>
          </div>
        </div>
      </div>
      <div className='w-75 h-100 mt-5'>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allTasks.map((val,idx)=>
          <tr>
            <th scope="row">{idx+1}</th>
            <td>{val[1]}</td>
            <td>{val[2]}</td>
            <td><button type="button" class="btn btn-outline-danger" disabled = {isloading} onClick={()=>{deleteTask(val[0])}}>Delete</button></td>
          </tr>
          )
          
          }
          
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default App
