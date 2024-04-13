'use client'
import styles from "./page.module.css";
import React , {useState} from  'react';
import 'react-toastify/dist/ReactToastify.css';
import Game from "./components/Game";
interface HomeProps {
  // No specific props for now
}
function Home({}: HomeProps) {
  const [show,setShow]= useState(false);  
  const handleStartButtonClick = ()=>{
  setShow(true);
  };
  const handleGameReset = ()=> {
    setShow(false);
  }
  return (
    <div>      
    {!show ? (
    <div className={styles.App}>
      <div className={styles.centercontent}>
    <span className={styles.green}>X</span>
    <span className={styles.red}>O</span>
  </div>
    <button   className={styles.button} onClick={handleStartButtonClick}>start</button>
    </div> 
    ) : ( <Game onWinnerReset={handleGameReset} />) }
    </div>
  );
}
export default Home;
