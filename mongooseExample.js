const mongoose = require('mongoose');
const Person = require('./modules/Person');

const uri = 'mongodb://localhost:27017/mongotest';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to database!');
});

let person = new Person({name: 'Petkan', age: 26});

// person.save((err, result) => {
//     if (err) return console.log(err);

//     console.log(result);
// });

// person.save()
//     .then(result => {
//         console.log(result);
//     });


Person.find({})
    .then((people) => {
        people.forEach(x => {
            console.log(`I am bord ${x.birthYear}`)
        });
    });

Person.findById('600b01c4ecbfbaf7d7752b72')
    .then(person => {
        person.name = 'Peter';
        person.save();
    })

// Person.updateOne({_id: '600b19c4fdecd44f38d5fd68'}, {$set: { name: 'Stamat4o', age: 26 }})
//     .then(res => {
//         console.log(res);
//     })

// Person.remove({name: 'Stamat4o'})
//     .then(res => {
//         console.log(res);
//     });

async function run() {
    // let count = await Person.countDocuments({age: {$gte: 25}});

    // let names = await Person.find().select('name');

    let names = await Person.find({}, { _id:0, name: 1 }).sort({age: -1});
    console.log(names);
}

run();