const { ethers } = require('hardhat');

require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
const endpoint = process.env.URL;
const CONTRACT_ADDRESS = "0xb8F62A696d49A3c81883e77Ce339EAC24A30B449";
console.log("endpoint : " + endpoint);

async function getTotalValue() {
  const contract = require('../artifacts/contracts/EthPool.sol/EthPool.json');
  const infuraProvider = new ethers.providers.InfuraProvider("rinkeby");
  const signer = new ethers.Wallet(privateKey, infuraProvider);
  const ethPoolContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
  const totalValue = await ethPoolContract.totalValue();
  console.log("Total Value = " + totalValue);
}

async function depositValue() {
  
}

getTotalValue()
  .then(() => process.exit(0))
  .catch(err => {
    console.log("Error : " + err);
    process.exit(1);
  });



