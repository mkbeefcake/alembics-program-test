const { ethers } = require("hardhat")

const main = async () => {

  const initialSupply = ethers.utils.parseEther("100000");

  const [ deployer ] = await ethers.getSigners();
  console.log(`Address deploying the contract === ${deployer.address}`);

  const factory = await ethers.getContractFactory("EthPool");
  const contract = await factory.deploy();

  console.log(`EthPool contract address === ${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


/// Token Contract Address : 0xb8F62A696d49A3c81883e77Ce339EAC24A30B449