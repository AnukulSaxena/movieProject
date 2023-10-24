import { useEffect, useState } from 'react'
import './../styles/App.css'
import axios from 'axios'
import Box from './Box'
import Navbar from './Navbar'
import PaginationControls from './PaginationControls'
import LoginPanel from './LoginPanel';


function App() {
  const [Movies, setMovies] = useState([]);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [clickedIndices, setClickedIndices] = useState([]);
  const [Page, setPage] = useState(0);
  const [pageInput, setPageInput] = useState(1);
  const [isLoginPanelOpen, setLoginPanelOpen] = useState(false);


  const initialIsUserLoggedIn = localStorage.getItem('isLoggedInKey') === 'true';
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(initialIsUserLoggedIn);
  useEffect(() => {
    localStorage.setItem('isLoggedInKey', isUserLoggedIn);
  }, [isUserLoggedIn]);



  const initialUsername = localStorage.getItem('usernameKey') || '';
  const [AppUsername, setAppUsername] = useState(initialUsername);
  useEffect(() => {
    localStorage.setItem('usernameKey', AppUsername);
  }, [AppUsername]);


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


    setClickedBoxes((prevClickedBoxes) => {
      const newClickedBoxes = [...prevClickedBoxes];
      newClickedBoxes[index] = !newClickedBoxes[index];
      return newClickedBoxes;
    });

    if (clickedIndices.includes(index)) {

      setClickedIndices((prevClickedIndices) =>
        prevClickedIndices.filter((item) => item !== index)
      );
    } else {

      setClickedIndices((prevClickedIndices) => [...prevClickedIndices, index]);
    }

  };

  const isAtLeastOneBoxClicked = clickedBoxes.some((value) => value);

  const sendClickedIndicesToServer = () => {
    axios
      .post('/api/saveIndices', { clickedIndices: clickedIndices, username: AppUsername })
      .then((response) => {
        console.log('Indices sent to the server:', clickedIndices);

        setClickedIndices([]);
        setClickedBoxes(Array(Movies.length).fill(false));
      })
      .catch((error) => {
        console.error('Error sending indices to the server:', error);
      });

  };

  const handleNextClick = () => {

    const len = Math.floor((Movies.length - 1) / 100);
    if (Page < len)
      setPage(Page + 1);

  };

  const handlePreviousClick = () => {

    if (Page >= 1) {
      setPage(Page - 1);
    }
  };

  const handleGoClick = () => {

    const len = Math.floor((Movies.length - 1) / 100);
    if (pageInput >= 1 && pageInput <= len + 1) {
      setPage(pageInput - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLoginClick = () => {

    setLoginPanelOpen(true);
  };

  const handleCloseLoginPanel = () => {
    setLoginPanelOpen(false);
  };

  var j = Page;
  const startIndex = j * 100;
  j++;

  const endIndex = j * 100;

  const currentMovies = Movies.slice(startIndex, endIndex);

  return (
    <div className='App-container'>
      <Navbar
        nIndices={clickedIndices} nMovies={Movies}
        onPageChange={handlePageChange}
        onLoginClick={handleLoginClick}
        isUserLoggedIn={isUserLoggedIn} />

      <div className="box-container">
        {currentMovies.map((movie, index) => (
          <Box
            key={Page * 100 + index}
            mImg={movie.Poster_Url}
            mIndex={Page * 100 + index}
            mTitle={movie.Title}
            mGenre={movie.Genre}

            isClicked={clickedBoxes[Page * 100 + index]}

            onClick={() => handleBoxClick(Page * 100 + index)}
          />
        ))}
      </div>
      <PaginationControls
        onPreviousClick={handlePreviousClick}
        onNextClick={handleNextClick}
        onPageInputChange={(e) => setPageInput(e.target.value)}
        onGoClick={handleGoClick}
        pageInput={pageInput}
        totalPages={Math.floor((Movies.length - 1) / 100)}
        currentPage={Page}
      />

      {isAtLeastOneBoxClicked && (
        <div className="fixed-button-container">
          <button className="fixed-button"
            onClick={isUserLoggedIn ? sendClickedIndicesToServer : handleLoginClick}>Send to Server</button>
        </div>
      )}


      {isLoginPanelOpen && (
        <LoginPanel onClose={handleCloseLoginPanel}
          setIsUserLoggedIn={setIsUserLoggedIn}
          setAppUsername={setAppUsername} />
      )}
    </div>
  );
}



export default App;
