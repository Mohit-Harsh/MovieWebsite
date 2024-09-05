import styles from './Movie.module.css';
import { useLocation } from 'react-router-dom';
import { Context } from '../../App';
import { useContext } from 'react';
import MovieSlider from './MovieSlider';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../home/Footer';

export default function Movie()
{

    const [mode,setMode,cards,city] = useContext(Context);
    const obj = useLocation();

    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return(<>

        
        <div className={styles.containerDiv}>

            <Navbar></Navbar>

            <div className={styles.container} style={{backgroundImage: `linear-gradient(90deg, rgb(18, 18, 18) 24%, rgb(18, 18, 18) 0, rgba(18, 18, 18, 0.04) 50%, rgb(18, 18, 18) 75%), url(${obj.state['posterWide']})`}}>
                <div style={{width:'80%',margin:'auto'}}>

                    <div className={styles.book}>

                        <div className={styles.card}>
                            <img src={obj.state['poster']} alt="" />
                        </div>

                        <div className={styles.info}>

                            <h1 style={{margin:0}}>{obj.state['title']}</h1>
                            
                            <div>
                                {['English','Hindi','Telugu'].map((item,key)=><span key={key}>{item}</span>)}
                            </div>

                            <h5>{obj.state['certificate']} {String.fromCodePoint(9679)} {obj.state['duration']} {String.fromCodePoint(9679)} {obj.state['releaseDate']}</h5>

                            <p style={{textAlign:'justify'}}>{obj.state['plot']}</p>

                            <Link to={`/book/${obj.state['title']}`} state={obj.state}><button className={styles.btn}>Book now</button></Link>

                        </div>

                    </div>

                </div>

                
            </div>

            {/* <div style={{width:"80%",margin:'auto'}}>
                <MovieSlider heading={"Similar Movies"} data={obj.state}/>
            </div> */}

        </div>

        <Footer></Footer>

    </>)
}