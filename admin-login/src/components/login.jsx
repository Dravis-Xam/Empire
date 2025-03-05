import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!username || !password) {
            setMessage('Please fill in all fields.');
            return;
        }

        if (isLoading) return; // Prevent multiple submissions

        setIsLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Login successful! Redirecting...');
                navigate('/admin'); // Redirect to admin page
            } else {
                setMessage(data.message || 'Invalid username or password');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Admin Login</h2>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                            aria-describedby="username-help"
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                            aria-describedby="password-help"
                        />
                    </div>
                    <button type="submit" disabled={isLoading} aria-busy={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="forgot-password">
                    <a href="#" aria-label="Forgot password?">
                        Forgot Password?
                    </a>
                </p>
                {message && (
                    <p id="message" role="alert">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;