// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;
contract TodoItem {
    struct Item{
      uint id;
      string title;
      string description;
      address owner;
    }
    Item [] private items;
    uint private curridx;
    constructor() {
        curridx = 0;
    }
    function addtasks(string memory title,string memory description) external{
        address ow = msg.sender;
        Item memory temp = Item(curridx,title,description,ow);
        items.push(temp);
        curridx++;
    }
    function getTasks()  external view returns (Item [] memory) {
        Item [] memory t = new Item [](items.length);
        uint c = 0;
        for(uint i = 0; i < items.length ; i++){
            if(items[i].owner == msg.sender){
                t[c++] = items[i];
            }
        }
        return t;
    }
    function deleteTask(uint index) external  {
      for (uint i = index; i < items.length - 1; i++) {
        items[i] = items[i + 1]; // Shift elements to the left
      }
      items.pop();
    }
      
}
