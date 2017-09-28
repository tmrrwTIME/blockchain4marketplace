pragma solidity ^0.4.15;

contract Product {
    string public name;
    uint8 public price; //in ether
    string[] public stories;

    function Product(string _name, uint8 _price) public {
        name = _name;
        price = _price;
    }

    function addStory(string story) public {
        stories.push(story);
    }
}
