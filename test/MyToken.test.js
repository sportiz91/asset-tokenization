//PASOS PARA ENTENDER TESTING: O bien.. leer -> resumen.docx del curso de Udemy (página 200 en adelante).
// a.	Truffle Js Testing docs: https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html
// b.	Truffle Abstract Contract docs (https://github.com/trufflesuite/truffle/tree/master/packages/contract)
// c.	Mocha docs
// d.	Chai docs
// e.	web3.utils.BN
// f.	chai-bn
// g.	chai-as-promised.

//Importante, una forma relativamente fácil de hacer Unit Testing es a través de Chai Library.
//Para instalar chai -> npm install -save chai chai-bn chai-as-promised
//¿De dónde sacamos todo esto? -> Si vamos al OpenZeppelin repo, y nos vamos a la ruta:
//Test -> Token -> ERC20 -> ERC20.test.js. Estos tests de Open Zeppelin hacen el Set Up con el "@openzeppelin/test-helpers"
//¿Dónde están los Open Zeppelin test-helpers? -> en el repo inicial, en openzeppelin-test-helpers
//Ruta: openzeppelin-test-helipers/src/setup.js. En ese file tendremos como es el setup de Big Number para usarlo en uno de tus tests.
//web3 está automáticamente injectada en los Truffle Tests. Lo único que tengo que hacer es configurar Chai para usarlo correctamente.
//Setup: https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/src/setup.js
const Token = artifacts.require("MyToken.sol");
const chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

//Una vez que el token está deployado en la blockchain, a través de Token.deployed() podemos obtener la instancia del contrato deployado.
//Para ver la documentación completa del contract abstraction -> https://github.com/trufflesuite/truffle/tree/master/packages/contract
contract("Token Test", async (accounts) => {
  it("all tokens should be in my account", async () => {
    const instance = await Token.deployed(); //Tiene sentido -> cuando utilizamos el "test" en la command line, Truffle se encarga de deployar los contratos
    //Y luego runnear los tests. Entonces, Token.deployed() simplemente verifica que esté deployado el contrato en la Blockchain en cuestión, y entonces genera
    //Una instance.
    const totalSupply = await instance.totalSupply();
    // const balance = await instance.balanceOf(accounts[0]);
    // assert.equal(
    //   balance.valueOf(),
    //   initialSupply.valueOf(),
    //   "The balance was not the same"
    // ); -> el profe personalmente prefiere no hacer esto, y encambio usar expect.
    expect(await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(
      totalSupply
    ); //expect es una función de chai. Expect espera que algo sea igual a alguna otra cosa.
  });
});

//Para correr los tests, simplemente "test". No importa que no tengas migrado previamente el SC.
//Todo queda hecho automáticamente.
//Importante, en este caso, de Chai (assertion library) estamos usando la interfaz de expect, en vez de la interfaz de assert.
//Es por eso que no tenemos los asserts más tradicionales como assert.equal().
