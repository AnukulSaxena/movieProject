import React from 'react';
import './../styles/LoginPanel.css';

function LoginPanel({ onClose }) {
    return (
        <div className="login-panel">
            <div className="login-panel-content">
                {/* Add your login/signup form or content here */}
                <h2>Login/SignUp</h2>
                {/* Add your form fields, buttons, etc. here */}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default LoginPanel;
