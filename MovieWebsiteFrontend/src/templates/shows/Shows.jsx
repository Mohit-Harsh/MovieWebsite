import styles from './Shows.module.css';
import Dropdown from './Dropdown';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../../App';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../home/Footer';
import Navbar from '../navbar/Navbar';
import Seats from '../seats/Seats';

export default function Shows()
{

    const obj = useLocation();

    const [mode,setMode,cards,city] = useContext(Context);

    const [data,setData] = useState({data:[],typelist:[],langlist:[]});

    const [active,setActive] = useState(0);

    const [type,setType] = useState('Type');
    const [lang,setLang] = useState('Lang');

    const dates = [new Date('2024-09-01'),new Date('2024-09-02'),new Date('2024-09-03'),new Date('2024-09-04'),new Date('2024-09-05'),new Date('2024-09-06')];
    const month = ['','Jan','Feb','Mar','Apr','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    async function fetchData()
    {
        let url = `http://localhost:8080/api/show/${city}/${obj.state['mid']}`;
        
        let res = await axios.get(url);
        let result = await res.data;

        let types = new Set(['Type']);
        let langs = new Set(['Lang']);

        for(let i=0;i<result.length;i++)
        {
            for(let j in result[i])
            {
                let r = result[i][j];

                let time = r['starttime'].split(':').slice(0,2);

                let hr = parseInt(time[0]);
                let min = parseInt(time[0]);

                let end = "AM";

                if(hr > 12)
                {
                    hr = hr-12;
                    end = "PM";
                }
                if(hr == 12)
                {
                    end = "PM";
                }
                if(min<10)
                {
                    min = "0"+min;
                }

                r['starttime'] = `${hr}:${min} ${end}`;

                types.add(r.type);
                langs.add(r.lang);
            }
        }
        
        setData({data:result,typelist:Array.from(types),langlist:Array.from(langs)});
        
    }

    useEffect(()=>{fetchData();},[city]);

    function handleActive(id)
    {
        setActive(id);
    }

    let shows = [];

    for(let i=0;i<data.data.length;i++)
    {
        let arr = [];
        for(let j in data.data[i])
        {
            let d = data.data[i][j];
            let x = new Date(d.advanceDate);
            if(x>=dates[active] && (type == 'Type' || type == d.type) && (lang =='Lang' || lang == d.lang))
            {
                arr.push(d);
            }
        }
        if(arr.length>0)
        {
            shows.push(arr);
        }
        
    }

    return(<>
    
        <Navbar></Navbar>
        
        <div className={styles.container}>

            

            <h1>{obj.state['title']}</h1>

            <div className={styles.date}>

                <div>
                    {[0,1,2,3,4,5].map((item,key)=>
                    <div onClick={()=>{handleActive(item)}} className={active==item? styles.datebtnActive : styles.datebtnInactive} key={key}>
                        <h5 style={{margin:0}}>{dates[item].getDate()}</h5>
                        <p style={{margin:0}}>{month[dates[item].getMonth()]}</p>
                    </div>)}
                </div>
                <div>
                    <Dropdown options={data.typelist} name={'mov_type'} setType={setType}/>
                    <Dropdown options={data.langlist} name={'mov_lang'} setType={setLang}/>
                </div>
                
            </div>

            <div className={styles.showdiv}>

                {shows.map((item,key)=>

                    <div key={key} className={styles.theatre}>

                        <div className={styles.theatre_name}>
                            <a style={{textDecoration:'none'}} rel="noopener noreferrer" target="_blank" href={`https://www.google.com/maps/place/search?q=${item[0].screen.theatre['name']},${item[0].screen.theatre['address']}`}><h4>{item[0].screen.theatre['name']}</h4></a>
                            <p>{item[0].screen.theatre['address']}</p>
                        </div>
                        <div>
                            {item.map((show,key)=>
                            <Link key={key} to={`${obj.pathname}/seats`}  state={{data:show,adDate:dates[active]}}><button  style={{display: (type=='Type') || (type == show.type) ? '':'none'}} className={styles.showbtn}>
                                <p>{show['starttime']}</p>
                                <p>{show.screen['name']}</p>
                            </button></Link>)}
                        </div>

                    </div>

                )}

            </div>

        </div>

        <Footer></Footer>

    </>)
}