//CRUD operations for products  Create Read Update Delete
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    {
        id: 1,
        name: 'Laptop',
        price: 1500,
        quantity: 10
    },
    {
        id: 2,
        name: 'Mouse',
        price: 20,
        quantity: 20
    },
    {
        id: 3,
        name: 'Keyboard',
        price: 50,
        quantity: 30
    }
];


app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(product => product.id == id);
    res.json(product);
});

app.post('/products', (req, res) => {
    const product = req.body;
    products.push(product);
    res.json(product);
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(product => product.id == id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    products = products.filter(product => product.id != id);
    res.json(products);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});