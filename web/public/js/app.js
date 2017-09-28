'use strict';
const OrganisationCompiled = require('../contracts/Organisation.json');
const ProductCompiled = require('../contracts/Product.json')

window.addEventListener('load', function () {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    // Now you can start your app & access web3 freely:
    start();
});

function start() {
    const web3 = window.web3;
    const $ = window.$;
    const createOrganisation = () => {
        const orgName = $('.org-create .orgName').val();
        const Organisation = web3.eth.contract(OrganisationCompiled.abi);
        console.log(orgName);
        Organisation.new(orgName, {
            data: OrganisationCompiled.unlinked_binary,
            from: web3.eth.accounts[0]
        }, function (err, result) {
            if (!err) {
                if (result.address) {
                    $('#org-create-result').html('Org created successfully. Your org address is ' +  result.address);
                } else {
                    $('#org-create-result').html('Please wait a moment. Nodes are mining the block');
                }
            } else {
                alert('Something went wrong. Please see console for more info')
                console.log(err);
            }
        });
    }
    
    const addProduct = () => {
        const orgAddress = $('.product-add .orgAddress').val();
        const prodName = $('.product-add .prodName').val();
        const prodPrice = $('.product-add .prodPrice').val();
        if (!orgAddress || !prodName || !prodPrice) {
            alert('All fields are compulsory')
            return;
        }
        const Organisation = web3.eth.contract(OrganisationCompiled.abi);
        const deployedOrgContract = Organisation.at(orgAddress);
        console.log(orgAddress, prodName, prodPrice)
        deployedOrgContract.addProduct(prodName, Number(prodPrice), function(err, result) {
            if (!err) {
                $('#product-add-result').html('Sit tight!!!, we are adding your product. Your transaction id is ' + result);
            } else {
                alert('Something went wrong. Please see console for more info')
                console.log(err);
            }
        });
    }

    const getProductAtIndex = () => {
        let prodNumber = $('.product-info .prodNumber').val();
        if (prodNumber === '') {
            prodNumber = '0';
        }
        const orgAddress = $('.product-info .orgAddress').val();        
        console.log(prodNumber, orgAddress);
        const Organisation = web3.eth.contract(OrganisationCompiled.abi);
        const deployedOrgContract = Organisation.at(orgAddress);
        deployedOrgContract.getProduct.call(Number(prodNumber), (err, result) => {
            if (!err) {
                $('#product-info-result').html('Your product address is '+ result  +'. Visit <a href="' + 'http://localhost:9000/info/' + result +'">info</a> or scan below qrcode');
                getProductDetails(result);
            } else {
                alert('Something went wrong. Please see console for more info')
                console.log(err);
            }
           
        })
    }
    
    const getProductDetails = (prodAddress) => {
        makeCode('http://localhost:9000/info/' + prodAddress);
    }

    const makeCode = (url) => {
        $('#qrcode').html('');
        const qrcode = new QRCode("qrcode");
        qrcode.makeCode(url);
    }

    const addStory = () => {
        const prodAddress = $('.product-add-story .prodAddress').val();
        const storyDescription = $('.product-add-story .storyDescription').val();
        const storyImageURL = $('.product-add-story .storyImageURL').val();
        if (!prodAddress || !storyDescription || !storyImageURL) {
            alert('All fields are required');
            return;
        }
        console.log(prodAddress, storyDescription, storyImageURL);
        const Product = web3.eth.contract(ProductCompiled.abi);
        const deployedProduct =  Product.at(prodAddress);
        deployedProduct.addStory(storyDescription, storyImageURL, function(err, result) {
            if (!err) {
                $('#product-add-story-result').html('Sit tight!!!, we are adding your product story. Your transaction id is ' + result);
            } else {
                alert('Something went wrong. Please see console for more info')
                console.log(err);
            }
        });
    }

    window.exp = {
        createOrganisation,
        addProduct,
        getProductAtIndex,
        addStory
    }
}
