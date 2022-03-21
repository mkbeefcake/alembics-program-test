pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";


struct DepositStatus {
  uint256 value;
  bool    hasValue;
}

contract EthPool {

  uint public totalValue;

  address[] public users;
  mapping(address => DepositStatus) public status;

  fallback() external payable {    

    if (!status[msg.sender].hasValue)
      users.push(msg.sender);

    status[msg.sender].value += msg.value;
    status[msg.sender].hasValue = true;

    totalValue += msg.value;
  }

  function depositeRewards() public payable {
    require(totalValue > 0, "No rewards if the pool is empty");

    for (uint i=0; i<users.length; i++) {
      address user = users[i];
      uint rewards = ((status[user].value * msg.value) / totalValue);

      status[user].value += rewards;
    }
  }

  function withdraw() public payable {
    uint deposit = status[msg.sender].value;
    require(deposit > 0, "No withdrawal value");

    status[msg.sender].value = 0;
    (bool success, ) = msg.sender.call{value:deposit}("");

    require(success, "Transfer failed");
  }

}