const express = require('express');

const checkCatIdMiddleware = require('./middlewares/middleware');

const app = express();

const cats = [];

// app.get('/', (req, res) => {
//     res.send('Hello world from express!');
// });

app.get('/download', (req, res) => {
    // res.attachment('./views/home.html');
    // res.end();

    res.sendFile('./views/some.pdf', { root: __dirname });
});

app.post('/cats', (req, res) => {
    console.log('create cat');

    res.status(201).send('cat created!');
});


app.get('/cats/:catId?', checkCatIdMiddleware, (req, res) => {
    if (!/\d+/.test(req.params.catId)) {
        res.status(404).send('You need to specify cat id number');

        return;
    }

    res.send(`You are looking at profile of ${req.params.catId}`)
});

app.listen(5000, () => console.log(`Server is running on port 5000`));
