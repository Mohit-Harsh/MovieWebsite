import styles from './Cards.module.css'

export default function Cards({id,title,image,active,setActive})
{
    function handleClick()
    {
        setActive(id);
    }
    
    return(
        <>

            <button onClick={handleClick} className={(active==id)?styles.card2:styles.card1} style={{backgroundImage: `url(${image})`}}>

                <div className={(active==id)?styles.info1:styles.info2}>
                    <h4 style={{margin:0}}>{title}</h4>
                    <p onClick={()=>console.log('button clicked!')} className={styles.buy}>Book now</p>
                </div>
                
            </button>

        </>
    )
}