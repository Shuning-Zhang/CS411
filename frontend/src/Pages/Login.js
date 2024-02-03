import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import '../App.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkUser, setCheckUser] = useState(true);

    let history = useHistory();

    const signin = (username) => {
        Axios.post('http://localhost:3002/api/login', {
            UserId: username,
            Password: password
        }).then((response) => {setCheckUser(response.data)});

        if (!checkUser) {

        }
        
        history.push(`/user/${username}`);
    };

    return (
        <div className="container">
            <h1>Welcome back!</h1>

            <label>Username:</label>
            <input type="text" name="username" onChange={(e) => {
                setUsername(e.target.value)} }/>
            <label>Password:</label>
            <input type="text" name="password" onChange={(e) => {
                setPassword(e.target.value)}}/>
            <button className="registerbtn" onClick={() => { signin(username) }}>Log in</button>
        </div>
    )
}

export default Login;