import styles from './Home.module.css';
import Nav from './Nav.jsx';
import About from './About.jsx';
import { Context } from '../../App.jsx';
import Navbar from '../navbar/Navbar.jsx';
import MovieSlider from '../movie/MovieSlider.jsx';
import { useContext,useEffect,useState } from 'react';
import axios from 'axios';
import Footer from './Footer.jsx';

export default function Home({uid,recommended})
{

    const [mode,setMode,cards,city] = useContext(Context);

    const [data,setData] = useState({current:[],upcoming:[]});

    async function fetchData()
    {
        let res = await axios.get(`http://localhost:8080/api/movie/city/${city}`);
        let d = await res.data;
        setData({current:d,upcoming:d});
    }

    useEffect(()=>{fetchData();},[city]);
    
    if(data.current == [])
    {
        return(<></>)
    }
    else
    return(
        <>
            <Navbar></Navbar>
            <div className={styles.container}>

                
                <Nav cards={cards}></Nav>

                <MovieSlider heading={"Recommended Movies"} data={recommended}></MovieSlider>

                <MovieSlider heading={"Currently Playing"} data={data.current}></MovieSlider>

                <MovieSlider heading={"Upcoming Movies"} data={data.upcoming}></MovieSlider>

                <About mode={mode}></About>

            </div>
            <Footer></Footer>
        </>
    )
}