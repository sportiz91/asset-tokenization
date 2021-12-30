//Para deployar el contrato tengo que crear migraciones. En este caso la segunda migración.
//En este file vamos a gestionar como quiero deployar mi contrato.
//Las migraciones comienzan siempre importando los artifacts. Los artifacts son esos JSON files creados por truffle cuando se compila
//los Smart Contracts.
const myToken = artifacts.require("MyToken.sol");

//module.exports adentro tiene una función. Para nosotros es una async function dado que vamos a estar deployando un contrato.
//Deployer es un objeto que nos brinda truffle y es nuestra forma de interactuar con la Blockchain.
//Recordemos que siempre await es sobre alguna función.
module.exports = async (deployer) => {
  await deployer.deploy(myToken, 1000000000); //el segundo parámetro de deployer.deploy sería la cantidad de tokens (constructor).
};

//IMPORTANTE PRIMERA MIGRACIÓN:
//En el primera migración veremos que el migrate falla, puesto que el Solidity Compiler no es mayor o igual a 0.6.1 (el que viene con Truffle).
//Debemos agregarlo a nuestro truffle-config.js file.
//Docs: truffle docs -> reference -> configuration.
