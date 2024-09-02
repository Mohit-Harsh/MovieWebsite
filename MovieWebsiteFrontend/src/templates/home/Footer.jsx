import styles from './Footer.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import { useContext } from 'react';
import { Context } from '../../App.jsx';

export default function Footer()
{

    const [mode,setMode] = useContext(Context);

    return(<>
        

        <div name='modechange' className={styles.container} style={{backgroundColor:mode?'rgb(28,28,28)':'whitesmoke'}}>

             <div className={styles.profile}>
                <h4>Profile</h4>
                <ul>
                    <li>FAQ's</li>
                    <li>Pricing plans</li>
                    <li>Order tracking</li>
                    <li>Returns</li>
                </ul>
             </div>

             <div className={styles.recent}>
                <h4>Recent Posts</h4>
                <ul>
                    <li>Touch of uniqueness</li>
                    <li>Offices you won't forget</li>
                    <li>Cicilan</li>
                </ul>
             </div>

             <div className={styles.customer}>
                <h4>Customer</h4>
                <ul>
                    <li>Help & contact us</li>
                    <li>Return</li>
                    <li>Online store</li>
                    <li>Terms & conditions</li>
                </ul>
             </div>

             <div className={styles.contact}>
                <h4>Contact</h4>
                <span style={{margin:'0 10px'}}><InstagramIcon></InstagramIcon></span>
                <span style={{margin:'0 10px'}}><FacebookIcon></FacebookIcon></span>
                <span style={{margin:'0 10px'}}><XIcon></XIcon></span>
             </div>

        </div>
        

    </>)
}