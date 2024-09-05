import Movie from '../movie/Movie';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';


export default function Item({item})
{
    let name = item['title'];

    return(
        <> 
            <button className={styles.itemcont}  style={{backgroundImage:`url(${item['poster']})`}}>
                <Link style={{textDecoration:'none',color:'white'}} to={`/movie/${name}`} state={item}>
                    <div className={styles.item}>
                        <h4>{item['title']}</h4>
                        <p>{item['releaseDate']}</p>
                        <p style={{color:'white'}}>{item['certificate']}</p>
                        <div style={{marginBottom:'10px'}}>
                            <span >{item['lang']}</span>
                        </div>
                    </div>
                </Link>
            </button>
        </>
    )
}