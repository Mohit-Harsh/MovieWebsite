import { useState, useEffect } from 'react'
import Home from './templates/home/Home'
import {Routes, Route} from "react-router-dom";
import Movie from './templates/movie/Movie';
import Footer from './templates/home/Footer';
import Movielist from './templates/movie/Movielist';
import * as React from 'react';
import apes from './assets/apes.jpg';
import dvsw from './assets/dvsw.jpg';
import kalki from './assets/kalki.jpg';
import mufasa from './assets/mufasa.jpeg';
import panda from './assets/panda.jpg';
import topgun from './assets/topgun.jpg';
import furiosa from './assets/furiosa.jpg';
import borderlands from './assets/borderlands.jpg';
import apes_wide from './assets/apes-wide.jpg';
import dvsw_wide from './assets/dvsw-wide.jpg';
import kalki_wide from './assets/kalki-wide.jpg';
import panda_wide from './assets/panda-wide.jpg';
import mufasa_wide from './assets/mufasa-wide.jpg';
import topgun_wide from './assets/topgun-wide.jpg';
import furiosa_wide from './assets/furiosa-wide.jpg';
import borderlands_wide from './assets/borderlands-wide.jpg';

import axios from 'axios';
import Shows from './templates/shows/Shows';
import Seats from './templates/seats/Seats';
import Navbar from './templates/navbar/Navbar';
import Login from './templates/login/Login';


export const Context = React.createContext();

function App() {

  const [mode,setMode] = useState(true);
  const [city,setCity] = useState('Hyderabad');
  const [movies,setMovies] = useState([])
  const [uid,setUid] = useState("");

  const [recommended,setRecommended] = useState([]);
    
  useEffect(()=>{fetchRecom();},[uid]);

  async function fetchRecom()
  {
      let res = await axios.get(`http://localhost:8080/api/recommendation/user/${uid}`);
      let d = await res.data;
      setRecommended(d);
  }


  const cards = [{'id':1,'title':"Planet Of The Apes",'image':apes,'image_wide':apes_wide},
    {'id':2,'title':"Deadpool vs Wolverine",'image':dvsw,'image_wide':dvsw_wide},{'id':3,'title':"Kalki 2898 AD",'image':kalki,'image_wide':kalki_wide},
    {'id':4,'title':"Top Gun Maverick",'image':topgun,'image_wide':topgun_wide},{'id':5,'title':"Mufasa The Lion King",'image':mufasa,'image_wide':mufasa_wide},
    {'id':6,'title':"Kungfu Panda 4",'image':panda,'image_wide':panda_wide},{'id':7,'title':"Furiosa: A Mad Max Tale",'image':furiosa,'image_wide':furiosa_wide},
    {'id':8,'title':"Borderlands",'image':borderlands,'image_wide':borderlands_wide},{'id':9,'title':"Planet Of The Apes",'image':apes,'image_wide':apes_wide},
    {'id':10,'title':"Deadpool vs Wolverine",'image':dvsw,'image_wide':dvsw_wide},{'id':11,'title':"Kalki 2898 AD",'image':kalki,'image_wide':kalki_wide},
    {'id':12,'title':"Top Gun Maverick",'image':topgun,'image_wide':topgun_wide},{'id':13,'title':"Mufasa The Lion King",'image':mufasa,'image_wide':mufasa_wide},
    {'id':14,'title':"Kungfu Panda 4",'image':panda,'image_wide':panda_wide},{'id':15,'title':"Furiosa: A Mad Max Tale",'image':furiosa,'image_wide':furiosa_wide}];

  if(uid == "")
  {
    return(<>
        <Login setUid={setUid}></Login>      
    </>)
  }
  else
  {
    console.log(uid);
    return (
      <>
      <Context.Provider value={[mode,setMode,cards,city,setCity,movies,setMovies]}>
        <Routes>
          <Route path='/'>
            <Route index element={<Home uid={uid} recommended={recommended}/>}/>
            <Route path='movie/:name' element={<Movie uid={uid}/>}/>
            <Route path='current' element={<Movielist heading={'current'} />}/>
            <Route path='recommend' element={<Movielist heading={'current'} />}/>
            <Route path='upcoming' element={<Movielist heading={'current'} />}/>
            <Route path='book/:movie'>
              <Route index element={<Shows/>} />
              <Route path='seats' element={<Seats uid={uid}/>}/>
            </Route>
          </Route>
        </Routes>
      </Context.Provider>
      </>
    )
  }
}

export default App
