pragma solidity ^0.4.15;

import './Product.sol';

contract Init {
    function Init() public {

    }

    function createProduct(string _name, uint _price) returns(Product product) {
        product = new Product(_name, _price);
    }
}