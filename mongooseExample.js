const { Logger } = require('mongodb');
const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/mongotest';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to database!');
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Person = mongoose.model('Person', personSchema);

let person = new Person({name: 'Petkan', age: 26});

// person.save((err, result) => {
//     if (err) return console.log(err);

//     console.log(result);
// });

person.save()
    .then(result => {
        console.log(result);
    });
