const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const UserSchema = new Schema({

  email: {
    type: String,
    required: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  }

});

UserSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('User', UserSchema);