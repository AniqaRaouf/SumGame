import React, { useState } from 'react';
import Game from './components/Game';
function App(){
const [gameID,setgameID] =useState(1)

const resetGameID=()=>{
  setgameID(gameID+1)
}
  return (
   <Game key={gameID} 
   onPlayAgain={resetGameID}
   randomnumbercount={6}  intialSeconds={10}/>
  );
}



export default App;
