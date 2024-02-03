import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Navbar from './Components/Navbar'
import Movies from './Pages/Movies';
import Genre from './Pages/Genre';
import User from './Pages/User';
import Directors from './Pages/Directors';
import Actors from './Pages/Actors';
import Search from './Pages/Search';

function App() {
  // const [movieName, setMovieName] = useState(0);
  // const [Review, setReview] = useState('');
  // const [searchActorList, setSearchActor] = useState('');
  // const [movieReviewList, setMovieReviewList] = useState([]);
  // const [actorList, setActorList] = useState([]);
  // const [favList, setFavList] = useState([]);
  // const [newReview, setNewReview] = useState("");

  // useEffect(() => {
  //   Axios.get('http://localhost:3002/api/get').then((response) => {
  //     setMovieReviewList(response.data)
  //   })
  // },[])

  // const submitReview = () => { 
  //   Axios.post('http://localhost:3002/api/insert', {
  //     ActorId: movieName,
  //     ActorName: Review
  //   });
    
  //   setMovieReviewList([
  //     ...movieReviewList,
  //     {
  //       ActorId: movieName,
  //       ActorName: Review
  //     },
  //   ]);
  // };

  // const searchActor = () => { 
  //   Axios.post('http://localhost:3002/api/search', {
  //     ActorName: searchActorList
  //   }).then((response) => {setActorList(response.data)});
  // };

  // const findActorDirector = () => { 
  //   Axios.get('http://localhost:3002/api/find').then((response) => 
  //   {setFavList(response.data)});
  // };

  // const deleteReview = (ActorId) => {
  //   Axios.delete(`http://localhost:3002/api/delete/${ActorId}`);
  // };

  // const updateReview = (movieName) => {
  //   Axios.put(`http://localhost:3002/api/update`, {
  //     ActorId: movieName,
  //     ActorName: newReview
  //   });
  //   setNewReview("")
  // };

  return (    
      <Router>
        <Switch>
          <Route path="/" exact component={Signup} />
          <Route path="/login" exact component={Login} />

          <>
            <Navbar />
            <Route path="/movies" exact component={Movies} />
            <Route path="/actors" exact component={Actors} />
            <Route path="/directors" exact component={Directors} />
            <Route path="/genre" exact component={Genre} />
            <Route path="/search" exact component={Search} />
            <Route path="/user/:UserId" component={User} />
          </>      
          
        </Switch>
      </Router>


    // <div className="App">
    //   <h1> CRUD APPLICATIONS</h1>

    //   <div className="form">
    //     <label> Actor Id:</label>
    //     <input type="text" name="movieName" onChange={(e) => {
    //       setMovieName(parseInt(e.target.value))
    //     } }/>
    //     <label> Actor Name:</label>
    //     <input type="text" name="Review" onChange={(e) => {
    //       setReview(e.target.value)
    //     }}/>
        
    //     <button onClick={submitReview}> Submit</button>

    //     {movieReviewList.map((val) => {
    //       return (
    //         <div className = "card">
    //           <h1> Actor Id: {val.ActorId} </h1>
    //           <p>Actor Name: {val.ActorName}</p>
    //           <button onClick={() => { deleteReview(val.ActorId) }}> Delete</button>
    //           <input type="text" id="updateInput" onChange={(e) => {
    //             setNewReview(e.target.value)
    //           } }/>
    //           <button onClick={() => { updateReview(val.ActorId) }}> Update</button>
    //           </div>
    //       );
          
    //       ;
    //     })}
        
        

    //   </div>

    //   <div className="form">
    //     <label> Search Actor Name:</label>
    //     <input type="text" name="searchActorList" onChange={(e) => {
    //       setSearchActor(e.target.value)
    //     }}/>
        
    //     <button onClick={searchActor}> Search</button>

    //     {actorList.map((val) => {
    //       return (
    //         <div className = "card">
    //           <h1> Actor Id: {val.ActorId} </h1>
    //           <p>Actor Name: {val.ActorName}</p>
    //           <button onClick={() => { deleteReview(val.ActorId) }}> Delete</button>
    //           <input type="text" id="updateInput" onChange={(e) => {
    //             setNewReview(e.target.value)
    //           } }/>
    //           <button onClick={() => { updateReview(val.ActorId) }}> Update</button>
    //           </div>
    //       );
          
    //       ;
    //     })}
    //   </div>

    //   <div className="form">

    //     <h2>Find top 15 favorite actors and directors</h2>
        
    //     <button onClick={findActorDirector}> Find</button>

    //     <table>
    //           <tr>
    //             <th>Name</th>
    //             <th>Count</th>
    //           </tr>
    //     {favList.map((val) => {
    //       return ( 
    //           <tr>
    //             <td>{val.Name}</td>
    //             <td>{val.Count}</td>
    //           </tr>
        
    //       );      

    //       ;
    //     })}
    //     </table>
    //   </div>

      
    // </div>
  );
}

export default App;
