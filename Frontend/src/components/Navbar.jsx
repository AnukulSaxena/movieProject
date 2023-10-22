import React, { useState } from 'react';
import './../styles/navbar.css';

function Navbar({ nIndices, nMovies, onPageChange, onLoginClick }) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    const handleHomeClick = () => {
        // Call the onPageChange function from the parent component (App) with the new page number (0)
        onPageChange(0);
    };

    return (
        <nav className="horizontal-navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <button className="nav-button" onClick={togglePanel}>
                        Selected
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-button" onClick={handleHomeClick}>
                        Home
                    </button>
                </li>
                <li className="nav-item">
                    <button className="nav-button" onClick={onLoginClick}>
                        Login/SignUp
                    </button>
                </li>
            </ul>
            {isPanelOpen && (
                <div className="side-panel">
                    <h2>Selected Movies</h2>
                    <ul>
                        {console.log(nIndices)}
                        {nIndices.map((ind, index) => (
                            <li key={index}>
                                <p>{nMovies[ind].Title}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
