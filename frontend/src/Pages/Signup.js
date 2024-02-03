import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    let history = useHistory();

    const register = (username) => {
        Axios.post('http://localhost:3002/api/signup', {
            UserId: username,
            Password: password
        });
        
        history.push(`/user/${username}`);
    };

    return (
        <div className="container">
            <h1>Find you a movie!</h1>
            <p></p>
            <label>Username:</label>
            <input type="text" name="username" onChange={(e) => {
                setUsername(e.target.value)} }/>
            <label>Password:</label>
            <input type="text" name="password" onChange={(e) => {
                setPassword(e.target.value)}}/>
            <p>Already have an account? <a href="/login">Log in</a>.</p>
            <button className="registerbtn" onClick={() => { register(username)} }>Sign up</button>
        </div>

    );
}

export default Signup;

