const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

console.log('Connecting to mongodb');
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connected to mongodb');
  })
  .catch(error => {
    console.log('Error connecting to mongodb', error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  number: String,
});

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});
personSchema.plugin(uniqueValidator);

mongoose.set('useFindAndModify', false);

module.exports = mongoose.model('Person', personSchema);
