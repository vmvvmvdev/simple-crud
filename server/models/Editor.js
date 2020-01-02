const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const EditorSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }

});

EditorSchema.pre('save', function (next) {

  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR,  (err, salt)=> {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt,  (err, hash)=> {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });

});

EditorSchema.methods.comparePassword = async function (password) {
  const res = await bcrypt.compare(password, this.password);
  return res;
};


module.exports = mongoose.model('Editor', EditorSchema);