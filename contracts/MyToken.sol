//Una vez hecho el set-up del nuevo proyecto, e instalado open-zeppelin, el siguiente paso sería crear el contrato para mi nuevo token.

//Compiler:
pragma solidity >=0.6.1;

//Importamos ERC-20 y ERC-20 detailed implementations.
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply)
        ERC20("StarDucks Capuccino Token", "CAPPU")
    {
        _mint(msg.sender, initialSupply);
    }

    //The constructor function detailed above has 18 decimals by default.
    //If you want to specifically change that number of decimals, you should add the below
    //Function, detailing the decimals in place.
    //function decimals() public view virtual override returns (uint8) {
    //    return 16;
    //}
}
