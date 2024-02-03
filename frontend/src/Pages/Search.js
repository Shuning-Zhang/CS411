import React, {useState, useEffect, isValidElement} from "react";
import Axios from 'axios';
import '../App.css';

function Search() {
    const [movieLang, setLang] = useState('');
    const [movieTime, setTime] = useState(0);
    const [movieRating, setRating] = useState(0.0);
    const [movieGenre, setGenre] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [directorList, setDirectorList] = useState([]);
    const [actorList, setActorList] = useState([]);

    const recommend = () => {
      
        Axios.post(`http://localhost:3002/api/recommend`, {
            language: movieLang,
            runtime: movieTime,
            avgRating: movieRating,
            GenreType: movieGenre
        }).then(()=> {
          alert('success submit!')
    });

      };
    
    const getMovie = () => {
      
        Axios.get(`http://localhost:3002/api/getRecommMovie`).then((response) => {setMovieList(response.data)});

      };

    const getActor = () => {
      
        Axios.get(`http://localhost:3002/api/getRecommActor`).then((response) => {setActorList(response.data)});

      };
    
    const getDirector = () => {
      
        Axios.get(`http://localhost:3002/api/getRecommDirector`).then((response) => {setDirectorList(response.data)});

      };

    return(
        <div className="container2">
        <h1>Movie Recommender</h1>
        <p>Please answer the following questions.</p>
        <p>We will give you some recommendations based on your preferences.</p>
        <br></br>
        <br></br>
        <label>Language (e.g. en):</label>
        <input type="text" name="movieLang" onChange = {(e) => {setLang(e.target.value)}}/>
        <label>Runtime less than (if you don't care, please put 1000):</label>
        <input type="number" name="movieTime" onChange = {(e) => {setTime(e.target.value)}}/>
        <label>Rating greater than (if you don't care, please put 0):</label>
        <input type="number" name="movieRating" onChange = {(e) => {setRating(e.target.value)}}/>
        <label>Your favorite genre (e.g. Action, Adventure, Comedy; you can leave this empty if you don't have one):</label>
        <input type="text" name="movieGenre" onChange = {(e) => {setGenre(e.target.value)}}/>
        <button className="registerbtn" onClick={recommend}> Submit </button>
        <br></br>
        <br></br>
        <button className="registerbtn" onClick={getMovie}> See my recommend movies </button>
        {movieList.map((val) => {
              return (
                <div className = "card_actor">
                  <p>Movie Id: {val.movieId}</p>
                  <p>Movie Name: {val.movieName}</p>
                  </div>
                );
              ;
            })}

        <br></br>
        <br></br>
        <button className="registerbtn" onClick={getActor}> See my recommend actors </button>
        {actorList.map((val) => {
              return (
                <div className = "card_actor">
                  <p>Actor Name: {val.actorName}</p>
                  <p>Average Rating: {val.avgRating}</p>
                  </div>
                );
              ;
            })}
        
        <br></br>
        <br></br>
        <button className="registerbtn" onClick={getDirector}> See my recommend directors </button>
        {directorList.map((val) => {
              return (
                <div className = "card_actor">
                  <p>Director Name: {val.directorName}</p>
                  <p>Average Rating: {val.avgRating}</p>
                  </div>
                );
              ;
            })}

        </div>
    );
}

export default Search;