import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export default function Login({setUid})
{

    const [cred,setCred] = useState(["",""]);
    const [login,setLogin] = useState(1);

    useEffect(()=>{

        async function fetchData()
        {
            let url="";
            if(login == 1){ url = "http://localhost:8080/api/user/signin";}
            else{url = "http://localhost:8080/api/user/signup";}

            let res = await axios.post(url,{username:cred[0],password:cred[1]});
            let data = await res.data;
            if(data["success"]!=undefined)
            {
                setUid(data["sucess"]);
            }
        }
        if(cred[0]!="" && cred[1]!="")
        {fetchData();}

    },[cred])

    function handleSubmit(e)
    {
        e.preventDefault();
        console.log(e);
        setCred([e.target[0].value,e.target[1].value]);

    }

    function handleClick(e)
    {
        if(login)
        setLogin(0);
        else
        setLogin(1);
    }

    if(login)
    return(<>

        

        <div className={styles.container}>

            <LockOutlinedIcon/>

            <form onSubmit={handleSubmit}>

                <input defaultValue={'user1'} type="text" placeholder='username' maxLength={20}/>
                <input defaultValue={'user1'} type="password" name="pass" id="pass" maxLength={20} placeholder='password'/>

                <button type="submit">Sign in</button>

            </form>


            <button style={{marginTop:'30px'}} onClick={handleClick}>create account</button>

        </div>
      

    </>)
    else
    return(<>

        <div className={styles.container}>

            <form onSubmit={handleSubmit}>

                <input type="text" placeholder='username' maxLength={20}/>
                <input type="password" name="pass" id="pass" maxLength={20} placeholder='password'/>

                <button type="submit">create account</button>

            </form>

            <button style={{marginTop:'30px'}} onClick={handleClick}>Sign in</button>

        </div>

    </>)
}