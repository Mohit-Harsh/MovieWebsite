import styles from './Nav.module.css';
import Cards from './Cards';

import prevw from '../../assets/carousel_icons/prev-white.png';
import nextw from '../../assets/carousel_icons/next-white.png';


import { useContext, useState } from 'react';
import { Context } from '../../App';

export default function Nav()
{
    const [mode,setMode,cards] = useContext(Context)

    const [active,setActive] = useState(parseInt(cards.length/2));

    function handlePrev()
    {
        let arr =  document.getElementsByClassName(styles.slider)[0].getElementsByTagName('button');
        for(let i=0;i<arr.length;i++)
        {
            
            let val = arr[i].style.transform
            let c = 0;
            if(val != "")
            {
                let a = val.indexOf('(');
                let b = val.indexOf(')');

                c = parseInt(val.substring(a+1,b-2));
            }
            if(arr[0].getBoundingClientRect().left < document.getElementById('nav-container').getBoundingClientRect().left)
            arr[i].style.transform = `translateX(${c+150}px)`;
        }
    }

    function handleNext()
    {
        let arr =  document.getElementsByClassName(styles.slider)[0].getElementsByTagName('button');
        for(let i=0;i<arr.length;i++)
        {
            
            let val = arr[i].style.transform
            let c = 0;
            if(val != "")
            {
                let a = val.indexOf('(');
                let b = val.indexOf(')');

                c = parseInt(val.substring(a+1,b-2));
            }
            
            if(arr[arr.length-1].getBoundingClientRect().right > document.getElementById('nav-container').getBoundingClientRect().right)
            arr[i].style.transform = `translateX(${c-150}px)`;
        }

    }

    return(
        <>

            <div  id="nav-container" className={styles.container} style={{backgroundImage:`url(${cards[active-1]['image_wide']})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>

                <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg}>
                    <line x1="0" y1="0" x2="100%" y2="0"/>
                </svg>

                <div id='slider-bounds' style={{display:'flex',justifyContent:'center',alignItems:'end',width:'100%',overflow:'hidden',height:"max-content",zIndex:1}}>
                    <button onClick={handlePrev} className={styles.prev} style={{backgroundImage:`url(${prevw})`}}></button>
                    <div style={{width:'auto',overflow:'hidden'}}>
                        <div className={styles.slider}>
                                {cards.map((item,key)=><Cards key={key} id={item['id']} title={item['title']} image={item['image']} active={active} setActive={setActive}></Cards>)}
                        </div>
                    </div>
                    <button onClick={handleNext} className={styles.next} style={{backgroundImage:`url(${nextw})`}}></button>
                </div>

            </div>
        </>
    )
}