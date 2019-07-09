const mongoose = require('mongoose');

let Person;

const initDb = () => {
  const password = process.argv[2];
  const url = `mongodb+srv://tim:${password}@fullstackopen-3jkfn.mongodb.net/phonebook-app?retryWrites=true&w=majority`;
  mongoose.connect(url, { useNewUrlParser: true });
  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  });
  Person = mongoose.model('Person', personSchema);
}

const addPerson = (name, number) => {
  const person = new Person({
    name,
    number,
  });

  person.save().then(result => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
};

const getAll = () => {
  console.log('Phonebook:');
  Person.find({}).then(result => {
    result.forEach(({name, number}) => {
      console.log(name, number);
    });
    mongoose.connection.close();
  });
};

const main = () => {
  initDb();
  if (process.argv.length === 3) {
    getAll();
  }
  if (process.argv.length === 5) {
    const [name, number] = process.argv.slice(3);
    addPerson(name, number);
  }
}

main();
