import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Box from './Box'

function App() {
  const [Movies, setMovies] = useState([]);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);

  useEffect(() => {
    axios
      .get('/api/movies')
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleBoxClick = (index) => {

    // Toggle the clicked state for the box at the given index
    setClickedBoxes((prevClickedBoxes) => {
      const newClickedBoxes = [...prevClickedBoxes];
      newClickedBoxes[index] = !newClickedBoxes[index];
      return newClickedBoxes;
    });

    if (clickedIndices.includes(index)) {
      // If the index is already in the array, remove it
      setClickedIndices((prevClickedIndices) =>
        prevClickedIndices.filter((item) => item !== index)
      );
    } else {
      // If the index is not in the array, add it
      setClickedIndices((prevClickedIndices) => [...prevClickedIndices, index]);
    }
    console.log(clickedIndices);

  };

  const isAtLeastOneBoxClicked = clickedBoxes.some((value) => value);

  const sendClickedIndicesToServer = () => {
    console.log(clickedIndices);
    axios
      .post('/api/saveIndices', { clickedIndices })
      .then((response) => {
        console.log('Indices sent to the server:', clickedIndices);
        // You can handle the response from the server here if needed
      })
      .catch((error) => {
        console.error('Error sending indices to the server:', error);
      });
  };

  return (
    <div className='App-container'>
      <div className="box-container">
        {Movies.map((movie, index) => (
          <Box
            key={index}
            mImg={movie.Poster_Url}
            mIndex={index}
            mTitle={movie.Title}
            mGenre={movie.Genre}
            // Pass the clicked state to the Box component
            isClicked={clickedBoxes[index]}
            // Pass the click handler to the Box component
            onClick={() => handleBoxClick(index)}
          />
        ))}
      </div>
      {isAtLeastOneBoxClicked && (
        <div className="fixed-button-container">
          <button className="fixed-button"
            onClick={sendClickedIndicesToServer}>Your Fixed Button</button>
        </div>
      )}
    </div>
  );
}

export default App;
