import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Box from './Box'
import Navbar from './Navbar'

function App() {
  const [Movies, setMovies] = useState([]);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [Page, setPage] = useState(0);
  const [pageInput, setPageInput] = useState(1);


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

        // Clear the clickedIndices array and reset box colors
        setClickedIndices([]);
        setClickedBoxes(Array(Movies.length).fill(false));
      })
      .catch((error) => {
        console.error('Error sending indices to the server:', error);
      });

  };

  const handleNextClick = () => {
    // Handle the "Next" button click event
    const len = Math.floor((Movies.length - 1) / 100);
    console.log(len);
    if (Page < len)
      setPage(Page + 1);

  };

  const handlePreviousClick = () => {
    // Handle the "Previous" button click event
    console.log('Previous');
    if (Page >= 1) {
      setPage(Page - 1);
    }
  };

  const handleGoClick = () => {
    // Handle the "Go" button click event
    const len = Math.floor((Movies.length - 1) / 100);
    if (pageInput >= 0 && pageInput <= len) {
      setPage(pageInput);
    }
  };
  var j = Page;
  const startIndex = j * 100;
  j++;
  console.log(startIndex);
  const endIndex = j * 100;
  console.log(endIndex);
  const currentMovies = Movies.slice(startIndex, endIndex);

  return (
    <div className='App-container'>
      <Navbar nIndices={clickedIndices} nMovies={Movies} />
      <div className="box-container">
        {currentMovies.map((movie, index) => (
          <Box
            key={Page * 100 + index}
            mImg={movie.Poster_Url}
            mIndex={Page * 100 + index}
            mTitle={movie.Title}
            mGenre={movie.Genre}
            // Pass the clicked state to the Box component
            isClicked={clickedBoxes[Page * 100 + index]}
            // Pass the click handler to the Box component
            onClick={() => handleBoxClick(Page * 100 + index)}
          />
        ))}
      </div>
      <div className="pagination-buttons">
        <button className="pagination-button" onClick={handlePreviousClick}>
          Previous
        </button>
        <button className="pagination-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
      <input
        type="number"
        value={pageInput}
        onChange={(e) => setPageInput(e.target.value)}
        min="1"
      />
      <button className="pagination-button" onClick={handleGoClick}>
        Go
      </button>

      {isAtLeastOneBoxClicked && (
        <div className="fixed-button-container">
          <button className="fixed-button"
            onClick={sendClickedIndicesToServer}>Send to Server</button>
        </div>
      )}
    </div>
  );
}

export default App;
