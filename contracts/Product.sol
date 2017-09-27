pragma solidity ^0.4.15;

import './Owned.sol';

contract Product is Owned {
    string public name;
    uint public price; //in weis
    struct Story {
        string description;
        string imageURL;
    } Story[] stories;

    function Product(string _name, uint _price) public {
        name = _name;
        price = _price;
    }

    function addStory(string description, string imageURL) public fromOwner returns(bool success) {
        if (bytes(description).length == 0 || bytes(imageURL).length == 0)
            revert();
        stories.push(Story({
            description: description,
            imageURL: imageURL
        }));
        success = true;
    }

    function getStoriesCount() public constant returns(uint storiesCount) {
        storiesCount = stories.length;
    }

    function getStory(uint index) public constant returns(string description, string imageURL) {
        if (index > getStoriesCount() - 1)
            revert();
        description = stories[index].description;
        imageURL = stories[index].imageURL;
    }
}
