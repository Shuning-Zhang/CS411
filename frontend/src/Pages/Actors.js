import React, {useState, useEffect, isValidElement} from "react";
import Axios from 'axios';
import '../App.css';

function Actors() {
  const [actorList,setActorList] = useState([]);

  const SearchActor = () => {
    Axios.get('http://localhost:3002/api/getActor').then((response) => {
        setActorList(response.data);
    })
  };

  return (
  <div className="container2">
    <h1> Search Actors</h1>
      <label> Find 30 Actors with Highest Rated Average Movie Ratings</label>
      <br></br>
      <button className="registerbtn" onClick={SearchActor}>Search Actor</button>
        {actorList.map((val) => {
          return (
            <div className = "card_lan">
              <p>Actor Name: {val.ActorName}</p>
              <p>Average Rating: {val.ave}</p>
              <br></br>
              </div>
            );
        })}
  </div>
  );
 }
 export default Actors;
