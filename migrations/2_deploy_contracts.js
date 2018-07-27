// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var BytesToTypes = artifacts.require("./BytesToTypes.sol");
var TypesToBytes = artifacts.require("./TypesToBytes.sol");
var SizeOf = artifacts.require("./SizeOf.sol");
var Seriality = artifacts.require("./Seriality.sol");
var PersonalData = artifacts.require("./PersonalData.sol");

// module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.link(ConvertLib, MetaCoin);
//   deployer.deploy(MetaCoin);

// };

module.exports = function(deployer) {
  deployer.deploy(BytesToTypes);
  deployer.deploy(TypesToBytes);
  deployer.deploy(SizeOf);
  deployer.deploy(Seriality);
  deployer.deploy(PersonalData);
}; 
  
