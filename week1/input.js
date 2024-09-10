const express = require('express');
const app = express();

// Middleware to parse JSON request body
app.use(express.json()); 


app.get('/', (req, res) => {
    const queryParam = req.query.param;
    res.send(`The query parameter is: ${queryParam}`);
});

app.get('/:id', (req, res) => {
    const queryParam = req.params.id;
    res.send(`The query parameter is: ${queryParam}`);
});

app.post('/', (req, res) => {
    const body = req.body;
    const headers = req.headers;
    res.send(`The query parameter is: ${body.name} ${headers['country']}`);
});

app.listen(3000, () => {
  console.log('Server running');
});
