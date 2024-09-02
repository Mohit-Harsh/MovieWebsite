import styles from './About.module.css';
import pic1 from '../../assets/picture1.png';
import pic4 from '../../assets/picture4.png';

import newsbig from '../../assets/newsbig.png';
import news1 from '../../assets/news1.png';
import { useContext } from 'react';
import { Context } from '../../App';

export default function About()
{
    const [mode,setMode,cards] = useContext(Context);

    return(<>

        <div className={styles.container}>

            <div className={styles.history}>

                <div className={styles.hist_col1}>
                    <img src={pic1} alt="" />
                </div>

                <div className={styles.hist_col2}>
                    <h5>Arshin Mal Alan</h5>
                    <h1>Arshin Mal Alan</h1>
                    <p>Arshin Mal Alan is a 4-act operetta composed by Azerbaijani composer Uzeyir Hajibeyov. The libretto of the work was also written by Uzeyir Hajibeyov in 1913 in St. Petersburg. The premiere of the opera was held on October 25, 1913 at the Haji Zeynelabidin Tagiyev Theater in Baku.</p>
                </div>

            </div>

            <div name="modechange" className={styles.about} style={{backgroundColor:mode?'rgb(28,28,28)':'whitesmoke'}}>

                <div className={styles.about_col2}>
                    <h5>Arshin Mal Alan</h5>
                    <h1>Arshin Mal Alan</h1>
                    <p>Arshin Mal Alan is a 4-act operetta composed by Azerbaijani composer Uzeyir Hajibeyov. The libretto of the work was also written by Uzeyir Hajibeyov in 1913 in St. Petersburg. The premiere of the opera was held on October 25, 1913 at the Haji Zeynelabidin Tagiyev Theater in Baku.</p>
                </div>

                <div className={styles.about_col1}>
                    <img src={pic4} alt="" />
                </div>

            </div>

            <div style={{width:'80%',margin:'0 auto'}}>

                <h1>Latest news</h1>

            </div>

            <div className={styles.news}>

                <div className={styles.news_col1} style={{backgroundImage:`url(${newsbig})`,backgroundPosition:'center', backgroundRepeat:'no-repeat', backgroundSize:'cover', color:'white'}}>
                    
                    <h5 style={{margin:'10px 0px'}}>New American films on the screen of Nizami Cinema Center</h5>
                    <p style={{margin:'10px 0px'}}>US-produced "Independence Day: Revival" at Nizami Cinema Center. "Neighbours. 2 in wartime ”films have been shown. "Independence Day: Revival" is based on a screenplay by Nicholas Wright and directed by Roland Emmerich in the genres of science fiction, adventure and war. Slogan: “We had 20 years to prepare.</p>
                    
                </div>

                <div className={styles.news_col2}>
                        <div>
                            <div>
                                <img src={news1} alt="" style={{width:'100px',height:'100px'}}/>
                            </div>
                            <div>
                                <p style={{margin:0}}><i>25.03.2022</i></p>
                                <h5 style={{margin:'10px 0'}}>An event titled "April battles and victory" dedicated to the Armed Forces Day was held at the Nizami Cinema Center</h5>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img src={news1} alt="" style={{width:'100px',height:'100px'}}/>
                            </div>
                            <div>
                                <p style={{margin:0}}><i>25.03.2022</i></p>
                                <h5 style={{margin:'10px 0'}}>An event titled "April battles and victory" dedicated to the Armed Forces Day was held at the Nizami Cinema Center</h5>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img src={news1} alt="" style={{width:'100px',height:'100px'}}/>
                            </div>
                            <div>
                                <p style={{margin:0}}><i>25.03.2022</i></p>
                                <h5 style={{margin:'10px 0'}}>An event titled "April battles and victory" dedicated to the Armed Forces Day was held at the Nizami Cinema Center</h5>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img src={news1} alt="" style={{width:'100px',height:'100px'}}/>
                            </div>
                            <div>
                                <p style={{margin:0}}><i>25.03.2022</i></p>
                                <h5 style={{margin:'10px 0'}}>An event titled "April battles and victory" dedicated to the Armed Forces Day was held at the Nizami Cinema Center</h5>
                            </div>
                        </div>
                </div>

            </div>

        </div>


    </>)
}