const Token = artifacts.require("MyToken");

var chai = require("chai");

const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

require("dotenv").config({ path: "../.env" });

contract("Token Test", async (accounts) => {
  const [initialHolder, recipient, anotherAccount] = accounts;

  beforeEach(async () => {
    this.Token = await Token.new(process.env.INITIAL_TOKENS);
  });

  it("All tokens should be in my account", async () => {
    let instance = this.Token;
    let totalSupply = await instance.totalSupply();
    //old style:
    //let balance = await instance.balanceOf.call(initialHolder);
    //assert.equal(balance.valueOf(), 0, "Account 1 has a balance");
    //condensed, easier readable style:
    await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
  });

  // add this into the contract token test:

  it("I can send tokens from Account 1 to Account 2", async () => {
    const sendTokens = 1;
    let instance = this.Token;
    let totalSupply = await instance.totalSupply();
    await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply);
    await expect(instance.transfer(recipient, sendTokens)).to.eventually.be
      .fulfilled;
    await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
    await expect(
      instance.balanceOf(recipient)
    ).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
  });

  it("It's not possible to send more tokens than account 1 has", async () => {
    let instance = this.Token;
    let balanceOfAccount = await instance.balanceOf(initialHolder);
    await expect(instance.transfer(recipient, new BN(balanceOfAccount + 1))).to
      .eventually.be.rejected;

    //check if the balance is still the same
    await expect(
      instance.balanceOf(initialHolder)
    ).to.eventually.be.a.bignumber.equal(balanceOfAccount);
  });

  //...
});

// //PASOS PARA ENTENDER TESTING: O bien.. leer -> resumen.docx del curso de Udemy (página 200 en adelante).
// // a.	Truffle Js Testing docs: https://trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript.html
// // b.	Truffle Abstract Contract docs (https://github.com/trufflesuite/truffle/tree/master/packages/contract)
// // c.	Mocha docs
// // d.	Chai docs
// // e.	web3.utils.BN
// // f.	chai-bn
// // g.	chai-as-promised.

// //Importante, una forma relativamente fácil de hacer Unit Testing es a través de Chai Library.
// //Para instalar chai -> npm install -save chai chai-bn chai-as-promised
// //¿De dónde sacamos todo esto? -> Si vamos al OpenZeppelin repo, y nos vamos a la ruta:
// //Test -> Token -> ERC20 -> ERC20.test.js. Estos tests de Open Zeppelin hacen el Set Up con el "@openzeppelin/test-helpers"
// //¿Dónde están los Open Zeppelin test-helpers? -> en el repo inicial, en openzeppelin-test-helpers
// //Ruta: openzeppelin-test-helipers/src/setup.js. En ese file tendremos como es el setup de Big Number para usarlo en uno de tus tests.
// //web3 está automáticamente injectada en los Truffle Tests. Lo único que tengo que hacer es configurar Chai para usarlo correctamente.
// //Setup: https://github.com/OpenZeppelin/openzeppelin-test-helpers/blob/master/src/setup.js
// const Token = artifacts.require("MyToken.sol");
// const chai = require("chai");
// const BN = web3.utils.BN;
// const chaiBN = require("chai-bn")(BN);
// chai.use(chaiBN);
// const chaiAsPromised = require("chai-as-promised");
// chai.use(chaiAsPromised);
// const expect = chai.expect;

// //Una vez que el token está deployado en la blockchain, a través de Token.deployed() podemos obtener la instancia del contrato deployado.
// //Para ver la documentación completa del contract abstraction -> https://github.com/trufflesuite/truffle/tree/master/packages/contract
// contract("Token Test", async (accounts) => {
//   //Accounts it's an array of accounts. So, in this case, we put the first address in the deployerAccount, the second address in the recipient
//   //And the third address in the anotherAccount, and goes on...
//   const [deployerAccount, recipient, anotherAccount] = accounts;

//   it("all tokens should be in my account", async () => {
//     // cuando utilizamos el "test" en la command line, Truffle se encarga de deployar los contratos
//     //Y luego runnear los tests. Entonces, Token.deployed() simplemente verifica que esté deployado el contrato en la Blockchain en cuestión, y entonces genera
//     //Una instance.
//     const instance = await Token.deployed();

//     //Guardamos en la variable totalSupply el resultado de llamar a la public variable totalSupply.
//     const totalSupply = await instance.totalSupply();

//     //Esto sería con la assertion interfaz de chai
//     // const balance = await instance.balanceOf(accounts[0]);
//     // assert.equal(
//     //   balance.valueOf(),
//     //   initialSupply.valueOf(),
//     //   "The balance was not the same"
//     // ); -> el profe personalmente prefiere no hacer esto, y encambio usar expect.

//     //Con expect interfaz de chai.
//     //En vez de utilizar await syntax:
//     // expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(
//     //   totalSupply
//     // );

//     //Podemos usar el eventually assertion proveniente de la librería chai-as-promised (plugin de chai library)
//     //recordemos que el eventually hace que todo lo que tengamos a continuación devuelva una promise.
//     //Entonces, la sintaxis es equivalente a las líneas de arriba.
//     expect(
//       instance.balanceOf(deployerAccount)
//     ).to.eventually.be.a.bignumber.equal(totalSupply);
//   });

//   it("It's possible to send tokens between accounts", async () => {
//     const sendTokens = 1;
//     const instance = await Token.deployed();
//     const totalSupply = await instance.totalSupply();

//     //Al deployar el token, toda la oferta inicialmente la deberíamos tener nosotros (deployer account):
//     expect(
//       instance.balanceOf(deployerAccount)
//     ).to.eventually.be.a.bignumber.equal(totalSupply);

//     //instance.transfer es la Smart Contract function derivada del estándar ERC20
//     //transfer(address recipient, uint256 amount). Veamos que son los parámetros que tenemos determinados.
//     //to.eventually.be.fulfilled implicaría que la promesa se resuelva exitosamente en algún momento.
//     expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;

//     //Luego de haber hecho la transferencia de tokens, esperaríamos que la deployerAccount tenga la totalSuplly - sendTokens:
//     expect(
//       instance.balanceOf(deployerAccount)
//     ).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));

//     //En este caso, la cuenta que recibe no puede recibir un número! Recordemos que me va a devolver siempre todo en formato Bignumber.
//     //Por eso tengo que crear un nuevo objeto BN que sea igual a sendTokens (la cantidad de tokens que recibe):
//     expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(
//       new BN(sendTokens)
//     );
//   });

//   it("It's not possible to send more tokens that available in total", async () => {
//     const instance = await Token.deployed();
//     const balanceOfDeployer = await instance.balanceOf(deployerAccount);

//     expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to
//       .eventually.be.rejected;

//     expect(
//       instance.balanceOf(deployerAccount)
//     ).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
//   });
// });

// //Para correr los tests, simplemente "test". No importa que no tengas migrado previamente el SC.
// //Todo queda hecho automáticamente.
// //Importante, en este caso, de Chai (assertion library) estamos usando la interfaz de expect, en vez de la interfaz de assert.
// //Es por eso que no tenemos los asserts más tradicionales como assert.equal().
