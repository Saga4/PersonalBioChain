// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var PersonalData = artifacts.require("./PersonalData.sol");

// module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.link(ConvertLib, MetaCoin);
//   deployer.deploy(MetaCoin);

// };

module.exports = function(deployer) {
  deployer.deploy(PersonalData);
  }; 
  
