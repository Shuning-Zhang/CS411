import React from 'react';
//import { useParams, useHistory } from 'react-router-dom';
import '../App.css';

function Navbar() {
    return (
        <div className="Navbar">
            <div className="leftSide">
                <div className="leftLinks">
                    <a href='/user/:UserId'>Profile</a>
                    <a href="/movies">Movies</a>
                    <a href="/genre">Genre</a>
                    <a href="/actors">Actors</a>
                    <a href="/directors">Directors</a>
                    <a href="/search">Recommender</a>
                </div>
            </div>
            <div className="rightSide">
                <div className="rightLinks">
                </div>
            </div>
        </div>
    )
}

export default Navbar;