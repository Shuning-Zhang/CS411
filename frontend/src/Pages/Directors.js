import React, {useState, useEffect, isValidElement} from "react";
import Axios from 'axios';
import '../App.css';

function Directors() {
  const [directorList,setDirectorList] = useState([]);

  const SearchDirector = () => {
    Axios.get('http://localhost:3002/api/getDirector').then((response) => {
      setDirectorList(response.data);
    })
  };

  return (
  <div className="container2">
    <h1> Search Director</h1>
      <label> Find 30 Directors with Highest Rated Average Movie Ratings</label>
      <br></br>
      <button className="registerbtn" onClick={SearchDirector}>Search Director</button>
        {directorList.map((val) => {
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
  );
 }
 export default Directors;
