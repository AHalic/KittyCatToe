import { useEffect, useState } from "react";
import Area from "./components/Area";
import { Cat } from "./assets/Cat";
import { Paw } from "./assets/Paw";
import { Restart } from "./assets/Restart";
import ModalWinner from "./components/ModalWinner";

export default function Game() {
    const [checked, setChecked] = useState(Array(9).fill(undefined));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [round, setRound] = useState(0);
    const [points, setPoints] = useState([0, 0]);
    const [initialPlayer, setInitialPlayer] = useState();

    useEffect(() => {
        setInitialPlayer(Math.round(Math.random()) + 1);
    }, []);

    const currentPlayer = () => round % 2 === 0 ? initialPlayer 
    : initialPlayer === 1 ? 
        2 : 1;

    /**
     * Checks if there is a winner based on the possible combinations
     * @returns {boolean} true if there is a winner, false otherwise
     */
    const checkWinner = () => {
        const winning = [
            [0, 1, 2], 
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const [a, b, c] of winning) {
            if (checked[a] === checked[b] && checked[b] === checked[c]) {
                if (checked[a] !== undefined) {
                    return true;
                }
            }
        }

        return false;
    }

    const restartGame = () => {
        setDisabled(false);
        setChecked(Array(9).fill(undefined));
        setRound(0);
        setInitialPlayer(Math.round(Math.random()) + 1);
    }

    /*
    * At each round check if there was a winner
    */
    useEffect(
        () => {
        // when restarting the game we don't want to check the winner
        if (checked.filter((item) => item !== undefined).length === 0) {
            return;
        }

        const winner = checkWinner();

        if (winner) {
            const current = currentPlayer();
            setDisabled(true);

            // add a small timeout to show the winner
            setTimeout(() => {
                setPoints((prev) => {
                    const newPoints = [...prev];
                    newPoints[current - 1] += 1;
                    return newPoints;
                });
                setIsModalOpen(current);
            },
                300
            );
        } else if (round < 8) {
            setRound((prev) => prev + 1);
        } else {
            // case of a draw
            setDisabled(true);
            setTimeout(() => {
                setIsModalOpen(true);
            },
                300
            );
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    /**
     * Handle the click on an area and update the checked array to save the player
     */
    const handleClick = (position) => {
        if (checked[position] !== undefined) {
            return;
        }

        checked[position] = currentPlayer();

        setChecked([...checked]);
    };


    if (!initialPlayer) {
        return;
    }


    return (
        <div className="flex flex-col items-center w-screen">

            {/* ScoreBoard */}
            <div className="bg-white w-fit py-4 px-8 rounded-lg shadow-lg mb-24 grid grid-cols-3 gap-2">
                <div className="flex flex-col w-24 items-center">
                    <h1 className={`text-xl text-center ${currentPlayer() === 1 ? 'font-bold text-orange-600' : 'text-zinc-600'}`}>
                        Player 1
                    </h1>
                    <Cat className="h-6 w-6 fill-orange-600" />

                    <p className="text-center text-zinc-600">
                        {points[0]}
                    </p>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        title="Restart the game"
                        className="bg-red-300 w-fit outline-none border-none hover:bg-red-400 px-4 py-2 rounded-3xl"
                        onClick={() => restartGame()}
                        >
                        <Restart className="h-4 w-4 fill-white"/>
                    </button>
                </div>

                <div className="flex flex-col w-24 items-center">
                    <h1 className={`text-xl text-center ${currentPlayer() === 2 ? 'font-bold text-indigo-600' : 'text-zinc-600'}`}>
                        Player 2
                    </h1>
                    <Paw className="h-6 w-6 fill-indigo-500" />

                    <p className="text-center text-zinc-600">
                        {points[1]}
                    </p>
                </div>
            </div>

            {/* Grid of the game */}
            <div className="grid grid-cols-area">
                {/* Render the 9 areas */}
                {checked.map((_, index) => (
                    <Area 
                        disabled={disabled}
                        key={index}
                        checked={checked[index] !== undefined}
                        player={checked[index]}
                        position={index}
                        handleClick={() => handleClick(index)}
                    />
                ))}
            </div>


            {/* Winner Modal */}
            {isModalOpen && (
                <ModalWinner
                    winner={isModalOpen !== true ? 
                        currentPlayer() === 1 ? 'Player 1' : 'Player 2'
                    : 'End of the game'}
                    handleClose={() => {
                        setIsModalOpen(false);
                        restartGame();
                    }}
                />
            )}
        </div>
    )
}