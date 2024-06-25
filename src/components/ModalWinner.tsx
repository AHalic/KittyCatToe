import React from "react";
import { createPortal } from "react-dom";

export default function ModalWinner({winner, handleClose}: {winner: number, handleClose: () => void}) {
    return createPortal(
        <ModalContent winner={winner} handleClose={handleClose} />,
        document.body
    )
}

const ModalContent = ({winner, handleClose}: {winner: number, handleClose: () => void}) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg px-32 py-8 flex justify-between flex-col">
            <h1 className="text-3xl font-play font-extrabold text-zinc-700 mt-4 text-center">Winner</h1>
            <p className="text-center font-play font-medium text-zinc-500 mt-2">{winner}</p>
            <div className="flex justify-center mt-16">
                <button type="button" 
                onClick={handleClose}
                className="bg-pink-500 text-white px-4 py-2 rounded-3xl outline-none border-none hover:bg-pink-400">
                    Close
                </button>
            </div>
        </div>
    </div>
)
