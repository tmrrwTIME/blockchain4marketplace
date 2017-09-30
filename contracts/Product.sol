pragma solidity ^0.4.15;

import './Owned.sol';

contract Product is Owned {
    struct Prod {
        string name;
        uint8 price; //in ether
    } Prod public product;

    string[] public stories;

    function Product(string _name, uint8 _price) public {
        product.name = _name;
        product.price = _price;
    }

    function addStory(string story) public fromOwner {
        stories.push(story);
    }
}
