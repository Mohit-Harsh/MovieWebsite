import styles from './Movie.module.css';
import { useLocation } from 'react-router-dom';
import MovieSlider from './MovieSlider';

export default function Movie()
{
    const obj = useLocation();

    console.log(obj);

    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return(<>

        <div className={styles.container} style={{backgroundImage: `linear-gradient(90deg, rgb(18, 18, 18) 24%, rgb(18, 18, 18) 0, rgba(18, 18, 18, 0.04) 50%, rgb(18, 18, 18) 75%), url(${obj.state['image_wide']})`}}>
            <div style={{width:'80%',margin:'auto'}}>

                <div className={styles.book}>

                    <div className={styles.card}>
                        <img src={obj.state['image']} alt="" />
                    </div>

                    <div className={styles.info}>

                        <h1 style={{margin:0}}>{obj.state['title']}</h1>
                        
                        <div>
                            {['English','Hindi','Telugu'].map((item,key)=><span key={key}>{item}</span>)}
                        </div>

                        <h5>UA {String.fromCodePoint(9679)} 2h 36m {String.fromCodePoint(9679)} 20 Aug, 2024</h5>

                        <p style={{textAlign:'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque a tortor id nunc pellentesque hendrerit. Pellentesque ac ligula metus. Suspendisse ornare blandit ligula, et congue eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tristique risus sit amet ante vulputate faucibus. Vivamus vulputate tellus eget ultricies congue. Sed metus quam, euismod sit amet facilisis id, porttitor id neque. In hac habitasse platea dictumst. Mauris euismod quam eu metus rutrum dapibus. Etiam lacinia erat dui, sit amet dapibus ipsum placerat nec. Aliquam id vehicula neque. Nullam fermentum sagittis lorem sit amet consectetur. Duis diam mi, hendrerit sit amet turpis quis, tincidunt lobortis velit.</p>

                        <button className={styles.btn}>Book now</button>

                    </div>

                </div>

            </div>

            
            
        </div>

        <div style={{width:"80%",margin:'auto'}}>
            <MovieSlider heading={"Similar Movies"}/>
        </div>

    </>)
}