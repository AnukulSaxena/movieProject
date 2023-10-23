import React, { useState } from 'react';
import './../styles/LoginPanel.css';
import axios from 'axios';

function LoginPanel({ onClose }) {
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userExists, setUserExists] = useState(false);

    const handleLogin = (e) => {
        // Handle login logic here
        e.preventDefault();
        console.log('Logging in with Username:', username, 'and Password:', password);
    };

    const handleSignup = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Prepare the data to be sent to the server
        const userData = {
            username,
            password,
        };

        // Make an Axios POST request to the server
        axios.post('/api/signup', userData)
            .then((response) => {
                // Handle the response from the server
                console.log('Account created:', response.data);
                // Optionally, you can reset the form fields here
                setUsername('');
                setPassword('');
                setUserExists(false); // Reset the userExists state
            })
            .catch((error) => {
                console.error('Error creating account:', error);
                setUserExists(true); // Set userExists to true if the user already exists
            });
    };

    const handleModeChange = () => {
        if (mode === 'login') {
            setMode('signup');
        } else {
            setMode('login');
        }
    };

    return (
        <div className="login-panel">
            <div className="login-panel-content">
                <h2>{mode === 'login' ? 'Login' : 'Signup'}</h2>
                {userExists && <p className="user-exists-message">User already exists. Please choose a different username.</p>}
                <form>
                    <div className="form-group ">
                        <label htmlFor="username">{mode === 'login' ? 'Username' : 'Create Username'}:</label>
                        <input
                            className='inputbtn'
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">{mode === 'login' ? 'Password' : 'Create Password'}:</label>
                        <input
                            className='inputbtn'
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {mode === 'login' ? (
                        <div className="button-group">
                            <button className="login-button" onClick={handleLogin}>Login</button>
                            <button className="signup-button" onClick={handleModeChange}>Switch to Signup</button>
                        </div>
                    ) : (
                        <div className="button-group">
                            <button className="create-account-button" onClick={handleSignup}>Create Account</button>
                        </div>
                    )}
                </form>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default LoginPanel;
