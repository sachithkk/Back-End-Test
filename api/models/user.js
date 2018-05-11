const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username: {type: String, unique: true, require: true, trim: true},
    password: {type: String, trim: true},
    firstname: {type: String, trim: true},
    lastname:  {type :String,trim: true}
});

const User = mongoose.model('User', userSchema);
module.exports = User; 