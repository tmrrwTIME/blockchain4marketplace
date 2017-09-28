pragma solidity ^0.4.15;

import './Product.sol';
import './Owned.sol';

contract Organisation is Owned {
    string public name;
    Product[] products;
    
    event OrganisationCreated (address owner, string _name);

    function Organisation(string _name) public {
        name = _name;
        OrganisationCreated(msg.sender, name);
    }

    function addProduct(string _name, uint _price) public fromOwner returns(Product product) {
        product = new Product(_name, _price);
        products.push(product);
    }

    function getProductCount() public constant returns(uint productCount) {
        productCount = products.length;
    }

    function getProduct(uint number) public constant returns(Product product) {
        if (number == 0) {
            number = getProductCount();
        }
        number = number - 1; //0 based indexing
        product = products[number];
    }

    function setName(string _name) public returns(bool success) {
        name = _name;
        success = true;
    }
}