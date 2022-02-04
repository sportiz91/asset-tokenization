//Para deployar el contrato tengo que crear migraciones. En este caso la segunda migración.
//En este file vamos a gestionar como quiero deployar mi contrato.
//Las migraciones comienzan siempre importando los artifacts. Los artifacts son esos JSON files creados por truffle cuando se compila
//los Smart Contracts.
const myToken = artifacts.require("MyToken.sol");
const MyTokenSale = artifacts.require("MyTokenSale.sol");

//module.exports adentro tiene una función. Para nosotros es una async function dado que vamos a estar deployando un contrato.
//Deployer es un objeto que nos brinda truffle y es nuestra forma de interactuar con la Blockchain.
//Recordemos que siempre await es sobre alguna función.
module.exports = async (deployer) => {
  const addr = await web3.eth.getAccounts(); //This gets the array of addresses of the testing blockchain.

  await deployer.deploy(myToken, 1000000000); //el segundo parámetro de deployer.deploy sería la cantidad de tokens (constructor).
  await deployer.deploy(MyTokenSale, 1, addr[0], myToken.address); //The second parameter is the first constructor parameter, in this case 1 means "1 wei = 1 token".
  //This means, we are going to deploy MyTokenSale contract, rate = 1, address that will get the money from crowdsale will be deployer of the MyToken.sol contract
  //Token of the crowdsale is myToken.address contract.

  //Once I have deployed both contracts, I have to transfer all the tokens from deployer address to the MyTokenSale.sol, in order to use
  //The crowdsale functionality:

  const instance = await myToken.deployed(); //creating an instance to interact with the Smart Contract. This is truffle docs!
  await instance.transfer(MyTokenSale.address, 1000000000); //Interacting with your Smart Contracts with js it's not only possible in tests.
  //Transfering all funds from deploying address, to MyTokenSale.sol contract, in order to gain Crowdsale functionality.
};

//IMPORTANTE PRIMERA MIGRACIÓN:
//En el primera migración veremos que el migrate falla, puesto que el Solidity Compiler no es mayor o igual a 0.6.1 (el que viene con Truffle).
//Debemos agregarlo a nuestro truffle-config.js file.
//Docs: truffle docs -> reference -> configuration.
