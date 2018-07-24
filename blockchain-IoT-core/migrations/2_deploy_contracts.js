/* eslint-disable */
const IOTDevice = artifacts.require('./IOTDevice.sol');

module.exports = function (deployer) {
  deployer.deploy(IOTDevice);
};
