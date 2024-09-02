import { useState } from 'react'
import Home from './templates/home/Home'
import {Routes, Route} from "react-router-dom";
import styles from './App.module.css'
import Movie from './templates/movie/Movie';
import logo from './assets/logo.png';
import logob from './assets/logo-black.png'
import Footer from './templates/home/Footer';
import { Link } from 'react-router-dom';
import ModeSwitch from './ModeSwitch';
import Movielist from './templates/movie/Movielist';
import * as React from 'react';
import Dropdown from './templates/dropdown/Dropdown';
import apes from './assets/apes.jpg';
import dvsw from './assets/dvsw.jpg';
import kalki from './assets/kalki.jpg';
import mufasa from './assets/mufasa.jpeg';
import panda from './assets/panda.jpg';
import topgun from './assets/topgun.jpg';
import furiosa from './assets/furiosa.jpg';
import borderlands from './assets/borderlands.jpg';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import apes_wide from './assets/apes-wide.jpg';
import dvsw_wide from './assets/dvsw-wide.jpg';
import kalki_wide from './assets/kalki-wide.jpg';
import panda_wide from './assets/panda-wide.jpg';
import mufasa_wide from './assets/mufasa-wide.jpg';
import topgun_wide from './assets/topgun-wide.jpg';
import furiosa_wide from './assets/furiosa-wide.jpg';
import borderlands_wide from './assets/borderlands-wide.jpg';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';



export const Context = React.createContext();

function App() {

  const [mode,setMode] = useState(true);

  const [movies,setMovies] = useState([])

  console.log(movies);

  function handleClick(event)
  {
    document.getElementById('search').value = "";
    setMovies([]);
  }

  function handleChange(event)
  {
    console.log(event);
    let new_movies = [];
    for(let card of cards)
    {
      if(event.target.value!='' && card['title'].includes(event.target.value) == true)
      {
        new_movies.push(card);
      }
      setMovies(new_movies);
    }
  }

  const cards = [{'id':1,'title':"Planet Of The Apes",'image':apes,'image_wide':apes_wide},
    {'id':2,'title':"Deadpool vs Wolverine",'image':dvsw,'image_wide':dvsw_wide},{'id':3,'title':"Kalki 2898 AD",'image':kalki,'image_wide':kalki_wide},
    {'id':4,'title':"Top Gun Maverick",'image':topgun,'image_wide':topgun_wide},{'id':5,'title':"Mufasa The Lion King",'image':mufasa,'image_wide':mufasa_wide},
    {'id':6,'title':"Kungfu Panda 4",'image':panda,'image_wide':panda_wide},{'id':7,'title':"Furiosa: A Mad Max Tale",'image':furiosa,'image_wide':furiosa_wide},
    {'id':8,'title':"Borderlands",'image':borderlands,'image_wide':borderlands_wide},{'id':9,'title':"Planet Of The Apes",'image':apes,'image_wide':apes_wide},
    {'id':10,'title':"Deadpool vs Wolverine",'image':dvsw,'image_wide':dvsw_wide},{'id':11,'title':"Kalki 2898 AD",'image':kalki,'image_wide':kalki_wide},
    {'id':12,'title':"Top Gun Maverick",'image':topgun,'image_wide':topgun_wide},{'id':13,'title':"Mufasa The Lion King",'image':mufasa,'image_wide':mufasa_wide},
    {'id':14,'title':"Kungfu Panda 4",'image':panda,'image_wide':panda_wide},{'id':15,'title':"Furiosa: A Mad Max Tale",'image':furiosa,'image_wide':furiosa_wide}];

  return (
    <>
    <Context.Provider value={[mode,setMode,cards]}>
      <div className={styles.nav} style={{backgroundColor:mode?'rgb(28,28,28)':'whitesmoke'}}>
        <Link to={"/"}><img src={mode?logo:logob} alt="" className={styles.logo}/></Link>
        <div style={{display:'flex',position:'relative',justifyContent:'center',alignItems:'center',color:'gray'}}>
          <SearchRoundedIcon style={{position:'absolute',left:'30px',width:'20px',height:'auto',zIndex:1}}/>
          <div className={styles.search_div} style={{position:'relative'}}>
            <input onChange={handleChange} id='search' type="search" placeholder='Search for movies and theatres' className={styles.search} style={{color:mode?'white':'black',backgroundColor:mode?'rgb(38,38,38)':'white'}}/>
            <ul id="nav_search_list" className={styles.searchlist} style={{position:'absolute',backgroundColor:mode?'rgb(38,38,38)':'white',width:'100%'}}>
              {movies.map((item,key)=><li key={key} onClick={handleClick}><Link className={styles.search_link} key={key} to={`/movie/${item['title']}`} state={item}><i>{item['title']}</i></Link></li>)}
            </ul>
          </div>
          <Dropdown options={['Movie','Theatre']} mode={mode} name={'search'}></Dropdown>
        </div>
        
        <button id='location' className={styles.location} style={{color:mode?'white':'black',display:'flex',justifyContent:'center',alignItems:'center'}}>Location <ArrowDropDownIcon/></button>
        <ModeSwitch mode={mode} setMode={setMode}></ModeSwitch>
      </div>
      
          <Routes>
            <Route path='/'>
              <Route index element={<Home/>}/>
              <Route path='movie/:name' element={<Movie/>}/>
              <Route path='current' element={<Movielist heading={'current'} />}/>
              <Route path='recommend' element={<Movielist heading={'current'} />}/>
              <Route path='upcoming' element={<Movielist heading={'current'} />}/>
            </Route>
          </Routes>
          <Footer></Footer>
    </Context.Provider>
    </>
  )
}

export default App
