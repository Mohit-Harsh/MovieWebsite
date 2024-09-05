import Item from '../home/Item';
import EastIcon from '@mui/icons-material/East';
import next from '../../assets/carousel_icons/next-white.png';
import prev from '../../assets/carousel_icons/prev-white.png';
import styles from './MovieSlider.module.css';
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { Context } from '../../App';

export default function MovieSlider({heading,data})
{

    let more = ""

    if(heading == "Currently Playing")
    {
        more = "/current"
    }
    else if(heading == "Upcoming Movies")
    {
        more = "/upcoming"
    }
    else
    {
        more="/current"
    }

    function handleNext(name)
    {
        if(data.length>5)
        {

            let element = document.getElementsByName(name);
            let l = element[0].clientWidth;
            
            for(let i=0;i<element.length;i++)
            {
                element[i].style.transform = `translateX(-${l}px)`;
            }
        }   

    }

    function handlePrev(name)
    {
        if(data.length>5)
        {
            let element = document.getElementsByName(name);
            let l = element[0].clientWidth;

            for(let i=0;i<element.length;i++)
            {
                element[i].style.transform = `translateX(0px)`;
            }
        }
    }


    return(<>
        <div style={{display:(data.length==0)?'none':''}} className={styles.movcont}>
                    
            <div style={{width:'95%',margin:'auto',position:'relative',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <button onClick={()=>handlePrev(heading)} className={styles.prev} style={{display:data.length>5?'flex':'none'}}><img src={prev} alt="" style={{width:'60%',height:'auto'}}/></button>
                <div style={{width:'95%',overflow:'hidden'}}>
                    <div className={styles.movielist_header}>
                        <h1>{heading}</h1>
                        <Link className={styles.morebtn} style={{textDecoration:'none'}} to={more} state={{'heading':more == '/upcoming'? 'Upcoming Movies':'Currently Playing'}}>See more<EastIcon sx={{width:'15px',height:'auto',marginLeft:'5px'}}/></Link>      
                    </div>
                    <div className={styles.moviediv}>
                        <div name={heading} className={styles.movielist}>
                            {data.slice(0,5).map((element,key)=><Item key={key} item={element}></Item>)}
                        </div>
                        <div name={heading} className={styles.movielist}>
                            {data.length>5?(data.slice(5,10).map((element,key)=><Item key={key} item={element}></Item>)):<></>}
                        </div>
                    </div>
                    
                </div>
                <button onClick={()=>handleNext(heading)} className={styles.next} style={{display:data.length>5?'flex':'none'}}><img src={next} alt="" style={{width:'60%',height:'auto'}}/></button>
            </div>
            
        </div>
    </>)
}