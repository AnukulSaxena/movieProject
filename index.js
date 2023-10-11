import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { Movie, Mymovie } from './models/movies.js';
import 'dotenv/config';


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

main().then(() => { console.log("connection successful."); }).catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URL);
}

let chosenMovies = []
let movies = []

app.get("/", async (req, res) => {
    movies = await Movie.find();
    res.render("index.ejs", { title: "Movies", moviesList: movies });
});



async function insertData(number) {
    const data = (movies[number]);

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

app.post("/api/recieve_array", (req, res) => {
    const myArray = Array.from({ length: 10000 }, () => 0);
    const numbers = req.body.numbers;
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        if (myArray[number] === 0) {
            myArray[number]++;
            insertData(number);
        }
    }
});



app.listen(port, () => {
    console.log('server running');
});