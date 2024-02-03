import React, {useState, useEffect, isValidElement} from "react";
import Axios from 'axios';
import '../App.css';

function Movies() {
  const [searchLan, setSearchLan] = useState(0);
  const [movieLanList, setMovieLanList] = useState([]);
  // const [actorList,setActorList] = useState([]);


  const SearchMovie = () => {
      
      Axios.post(`http://localhost:3002/api/post`, {
        MovieId: searchLan,

      }).then((response) => {
        // console.log(response);
        setMovieLanList(response.data);
      });
    };
  // const Favorite 

  return (
  <div className="container2">
    <h1> Search Movie</h1>
      <label> Movie Id: </label>
      <input type="number" name="movieLanSearch" onChange = {(e) => {setSearchLan(e.target.value)}}/>
      <button className="registerbtn" onClick={SearchMovie}> Search </button>
      {movieLanList.map((val) => {
              return (
                <div className = "card_actor">
                  {/* <h1> Movie ID: {val.movieId} </h1> */}
                  <h1>Movie Name: {val.movieName}</h1>
                  <p>Movie Language: {val.language}</p>
                  <p>Plot Intro: {val.PlotIntro}</p>
                  <p>Movie Runtime: {val.runtime}</p>
                  </div>
                );
              ;
            })}

    {/* <div class = "Search Best Actors">
      <label> Find 15 Directors with Highest Rated Average Movie Ratings</label>
      <button onClick={SearchActor}>Search Director</button>
      <div class = "actors">
        <label> 15 Top Rated Directors</label>
        {actorList.map((val) => {
          return (
            <div className = "card_lan">
              <p>Director Name: {val.DirectorName}</p>
              <p>Average Rating: {val.ave}</p>
              <br></br>
              </div>
            );
          ;
        })}
        </div>
      </div> */}
  </div>

  
  );
 }
 export default Movies;
