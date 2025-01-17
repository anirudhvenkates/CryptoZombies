var zombiefactory = artifacts.require("./zombiefactory.sol");
var zombiefeeding = artifacts.require("./zombiefeeding.sol");
var zombiehelper = artifacts.require("./zombiehelper.sol");
var zombieattack = artifacts.require("./zombieattack.sol");
var zombieownership = artifacts.require("./zombieownership.sol");
var kittycontract = artifacts.require("./kittycontract.sol");

module.exports = function(deployer) {

	deployer.deploy(kittycontract);
    deployer.deploy(zombiefactory);
    deployer.deploy(zombiefeeding);
    deployer.deploy(zombiehelper);
    deployer.deploy(zombieattack);
    deployer.deploy(zombieownership);
}