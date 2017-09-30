const express = require('express');
const path = require('path');
const app = express();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const ProductCompiled = require(path.join(__dirname, 'public/contracts/Product.json'));



app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './public/templates');
app.set('view engine', 'pug')

app.get('/info/:address', (req, res) => {
    const address = req.params.address;
    const Product = web3.eth.contract(ProductCompiled.abi);
    const deployedProduct = Product.at(address);
    const product = deployedProduct.product();
    const name = product[0];
    const price = product[1].toString(10);
    console.log(name, price);
    const stories = [];
    let i = 0;
    while(i > -1) {
        try {
            const story = deployedProduct.stories(i);
            stories.push(story);
            ++i;
        } catch(err) {
            break;
        }
    }
    res.render('product', { name, price, stories });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT);