const mongoose = require('mongoose');

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
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
