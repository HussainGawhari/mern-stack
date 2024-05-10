import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password: {
        type: 'string',
        required: true,
    },
    profilePicture: {
        type: 'string',
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHvZ0pbf4bXvAJgVZVuRQqrNWnoWl96cV6wQ&s',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true }, );

const User = mongoose.model('User', userSchema);

export default User;