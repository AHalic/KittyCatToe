import React from "react";
import { Paw } from "../assets/Paw"; 
import { Cat } from "../assets/Cat";

export default function Area({disabled, checked, player, position, handleClick}: {
    disabled: boolean,
    checked: boolean, 
    player: 1 | 2 | undefined, 
    position: number,
    handleClick: () => void
}) {
    const getBorders = (position) => {
        let stringBorder = ''

        if (position > 2) {
            stringBorder += 'border-t-2 '
        } 

        if (position < 6) {
            stringBorder += 'border-b-2 '
        }

        if (position % 3 !== 0) {
            stringBorder += 'border-l-2 '
        }

        if (position % 3 !== 2) {
            stringBorder += 'border-r-2'
        }        

        return stringBorder;
      };

    return (
        <div
            onClick={!disabled ? handleClick : () => {}}
            className={`w-24 h-24 ${getBorders(position)} border-pink-300 flex justify-center items-center ${checked || disabled ? '' : 'hover:cursor-pointer'}`}
        >
            {checked && player === 1 && <Cat className="h-8 w-8 fill-orange-600" />}
            {checked && player === 2 && <Paw className='h-8 w-8 fill-indigo-500' />}
        </div>
    )
}