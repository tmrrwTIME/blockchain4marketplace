const express = require('express');
const path = require('path');
const app = express();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const ProductCompiled = require(path.join(__dirname, 'public/contracts/Product.json'));



app.use(express.static(path.join(__dirname, 'public')));

app.get('/info/:address', (req, res) => {
    const address = req.params.address;
    const Product = web3.eth.contract(ProductCompiled.abi);
    const deployedProduct = Product.at(address);
    const name = deployedProduct.name();
    const price = deployedProduct.price();
    const stories = [];
    let i = 0;
    while(i > -1) {
        try {
            stories.push(deployedProduct.stories(i));
            ++i;
        } catch(err) {
            console.log(err);
            break;
        }
    }
    res.send({ name, price, stories });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT);