import React, {useState, useEffect, isValidElement} from "react";
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function User() {
  const [movieId, setMovieId] = useState('');
  const [language, setLanguage] = useState('');
  const [plotIntro, setPlotIntro] = useState('');
  const [runtime, setRuntime] = useState('');
  const [newName, setNewName] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [newDirector, setNewDirector] = useState('');
  const [newActor, setNewActor] = useState('');

  let {UserId} = useParams();
   
  // useEffect(() => {
  //   Axios.get('http://localhost:3002/api/getUser').then((response) => {
  //     setMovieList(response.data)
  //   })
  // },[])
  const submitMovie = () => {
    Axios.post('http://localhost:3002/api/insertUser', {
      UserId: UserId,
      Fav_Movie: language,
      Fav_Director: plotIntro,
      Fav_Actor: runtime,
    }).then(()=> {
          alert('success submit!')
    });

    // setMovieList([
    //   ...movieList,
    //   {
    //     UserId: UserId,
    //     Fav_Movie: language,
    //     Fav_Director: plotIntro,
    //     Fav_Actor: runtime,
    //   },
    // ]);
  };

  const showFav = () => {
    Axios.post(`http://localhost:3002/api/postSearchFav`, {
        UserId: UserId,

      }).then((response) => {
        // console.log(response);
        setMovieList(response.data);
      });
  };

  const deleteMovie = (UserId) => {
    Axios.delete(`http://localhost:3002/api/deleteUser/${UserId}`);
  };

  const updateMovie = (MovieId) => {
    Axios.put(`http://localhost:3002/api/updateUser`, {
      UserId: MovieId,
      Fav_Movie: newName,
    });
  };
  const updateDirector = (MovieId) => {
    Axios.put(`http://localhost:3002/api/updateDirector`, {
      UserId: MovieId,
      Fav_Director: newDirector,
    });
  };
  const updateActor = (MovieId) => {
    Axios.put(`http://localhost:3002/api/updateActor`, {
      UserId: MovieId,
      Fav_Actor: newActor,
    });
  };

  return (
  <div className="container2">
    <h1>Welcome {UserId}!</h1>
    <h2> My Favorite</h2>
      {/* <label> User ID:</label>
      <input type="text" name="userId" onChange = {(e) => {setMovieId(e.target.value)}}/> */}
      <label> Favorite Movie:</label>
      <input type="text" name="fav_movie" onChange = {(e) => {setLanguage(e.target.value)}}/>
      <label> Favorite Director:</label>
      <input type="text" name="fav_director" onChange = {(e) => {setPlotIntro(e.target.value)}}/>
      <label> Favorite Actor:</label>
      <input type="text" name="runtime" onChange = {(e) => {setRuntime(e.target.value)}}/>
      <button className="registerbtn" onClick={submitMovie}> Submit</button>

      <h2>Favorite List</h2>
      <button className="registerbtn" onClick={showFav}> Show Favorite</button>

      {movieList.map((val) => {
          return (
            <div className = "card">
              {/* <h1> Movie ID: {val.} </h1> */}
              <p>Movie Name: {val.Fav_Movie}</p>
              {/* <p>Director: {val.Fav_Director}</p>
              <p>Actor: {val.Fav_Actor}</p> */}
              {/* <button onClick={() => { deleteMovie(val.UserId) }}> Delete</button> */}
              <input type="text" name="updateName" onChange={(e) => {setNewName(e.target.value)} }/>
              <button className="registerbtn" onClick={() => { updateMovie(val.UserId) }}> Update</button>

              <p>Director: {val.Fav_Director}</p>
              <input type="text" name="updateDirector" onChange={(e) => {setNewDirector(e.target.value)} }/>
              <button className="registerbtn" onClick={() => { updateDirector(val.UserId) }}> Update</button>

              <p>Actor: {val.Fav_Actor}</p>
              <input type="text" name="updateActor" onChange={(e) => {setNewActor(e.target.value)} }/>
              <button className="registerbtn" onClick={() => { updateActor(val.UserId) }}> Update</button>
              <br></br>
              <br></br>
              <button className="registerbtn" onClick={() => { deleteMovie(val.UserId) }}> Delete</button>
              </div>
            );
          ;
        })}

  </div>
  );
 }
 export default User;
