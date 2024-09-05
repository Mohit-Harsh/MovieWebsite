import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { Context } from './App';

export default function ModeSwitch()
{
    const [mode,setMode,cards,city] = useContext(Context);

    function handleChange(event)
    {
        console.log(event);

        if(mode == true)
        {
            setMode(event.target.checked);
            document.documentElement.style.setProperty('color-scheme','light');
            document.documentElement.style.setProperty('background-color','white');
            
        }
        else
        {
            setMode(event.target.checked);
            
            document.documentElement.style.setProperty('color-scheme','dark');
            document.documentElement.style.setProperty('background-color','rgb(18,18,18)');
        }
    }

    
    return(<>
        <Switch checked={mode} onChange={handleChange}></Switch>
    </>)

}