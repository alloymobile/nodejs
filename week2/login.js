//Query parameter
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const email = 'hello@gmail.com';
    const password = '1234';
    const clientEmail = req.query.email;
    const clientPassword = req.query.password;

    if (email === clientEmail && password === clientPassword) {
        res.send('Login Success');
    }else{
        res.send('Login Failed');
    }
});

app.post('/login', (req, res) => {
    const email = 'hello@gmail.com';
    const password = '1234';
    const clientEmail = req.body.email;
    const clientPassword = req.body.password;

    if (email === clientEmail && password === clientPassword) {
        res.send('Login Success');
    }else{
        res.send('Login Failed');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});