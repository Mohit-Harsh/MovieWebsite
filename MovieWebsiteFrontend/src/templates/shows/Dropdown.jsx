import styles from './Dropdown.module.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as React from 'react';
import { useContext } from 'react';
import { Context } from '../../App';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function Dropdown({name,options,setType})
{

    const [mode] = useContext(Context);

    function handleDrop()
    {
        let element = document.getElementById(name+"_dropdown_list");

        if(element.style.getPropertyValue('visibility') == 'hidden')
        {
            element.style.visibility = 'visible';
        }
        else
        {
            element.style.visibility = 'hidden';
        }
    }

    useEffect(()=>{

        function handler(e)
        {
            if(document.getElementById(name+"_dropdown").contains(e.target)!=true)
            {
                document.getElementById(name+"_dropdown_list").style.visibility = 'hidden';
            }
        }

        document.addEventListener("mousedown",handler);

    })

    function handleSelect(event)
    {
        document.getElementById(name+"_dropdown_text").innerHTML = event.target.innerText;
        handleDrop();
        setType(event.target.innerText);
    }

    function handleHover(event)
    {
        event.target.style.setProperty('background-color',mode?'gray':'aliceblue');
        event.target.style.setProperty('color',mode?'rgb(255,255,255,0.7)':'black');
    }
    function handleOut(event)
    {
        event.target.style.setProperty('background-color','transparent');
        event.target.style.setProperty('color',mode?'gray':'gray');
    }

    return (
        <>
            <div id={name+"_dropdown"} className={styles.dropdown} style={{backgroundColor:mode?'rgb(38,38,38)':'whitesmoke'}}>

                <div onClick={handleDrop} style={{color:mode?'rgb(255,255,255,0.7)':'black'}} id={name+"_dropdown_select"} className={styles.dropdown_select}>

                    <span id={name+"_dropdown_text"} style={{margin:0,padding:0}}>{options[0]}</span>
                    <ArrowDropDownIcon style={{margin:0,padding:0}}/>

                </div>

                <div id={name+"_dropdown_list"} className={styles.dropdown_list} style={{backgroundColor:mode?'rgb(38,38,38)':'whitesmoke',visibility:'hidden'}}>
                    
                    {options.map((item,key)=><div style={{color:'gray'}} onMouseOut={handleOut} onMouseOver={handleHover} onClick={handleSelect} key={key} className={styles.dropdown_item}>{item}</div>)}

                </div>

            </div>
        </>
    );
}