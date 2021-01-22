const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useUnifiedTopology: true });

// First way
// client.connect(err => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     let db = client.db('catagram');
//     let cats = db.collection('cats'); 

//     cats.find({}, (err, result) => {
//         if (err) {
//             console.log(err);
//             return;
//         }

//         result.toArray((err, result) => {
//             console.log(result);
//         });
//     });
// });

// Second way
// client.connect()
//     .then(res => {
//         const db = client.db('catagram');
//         const cats = db.collection('cats');

//         return cats.findOne({});
//     })
//     .then(res => {
//         console.log(res);
//     });

// Third way
async function run() {
    await client.connect();

    const db = client.db('catagram');
    const cats = db.collection('cats');

    let firstCat = await cats.findOne({});

    console.log(firstCat);
}

run();