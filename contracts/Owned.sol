pragma solidity ^0.4.15;

contract Owned {
    address owner;

    function Owned() public {
        owner = msg.sender;
    }

    modifier fromOwner() {
        require(owner == msg.sender);
        _;
    }

    function changeOwner(address newOwner) public fromOwner {
        owner = newOwner;
    }
}