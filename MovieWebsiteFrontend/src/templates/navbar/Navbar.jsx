import { useContext } from 'react';
import styles from './Navbar.module.css';
import { Context } from '../../App';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import logob from '../../assets/logo-black.png';
import ModeSwitch from '../../ModeSwitch';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Dropdown from '../dropdown/Dropdown';
import axios from 'axios';

export default function Navbar()
{

    const [mode,setMode,cards,city,setCity,movies,setMovies] = useContext(Context);


    function handleClick(event)
    {
        document.getElementById('search').value = "";
        setMovies([]);
    }

    async function handleChange(event)
    {
        let title = event.target.value;
        if(title == '')
        {
            document.getElementById('search').value = "";
            setMovies([]);
        }
        else
        {
            let data = await axios.get(`http://localhost:8080/api/movie/search/${title}`);
            let res = await data.data;
            console.log(res);
            setMovies(res);
        }
    }

    return(<>
        <div  className={styles.nav} style={{backgroundColor:mode?'rgb(28,28,28)':'whitesmoke'}}>
        <Link to={"/"}><img src={mode?logo:logob} alt="" className={styles.logo}/></Link>
        <div id='search_div' style={{display:'flex',position:'relative',justifyContent:'center',alignItems:'center',color:'gray'}}>
          <SearchRoundedIcon style={{position:'absolute',left:'30px',width:'20px',height:'auto',zIndex:1}}/>
          <div className={styles.search_div} style={{position:'relative'}}>
            <input onChange={handleChange} id='search' type="search" placeholder='Search for movies and theatres' className={styles.search} style={{color:mode?'white':'black',backgroundColor:mode?'rgb(38,38,38)':'white'}}/>
            <ul id="nav_search_list" className={styles.searchlist} style={{position:'absolute',backgroundColor:mode?'rgb(38,38,38)':'white',width:'100%'}}>
              {movies.map((item,key)=><li key={key} onClick={handleClick}><Link className={styles.search_link} key={key} to={`/movie/${item['title']}`} state={item}><i>{item['title']}</i></Link></li>)}
            </ul>
          </div>
          <Dropdown options={['Movie','Theatre']} name={'search'}></Dropdown>
        </div>
        <div style={{display:'flex',marginLeft:'auto'}}>
          <Dropdown options={['Hyderabad','Bengaluru','Mumbai','Chennai']} name={'location'} setCity={setCity}></Dropdown>
        </div>
        <ModeSwitch mode={mode} setMode={setMode}></ModeSwitch>
      </div>
    </>)
}