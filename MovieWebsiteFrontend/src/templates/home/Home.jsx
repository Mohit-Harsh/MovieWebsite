import styles from './Home.module.css';
import Nav from './Nav.jsx';
import About from './About.jsx';
import { Context } from '../../App.jsx';

import MovieSlider from '../movie/MovieSlider.jsx';
import { useContext } from 'react';

export default function Home()
{

    const [mode,setMode,cards] = useContext(Context);

    function handleNext(name)
    {
        let element = document.getElementsByName(name);
        let l = element[0].clientWidth;
        
        for(let i=0;i<element.length;i++)
        {
            element[i].style.transform = `translateX(-${l}px)`;
        }


    }

    function handlePrev(name)
    {
        let element = document.getElementsByName(name);
        let l = element[0].clientWidth;

        for(let i=0;i<element.length;i++)
        {
            element[i].style.transform = `translateX(0px)`;
        }
    }

    return(
        <>
            <div className={styles.container}>
                <Nav cards={cards}></Nav>

                <MovieSlider heading={"Recommended Movies"}></MovieSlider>

                <MovieSlider heading={"Currently Playing"}></MovieSlider>

                <MovieSlider heading={"Upcoming Movies"}></MovieSlider>

                <About mode={mode}></About>

            </div>
        </>
    )
}