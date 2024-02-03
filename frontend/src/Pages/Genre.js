import React, {useState, useEffect, isValidElement} from "react";
import Axios from 'axios';
import '../App.css';

function Genre() {
  const [searchName, setSearchName] = useState('');
  const [movieList, setMovieList] = useState([]);
  // const [actorList,setActorList] = useState([]);


  const SearchMovie = () => {
      
      Axios.post(`http://localhost:3002/api/postSearch`, {
        MovieGenre: searchName,

      }).then((response) => {
        // console.log(response);
        setMovieList(response.data);
      });
    };

  return (
  <div className="container2">
    <h1> Search Genre</h1>
      <label> Genre Name: </label>
      <input type="text" name="movieLanSearch" onChange = {(e) => {setSearchName(e.target.value)}}/>
      <button className="registerbtn" onClick={SearchMovie}> Search </button>
      {movieList.map((val) => {
              return (
                <div className = "card_actor">
                  <h1>Movie Name: {val.movieName}</h1>
                  <p>Movie Language: {val.language}</p>
                  <p>Plot Intro: {val.PlotIntro}</p>
                  <p>Movie Runtime: {val.runtime}</p>
                  <p>Average Rating: {val.avgRating}</p>
                  </div>
                );
              ;
            })}
  </div>
  );
 }
 export default Genre;