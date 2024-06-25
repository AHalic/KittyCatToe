import React, { useState } from "react"
import Menu from "./Menu"
import Game from "./Game"

function App() {
  const [start, setStart] = useState(false)


  return (
    <div className="h-screen w-screen bg-pink-100 flex justify-center items-center">
      {!start ? 
        <Menu setStart={setStart}/>
       :
        <Game />  
      }
    </div>
  )
}

export default App
