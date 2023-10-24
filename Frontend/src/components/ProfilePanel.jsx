import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/ProfilePanel.css';

function ProfilePanel() {
    const [WatchedMovies, setWatchedMovies] = useState([]);

    useEffect(() => {
        const userProfile = localStorage.getItem('usernameKey') || '';
        axios
            .post('/api/watchedMovies', { userProfile: userProfile })
            .then((response) => {
                setWatchedMovies(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="profile-panel">
            <div className="profile-header">
                <h2>Profile</h2>
            </div>
            <div className="profile-content">
                <div className="left-panel">
                    {/* Content for the left panel */}
                </div>
                <div className="right-panel">
                    <h3>Watched Movies:</h3>
                    <ul>
                        {WatchedMovies.map((movie, index) => (
                            <li className="list-item" key={index}>{movie.Title}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfilePanel;
