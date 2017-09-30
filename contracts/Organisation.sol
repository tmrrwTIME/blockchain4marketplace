pragma solidity ^0.4.15;

import './Product.sol';
import './Owned.sol';

contract Organisation is Owned {
    string public name;
    address[] public products;

    function Organisation(string _name) public {
        name = _name;
    }

    function addProduct(string _name, uint8 _price) public fromOwner {
        address product = new Product(_name, _price);
        products.push(product);
    }

    function addStory(address prodAddress, string story) public fromOwner {
        Product(prodAddress).addStory(story);
    }

    function changeName(string _name) fromOwner public {
        name = _name;
    }
}