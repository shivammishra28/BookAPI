const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};
const User = model('User', userSchema);
module.exports = User;
// This code defines a Mongoose schema and model for a user in a MongoDB database.
// The schema includes fields for username, email, password, and createdAt timestamp.
// It also includes a pre-save hook to hash the password before saving it to the database