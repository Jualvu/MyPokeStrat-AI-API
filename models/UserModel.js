const mongoose = require('mongoose');
// const slugify = require('slugify');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please add a name.'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters.']
    },
    password : {
        type: String,
        required: [true, 'Please add a Password'],
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long.']
    }


});


// //Create user slug from username
// //in this case .this refers to the Mongoose document middleware aka instance of a model class(user)
// UserSchema.pre('save', function(next) {
//     this.slug = slugify(toString(this.name), { lower: true });
//     next();
// });

module.exports = mongoose.model('User', UserSchema);



