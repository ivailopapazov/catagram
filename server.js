const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const createCat = require('./services/createCat');
const Cat = require('./modules/Cat');
require('./config/db');

const checkCatIdMiddleware = require('./middlewares/middleware');
const logger = require('./middlewares/loggerMiddleware');
const cats = require('./cats');

const app = express();

app.use('/static', express.static('public'));
app.use(logger);

app.use(bodyParser.urlencoded({extended: false}))

app.engine('hbs', handlebars({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    // createCat('Navcho', 'Ivaylo');
    Cat.find({name: 'Navcho'})
        .populate('owner')
        .then(cat => {
            console.log(cat);
            
            let name = 'Navcho';
            res.render('home', { name });
        })
});

app.get('/download', (req, res) => {
    res.download('./public/index.html');
    // res.sendFile('./public/index.html', { root: __dirname });
});

app.get('/cats', (req, res) => {
    res.render('cats', {cats: cats.getAll()});
});

app.post('/cats', (req, res) => {
    let catName = req.body.cat;
    
    cats.add(catName)

    res.redirect('/cats');
});

app.get('/cats/:catId?', (req, res) => {
    if (!/\d+/.test(req.params.catId)) {
        res.status(404).send('You need to specify cat id number');

        return;
    }

    res.send(`You are looking at profile of ${req.params.catId}`)
});


app.listen(5000, () => console.log(`Server is running on port 5000`));
