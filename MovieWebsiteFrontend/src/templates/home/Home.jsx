import styles from './Home.module.css';
import Nav from './Nav.jsx';
import About from './About.jsx';
import { Context } from '../../App.jsx';
import Navbar from '../navbar/Navbar.jsx';
import MovieSlider from '../movie/MovieSlider.jsx';
import { useContext,useEffect,useState } from 'react';
import axios from 'axios';
import Footer from './Footer.jsx';

export default function Home()
{

    const [mode,setMode,cards,city] = useContext(Context);

    const[current,setCurrent] = useState([]);
    const[upcoming,setUpcoming] = useState([]);
    const[recommend,setRecommend] = useState([]);

    async function fetchData()
    {
        let res = await axios.get(`http://localhost:8080/api/movie/city/${city}`);
        let data = await res.data;
        setCurrent(data);
    }

    useEffect(()=>{fetchData();},[city]);
    
    if(current == [])
    {
        return(<></>)
    }
    else
    return(
        <>
            <Navbar></Navbar>
            <div className={styles.container}>

                
                <Nav cards={cards}></Nav>

                <MovieSlider heading={"Recommended Movies"} data={current}></MovieSlider>

                <MovieSlider heading={"Currently Playing"} data={current}></MovieSlider>

                <MovieSlider heading={"Upcoming Movies"} data={current}></MovieSlider>

                <About mode={mode}></About>

            </div>
            <Footer></Footer>
        </>
    )
}