const { Wallet } = require('ethers');
const { ethers } = require('hardhat');

require('dotenv').config();

const privateKey = process.env.PRIVATE_KEY;
const endpoint = process.env.URL;
const CONTRACT_ADDRESS = "0xb8F62A696d49A3c81883e77Ce339EAC24A30B449";
console.log("endpoint : " + endpoint);

const contract = require('../artifacts/contracts/EthPool.sol/EthPool.json');
const infuraProvider = new ethers.providers.InfuraProvider("rinkeby");
const signer = new ethers.Wallet(privateKey, infuraProvider);
const ethPoolContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function getTotalValue() {
  const totalValue = await ethPoolContract.totalValue();
  console.log("Total Value = " + totalValue);
}

async function depositValue() {
  const depositValue = '0.01';
  const tx = {
    to: CONTRACT_ADDRESS,
    value: ethers.utils.parseUnits(depositValue)
  };

  // const gasFee = await infuraProvider.estimateGas({
  //   to: CONTRACT_ADDRESS,
  //   value: ethers.utils.parseEther(depositValue)
  // });
  // console.log(gasFee);

  const txObject = await signer.sendTransaction(tx);
}

getTotalValue()
  .then(() => {})
  .catch(err => {
    console.log("Error : (GetTotalValue)" + err);
    process.exit(1);
  });

depositValue()
  .then(() => {})
  .catch(err => {
    console.log("Error : (DepositValue)" + err);
    process.exit(1);
  })

