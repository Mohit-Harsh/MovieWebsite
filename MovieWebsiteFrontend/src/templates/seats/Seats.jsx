import { useLocation } from 'react-router-dom';
import styles from './Seats.module.css';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../App';
import screen_icon from '../../assets/screen.png';
import axios from 'axios';


export default function Seats()
{
    const obj = useLocation();

    const data = obj.state.data;
    const adDate = obj.state.adDate;

    const [mode,setMode] = useContext(Context);
    const [booked,setBooked] = useState([]);
    const [bookseat,setBookSeat] = useState(new Set([]));

    console.log(data,adDate);

    let advanceDate="";

    if(adDate.getDate() < 10)
    advanceDate += "0"+adDate.getDate()+"-";
    else
    advanceDate += adDate.getDate()+"-";

    if(adDate.getMonth() < 10)
    advanceDate += "0"+adDate.getMonth()+"-";
    else
    advanceDate += adDate.getMonth()+"-";

    advanceDate += adDate.getFullYear();

    useEffect(()=>
    {
        async function fetchData()
        {
            let res = await axios.post("http://localhost:8080/api/booking/seats",{"sid":data['sid'],"date":advanceDate});
            let response = await res.data;

            setBooked(response);
        }
        
        fetchData();

    },[])

    function handleClick(seatno)
    {
        if(bookseat.has(seatno))
        {
            setBookSeat(previousState => new Set([...previousState].filter(x => x !== seatno)));
        }
        else
        {
            setBookSeat(previousState => new Set([...previousState, seatno]));
        }
    }

    async function handleBuy()
    {
        let res = await axios.post("http://localhost:8080/api/booking",{"sid":data['sid'],"date":advanceDate,"seats":Array.from(bookseat.values())});
        console.log(res.data);
    }

    let rows = [];

    for(let i=0;i<data.screen['cols'].length;i++)
    {
        let obj = {'row':String.fromCharCode(i+65),'col':data.screen['cols'][i]};
        rows.push(obj);
    }

    console.log(booked.indexOf('E10'))

    const date = new Date();
    const month = ['','Jan','Feb','Mar','Apr','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    return(<>
       
        <div className={styles.navdiv} style={{backgroundColor:mode?'rgb(28,28,28)':'whitesmoke'}}>
            <h1 style={{textAlign:'left',alignItems:'center',display:'flex',columnGap:'10px'}}>{data.movie['title']} <span>({data.movie['certificate']})</span></h1>
            <p>{data.screen.theatre['name']}, {data.screen.theatre['address']} | {date.getDate()} {month[date.getMonth()]} {date.getFullYear()}, {date.getHours()}:{date.getMinutes()}</p>
        </div>

        <div className={styles.container}>

            <div className={styles.seatsdiv}>

                {rows.map((item,key)=>

                    <div key={key} className={styles.rowdiv}>   
                        <h5>{item['row']}</h5>
                        <div className={styles.row} >
                            
                            {[...Array(item['col']).keys()].map((seatno,key)=><button disabled={booked.indexOf(item['row']+seatno)!=-1?true:false}  className={(bookseat.has(item['row']+seatno))?styles.seatbtnActive:styles.seatbtn} onClick={()=>{handleClick(item['row']+seatno)}}  key={key}>{seatno}</button>)}

                        </div>
                    </div> 
                )}

            </div>
            
            <div style={{width:'fit-content',margin:'100px auto',paddingLeft:'30px',textAlign:'center'}}>

                <img src={screen_icon} alt="" style={{width:'1000px',rotate:'180deg'}}/>    
                <button onClick={handleBuy} style={{display:(bookseat.size>0?'block':'none')}} className={styles.buynow}>Buy now</button>
            
            </div>            

        </div>

    </>)
}