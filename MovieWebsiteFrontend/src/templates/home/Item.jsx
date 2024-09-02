import Movie from '../movie/Movie';
import styles from './Item.module.css';
import { Link } from 'react-router-dom';


export default function Item({item})
{
    let name = item['title'];

    return(
        <> 
            <button className={styles.itemcont}  style={{backgroundImage:`url(${item['image']})`}}>
                <Link style={{textDecoration:'none',color:'white'}} to={`/movie/${name}`} state={item}>
                    <div className={styles.item}>
                        <h4>{item['title']}</h4>
                        <p>20 April</p>
                        <p style={{color:'white'}}>13+</p>
                        <div style={{marginBottom:'10px'}}>
                            {['English','Hindi','Telugu'].map((element,key)=><span key={key}>{element}</span>)}
                        </div>
                    </div>
                </Link>
            </button>
        </>
    )
}