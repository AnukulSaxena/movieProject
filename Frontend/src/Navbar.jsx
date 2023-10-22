import React, { useState } from 'react';
import './navbar.css';

function Navbar({ nIndices, nMovies }) {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
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
                    <button className="nav-button">Home</button>
                </li>
                <li className="nav-item">
                    <button className="nav-button">About</button>
                </li>
                <li className="nav-item">
                    <button className="nav-button">Contact</button>
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
