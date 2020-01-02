const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.set('debug', true)
mongoose.set('useCreateIndex', true);
const connectionString = 'mongodb+srv://admin:admin123@cluster0-jkywf.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', () => {
  console.error('Error occured in db connection');
});

db.on('open', () => {
  console.log('DB Connection established successfully');
});

module.exports = db;