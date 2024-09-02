import { useLocation } from 'react-router-dom';
import Item from '../home/Item';
import styles from './Movielist.module.css';
import { useContext } from 'react';
import { Context } from '../../App';

export default function Movielist()
{
    const obj = useLocation();

    const [mode,setMode,cards] = useContext(Context);

    let l = false;
    let g = false;
    let f = false;

    const languages = ['Telugu','Hindi','English','Tamil','Malayalam'];

    const genres = ['Action','Comedy','Romantic','Adventure','Thriller','Suspense','Horror']

    const format = ['2D','3D','IMAX','4D']


    document.body.scrollTop = document.documentElement.scrollTop = 0;

    return(<>

        <div className={styles.container}>

            <div>

                <h1>Filters</h1>

                <div className={styles.filter}>

                    <div className={styles.lang}>



                    </div>

                    <div className={styles.genre}>
                        


                    </div>

                    <div className={styles.format}>

                    </div>

                </div>

            </div>

            <div>

                <h1>{obj.state['heading']}</h1>

                <div className={styles.langlist}>
                    
                    {languages.map((item,key)=><button key={key} className={styles.langbtn}>{item}</button>)}

                </div>

                <div className={styles.list}>

                    {cards.map((element,key)=><Item key={key} title={element['title']} image={element['image']} rating={13} lang={['Te','En','Hi']} wideimg={element['image_wide']}></Item>)}

                </div>
            </div>
            

        </div>

    </>)
}