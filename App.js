import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [movieName, setMovieName] = useState(0);
  const [Review, setReview] = useState('');
  const [searchActorList, setSearchActor] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [actorList, setActorList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setMovieReviewList(response.data)
    })
  },[])

  const submitReview = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      ActorId: movieName,
      ActorName: Review
    });
    
    setMovieReviewList([
      ...movieReviewList,
      {
        ActorId: movieName,
        ActorName: Review
      },
    ]);
  };

  const searchActor = () => { 
    Axios.post('http://localhost:3002/api/search', {
      ActorName: searchActorList
    }).then((response) => {setActorList(response.data)});
  };

  const findActorDirector = () => { 
    Axios.get('http://localhost:3002/api/find').then((response) => 
    {setFavList(response.data)});
  };

  const deleteReview = (ActorId) => {
    Axios.delete(`http://localhost:3002/api/delete/${ActorId}`);
  };

  const updateReview = (movieName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      ActorId: movieName,
      ActorName: newReview
    });
    setNewReview("")
  };

  return (
    <div className="App">
      <h1> CRUD APPLICATIONS</h1>

      <div className="form">
        <label> Actor Id:</label>
        <input type="text" name="movieName" onChange={(e) => {
          setMovieName(parseInt(e.target.value))
        } }/>
        <label> Actor Name:</label>
        <input type="text" name="Review" onChange={(e) => {
          setReview(e.target.value)
        }}/>
        
        <button onClick={submitReview}> Submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className = "card">
              <h1> Actor Id: {val.ActorId} </h1>
              <p>Actor Name: {val.ActorName}</p>
              <button onClick={() => { deleteReview(val.ActorId) }}> Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              } }/>
              <button onClick={() => { updateReview(val.ActorId) }}> Update</button>
              </div>
          );
          
          ;
        })}
        
        

      </div>

      <div className="form">
        <label> Search Actor Name:</label>
        <input type="text" name="searchActorList" onChange={(e) => {
          setSearchActor(e.target.value)
        }}/>
        
        <button onClick={searchActor}> Search</button>

        {actorList.map((val) => {
          return (
            <div className = "card">
              <h1> Actor Id: {val.ActorId} </h1>
              <p>Actor Name: {val.ActorName}</p>
              <button onClick={() => { deleteReview(val.ActorId) }}> Delete</button>
              <input type="text" id="updateInput" onChange={(e) => {
                setNewReview(e.target.value)
              } }/>
              <button onClick={() => { updateReview(val.ActorId) }}> Update</button>
              </div>
          );
          
          ;
        })}
      </div>

      <div className="form">

        <label>Find users' top favorite actors and directors</label>
        
        <button onClick={findActorDirector}> Find</button>

        <h2>top favorite actors and directors</h2>

        {favList.map((val) => {
          return (
            <h5>{val.Name}  {val.Count}</h5>
          );         
          ;
        })}
      </div>

      
    </div>
  );
}

export default App;
