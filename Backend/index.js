import express from "express";
import mongoose from "mongoose";
import { Movie, Mymovie } from './models/movies.js';
import bodyParser from "body-parser";
import { User } from './models/User.js';

const app = express();
const port = 3000;
var count = 0;
var movies = []

app.use(bodyParser.json());

main().then(() => { console.log("connection successful."); }).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/moviesDB');
}

app.get("/api/movies", async (req, res) => {
    movies = await Movie.find();
    console.log(count++);
    res.send(movies)
});

app.post('/api/signup', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Check if the username already exists in your database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ message: 'Username already exists' });
        }
        // If the username is not taken, create a new user
        const newUser = new User({ username, password });
        await newUser.save();
        return res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Registration failed' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        // Find the user in the database by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: 'User not found' });
        }
        // Check if the provided password matches the user's password
        if (password !== user.password) {
            return res.json({ message: 'Incorrect password' });
        }
        return res.json({ message: 'Login successful', user: user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Login failed' });
    }
});



async function insertData(number, username) {
    const data = movies[number];

    try {
        // Use the username to create a dynamic collection name
        const collectionName = `${username}_movies`; // Replace 'movies' with your default collection name

        // Define the model with the dynamic collection name
        const UserModel = mongoose.model(collectionName, Mymovie.schema);

        const filter = { Title: data.Title };
        const res = await UserModel.findOne(filter);

        if (res) {
            console.log("Copy Found");
        } else {
            console.log("Data Inserted.");
            await UserModel.create(data.toObject());
        }
    } catch (error) {
        console.error('Error inserting data into target collection:', error);
        throw error;
    }
}

app.post('/api/saveIndices', (req, res) => {
    const clickedBoxes = req.body.clickedIndices;
    const username = req.body.username;

    for (let i = 0; i < clickedBoxes.length; i++) {
        const idx = clickedBoxes[i];
        insertData(idx, username);
    }

    res.send('Data received successfully');
});

app.post('/api/watchedMovies', async (req, res) => {
    console.log(req.body.userProfile);
    const username = req.body.userProfile;

    const collectionName = `${username}_movies`;

    const UserModel = mongoose.model(collectionName, Mymovie.schema);

    const watched = await UserModel.find();
    res.send(watched)
})


app.listen(port, () => {
    console.log("Server is listening at PORT: " + port);
})