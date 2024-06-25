import React, { Dispatch, SetStateAction } from 'react';
import { Cat } from './assets/Cat';

// Component for the initial page of the game
export default function Menu({setStart}: {setStart: Dispatch<SetStateAction<boolean>>}) {
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg px-32 py-32 flex justify-between flex-col">
        <div>
          <Cat className="mx-auto h-8 w-8 fill-pink-400" />
          <h1 className="text-3xl font-play font-extrabold text-zinc-700 mt-4 text-center">Kitty Cat Toe</h1>
  
          <p className="text-center font-play font-medium text-zinc-500 mt-2">A cat themed Tic Tac Toe</p>
        </div>

        <div className="flex justify-center mt-16">
          <button type="button" 
          onClick={() => setStart(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded-3xl outline-none border-none hover:bg-pink-400">
            Start new Round
          </button>
        </div>

      </div>
    )
}