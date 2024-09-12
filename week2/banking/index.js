//Simple banking api

const express = require('express');
const app = express();
const port = 3000;

const accounts = [
    { accountNumber: 1, name: 'Alex', balance: 500 },
    { accountNumber: 2, name: 'Sarah', balance: 700 },
    { accountNumber: 3, name: 'John', balance: 300 }
];


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to My Banking API');
});


app.post('/accounts', (req, res) => {
    const account = req.body;
    accounts.push(account);
    res.json(account);
});

app.get('/accounts', (req, res) => {
    res.json(accounts);
});

app.get('/accounts/:accountNumber', (req, res) => {
    const accountNumber = req.params.accountNumber;
    const account = accounts.find(account => account.accountNumber == accountNumber);
    res.json(account);
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});