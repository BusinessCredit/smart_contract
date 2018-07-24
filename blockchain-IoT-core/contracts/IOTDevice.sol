pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/token/ERC20/ERC20Basic.sol";
import "zeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract Status{
  using SafeERC20 for ERC20Basic;

  string public describe;
  string public comment;
  bytes32 public id;
  ERC20Basic public token;

  constructor(ERC20Basic _token, string _describe, string _comment, bytes32 _id) public
  {
    token = _token;
    describe = _describe;
    comment = _comment;
    id = _validateId(_id);
  }

  function _validateId(bytes32 _id) internal pure returns(bytes32) {
    return _id;
  }
}

contract IOTDevice is Ownable {
  mapping(bytes32 => Status) public status;

  event NewStatusAdded(address indexed newStatus, uint256 timestamp);

  function addStatusForIODevices(ERC20Basic _token, string _event, string _comment, bytes32 _id) public onlyOwner {
    Status newStatus = new Status(_token, _event, _comment, _id);
    status[_id] = newStatus;
    NewStatusAdded(newStatus, now);
  }
}