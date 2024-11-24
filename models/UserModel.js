const mongoose = require('mongoose');
// const slugify = require('slugify');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    slug: String,
    age: {
        type: Number,
        required: [true, 'Please add age'],
        unique: false
    },
    country: {
        type: String,
        required: false,
        unique: false
    }

});


// //Create user slug from username
// //in this case .this refers to the Mongoose document middleware aka instance of a model class(user)
// UserSchema.pre('save', function(next) {
//     this.slug = slugify(toString(this.name), { lower: true });
//     next();
// });

module.exports = mongoose.model('User', UserSchema);



