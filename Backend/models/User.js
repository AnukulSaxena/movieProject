import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensures that usernames are unique
    },
    password: {
        type: String,
        required: true,
    },
    // You can add more fields as needed, such as email, name, etc.
});

export const User = mongoose.model('User', userSchema);

