'use client'
import React , {useState,useEffect,useRef} from  'react';
import {  ToastContainer , toast } from 'react-toastify';
import styles from  "./Game.module.css";
import  'react-toastify/dist/ReactToastify.css';
interface GameProps {
  onWinnerReset: () => void;

}
function Game ({ onWinnerReset }: GameProps) {
    const winCounted = useRef(false);
    const [toastClosed, setToastClosed] = useState(false);
    const [xOarray, setXOarray]=useState<Array<string| null>>(Array(9).fill(null));
    const [put,setPut]= useState('X'); 
    const[winCheck,setWinnerCheck]=useState(false);
    const[countdown,setCountdown]=useState(9);
    const[numberOWins,setnumberOWins]=useState(0);
    const[numberXWins,setnumberXWins]=useState(0);
    const[whoWins,setWhoWins]=useState('D');
    const checkForWin=()=>{
      const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
  ];
      for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (xOarray[a] && xOarray[a] === xOarray[b] && xOarray[a] === xOarray[c]  && !winCounted.current ) {
        if(xOarray[a]==='X'){
          setnumberXWins(numberXWins+1);
          setWhoWins('X');
        }
        else if(xOarray[a]==='O')
        {
          setnumberOWins(numberOWins+1);
          setWhoWins('O');
        }
          setWinnerCheck(true);
          winCounted.current = true;
          return;
        }else{
          setWinnerCheck(false);
        }
      }
      
    }
    const EndGame = ()=> {
      onWinnerReset();
      setnumberOWins(0);
      setnumberXWins(0);
    }
    const resetGame = () => {
      setXOarray(Array(9).fill(null));
      setPut('X');
      setWinnerCheck(false); 
      setCountdown(9);
    };
    const onClose = () => {
      resetGame();
      setToastClosed(true);
    };
      // for (let i: number = 0; i < 9; i++) {
      //   if (xOarray[i] !== null) {
      //     if (i === 0) {
      //       if (
      //         (xOarray[i] === xOarray[i + 1] && xOarray[i + 2] === xOarray[i + 1]) ||
      //         (xOarray[i] === xOarray[i + 4] && xOarray[i + 4] === xOarray[i + 8]) ||
      //         (xOarray[i] === xOarray[i + 3] && xOarray[i + 3] === xOarray[i + 6])
      //       ) {
      //         toast.success("CONGRATS YOU WON ");
      //       }
      //     }
      //     if (i === 1) {
      //       if (xOarray[i] === xOarray[i + 3] && xOarray[i] === xOarray[i + 6]) {
      //         toast.success("CONGRATS YOU WON ");
      //       }
      //     }
      //     if (i === 2) {
      //       if (
      //         (xOarray[i] === xOarray[i + 2] && xOarray[i] === xOarray[i + 4]) ||
      //         (xOarray[i] === xOarray[i + 3] && xOarray[i] === xOarray[i + 6])
      //       ) {
      //         toast.success("CONGRATS YOU WON ");
      //       }
      //     }
      //     if (i === 3) {
      //       if (xOarray[i] === xOarray[i + 1] && xOarray[i] === xOarray[i + 2]) {
      //         toast.success("CONGRATS YOU WON ");
      //       }
      //     }
      //     if (i === 6) {
      //       if (xOarray[i] === xOarray[i + 1] && xOarray[i] === xOarray[i + 2]) {
      //         toast.success("CONGRATS YOU WON ");
      //       }
      //     }
      //   }
      // }}
      useEffect(() => {
        
        if (xOarray.some(item => item !== null)) {
        checkForWin();
        console.log(winCheck)
        if(winCheck){
          toast.success(`Player win ${whoWins} `, {
            onClose,
            autoClose: 600,
          });
        } else if(countdown===0) {
          resetGame();
        }
      }else{
        winCounted.current = false;
      }
      
    }, [ winCheck,xOarray]);
    const handleClick=(index : number)=> {
      if (!winCheck) {
      setCountdown(countdown-1);
      if (xOarray[index]===null){
    const copyXOarray=[...xOarray]
    copyXOarray[index]=put
    setXOarray(copyXOarray) 
    setPut(put==='X' ? 'O':'X' )
    }else {
      toast.error("FILLED", {
        autoClose: 500,
      });
         }}
      }
    return(
      <div className={styles.Game}>
      <ToastContainer position="top-center" />
      <h1 className={styles.Start}>GAME STARTED</h1>
      <h1 className={styles.X}>X</h1>
      <h1 className={styles.Xwins}>wins:{numberXWins}</h1>
      <h1 className={styles.O}>O</h1>
      <h1 className={styles.Owins}>wins:{numberOWins}</h1>
      <button className={styles.End} onClick={EndGame} >End Game</button>
      <div className={styles.squareContainer}>
        {xOarray.map((value, index) => (
          <div onClick={()=>handleClick(index)}key={index} className={styles.square}>
            {value !== null ? value : ''}
          </div>
        ))}
      </div>
    </div>
    );
    }
export default Game;















