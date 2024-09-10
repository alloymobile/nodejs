//Query parameter
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const fname = req.query.fname;
    const lname = req.query.lname;
    res.send('Hello World! ' + fname + ' ' + lname);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});