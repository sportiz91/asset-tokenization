//Now that we have our Crowdsale.sol adaptated to the newer solidity versions,
//We can create the contract for the token sale. It's gonna use Crowdsale.sol.
//docs.openzeppelin.com/contracts/2.x/crowdsales -> "Minted Crowdsale".
//In our case, we have a pre-minted token, where all the tokens where pre-minted and given to the msg.sender address.

//MyTokenSale.sol -> It will be the Smart Contract that owns the initialSupply defined in MyToken.sol. (see migrations to see that we are sending all the supply here)
//Then, we you send ether to the MyTokenSale.sol Smart Contract, it'll tokens from its own address to the persona that is sending the money.
//The money received will be sent to the address defined here in the constructor (at a specific rate).
//If we want to use this functionality, we have to transfer all the tokens from the deployer address to MyTokenSale.sol Smart Contract.

pragma solidity >=0.6.1;

import "./Crowdsale.sol";

contract MyTokenSale is Crowdsale {
    constructor(
        uint256 rate, // rate in TKNbits (rate tkns/wei)
        address payable wallet, //address that will get the funds on selling tokens
        IERC20 token //token that is give in exchange for money
    ) public Crowdsale(rate, wallet, token) {}
}

//rate, in this case, refers to the relationship wei/tokens. In this case, we are going to say: "1 wei = 1 token".
//Then we have as a second parameter of the constructor the address that will get the money from the crowdsale
//Third parameter token address.
