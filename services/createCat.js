const Person = require('../modules/Person');
const Cat = require('../modules/Cat');

function createCat(name, owner) {
    let person = new Person({name: owner, age: 33});
    person.save()
        .then(createdPerson => {
            let cat = new Cat({name, age: 5, breed: 'Persian', owner: createdPerson});

            return cat.save();
        })
        .then(createdCat => {
            console.log(createdCat);
        })
}

module.exports = createCat;