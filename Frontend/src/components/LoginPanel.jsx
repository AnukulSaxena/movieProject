import React, { useState, useEffect } from 'react';
import './../styles/LoginPanel.css';
import axios from 'axios';

function LoginPanel({ onClose, setIsUserLoggedIn, setAppUsername }) {
    const [mode, setMode] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [SignupMessage, setSignupMessage] = useState('');


    const initialIsLoggedIn = localStorage.getItem('isLoggedInKey') === 'true';
    const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

    useEffect(() => {
        localStorage.setItem('isLoggedInKey', isLoggedIn);
        console.log(isLoggedIn);
    }, [isLoggedIn]);

    const handleLogin = (e) => {
        e.preventDefault();
        const loginData = {
            username,
            password,
        };

        axios.post('/api/login', loginData)
            .then((response) => {
                console.log(response.data);
                setSignupMessage(response.data.message);
                setUsername('');
                setPassword('');
                if (response.data.message === 'Login successful') {
                    setIsLoggedIn(true);
                    setIsUserLoggedIn(true);
                    setAppUsername(username);
                }

            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        const userData = {
            username,
            password,
        };

        axios.post('/api/signup', userData)
            .then((response) => {
                setUsername('');
                setPassword('');
                setSignupMessage(response.data.message);
            })
            .catch((error) => {
                console.error('Error creating account:', error);
            });
    };

    const handleLogout = () => {
        setUsername('');
        setAppUsername(username);
        setIsLoggedIn(false);
        setIsUserLoggedIn(false);

    };

    const handleModeChange = (e) => {

        e.preventDefault();
        if (mode === 'login') {
            setMode('signup');
        } else {
            setMode('login');
            setSignupMessage('');
        }
    };

    return (
        <div className="login-panel">
            <div className="login-panel-content">
                <h2>{mode === 'login' ? 'Login' : 'Signup'}</h2>
                <p className="user-exists-message">{SignupMessage}</p>
                {(!isLoggedIn) && <form>
                    <div className="form-group">
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
                    <div className="button-group">
                        {mode === 'login' ? (
                            <button className="login-button btn-grp" onClick={handleLogin}>Login</button>
                        ) : (
                            <button className="create-account-button btn-grp" onClick={handleSignup}>Create Account</button>
                        )}
                        <button className="signup-button btn-grp" onClick={handleModeChange}>
                            Switch to {mode === 'login' ? 'Signup' : 'Login'}
                        </button>
                    </div>
                </form>}
                {isLoggedIn && (
                    <button className="logout-button btn-grp" onClick={handleLogout}>
                        Logout
                    </button>
                )}
                <button className="close-button btn-grp" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
}

export default LoginPanel;
