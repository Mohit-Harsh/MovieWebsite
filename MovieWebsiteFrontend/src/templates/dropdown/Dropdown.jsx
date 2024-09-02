import styles from './Dropdown.module.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext } from 'react';
import { Context } from '../../App';
import { useState } from 'react';

export default function Dropdown({name,mode,options})
{

    const [drop,setDrop] = useState(['hidden','0']);

    function handleDrop()
    {
        if(drop[1] == '0')
        {
            setDrop(['visible','1']);
            
        }
        else
        {
            setDrop(['hidden','0']);
            
        }
    }

    function handleSelect(event)
    {
        document.getElementById(name+"_dropdown_text").innerHTML = event.target.innerText;
        handleDrop();
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
            <div id={name+"_dropdown"} className={styles.dropdown}>

                <div onClick={handleDrop} style={{color:mode?'rgb(255,255,255,0.7)':'black'}} id={name+"_dropdown_select"} className={styles.dropdown_select}>

                    <span id={name+"_dropdown_text"} style={{margin:0,padding:0}}>{options[0]}</span>
                    <ArrowDropDownIcon style={{margin:0,padding:0}}/>

                </div>

                <div id={name+"_dropdown_list"} className={styles.dropdown_list} style={{backgroundColor:mode?'rgb(38,38,38)':'white',visibility:drop[0],opacity:drop[1]}}>
                    
                    {options.map((item,key)=><div style={{color:'gray'}} onMouseOut={handleOut} onMouseOver={handleHover} onClick={handleSelect} key={key} className={styles.dropdown_item}>{item}</div>)}

                </div>

            </div>
        </>
    );
}