import React, { useState } from 'react';
import './../styles/navbar.css';
import ProfilePanel from './ProfilePanel';

function Navbar({ nIndices, nMovies, onPageChange, onLoginClick, isUserLoggedIn }) {
    const [isSelectPanelOpen, setIsSelectPanelOpen] = useState(false);
    const [isProfilePanelOPen, setIsProfilePanelOpen] = useState(false);

    const toggleSelectPanel = () => {
        setIsSelectPanelOpen(!isSelectPanelOpen);
    };

    const toggleProfilePanel = () => {
        console.log(isProfilePanelOPen);
        setIsProfilePanelOpen(!isProfilePanelOPen);
    }

    const handleHomeClick = () => {
        onPageChange(0);
    };



    return (
        <nav className="horizontal-navbar">

            <ul className="nav-list">
                <li className="nav-item">
                    <button className="nav-button" onClick={toggleSelectPanel}>
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
                {isUserLoggedIn && (
                    <li className="nav-item">
                        <button className="nav-button" onClick={toggleProfilePanel}>
                            Profile
                        </button>
                    </li>
                )}
            </ul>

            {isSelectPanelOpen && (
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

            {isProfilePanelOPen && <ProfilePanel />

            }
        </nav>
    );
}

export default Navbar;
