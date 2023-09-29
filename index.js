import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

main().then(() => { console.log("connection successful."); }).catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/moviesDB");
}

const movieSchema = new mongoose.Schema({
    Release_Date: String,
    Title: String,
    Genre: String,
    Overview: String,
    Popularity: Number,
    Vote_Count: String,
    Vote_Average: String,
    Original_Language: String,
    Poster_Url: String
});

const Movie = mongoose.model("Movie", movieSchema);
const Mymovie = mongoose.model("Mymovie", movieSchema);

let chosenMovies = []
let movies = []

app.get("/", async (req, res) => {
    movies = await Movie.find();
    res.render("index.ejs", { title: "Movies", moviesList: movies, selectedMovies: chosenMovies });
});



async function insertData(number) {
    const data = (movies[number]);

    try {
        const filter = { Title: data.Title }
        const res = await Mymovie.findOne(filter);

        if (res) {
            console.log(1);
        } else {
            console.log(2);
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