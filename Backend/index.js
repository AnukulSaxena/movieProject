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
            return res.status(400).json({ message: 'Username already exists' });
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


async function insertData(number) {
    const data = (movies[number]);
    console.log(data);

    try {
        const filter = { Title: data.Title }
        const res = await Mymovie.findOne(filter);

        if (res) {
            console.log("Copy Found");
        } else {
            console.log("Data Inserted.");
            await Mymovie.create(data.toObject())
        }

    } catch (error) {
        console.error('Error inserting data into target collection:', error);
        throw error;
    }
}

app.post('/api/saveIndices', (req, res) => {
    const clickedBoxes = req.body.clickedIndices;
    for (var i = 0; i < clickedBoxes.length; i++) {
        const idx = clickedBoxes[i];
        insertData(idx);

    }


    res.send('Data received successfully');
})

app.listen(port, () => {
    console.log("Server is listening at PORT: " + port);
})