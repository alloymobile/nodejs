//Header 

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const country = req.header('country');
    const auth = req.header('Authorization');
    res.send('Hello World! '+ country + ' ' + auth);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
