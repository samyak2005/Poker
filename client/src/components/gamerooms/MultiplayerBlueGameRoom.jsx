import ReactCardFlip from "react-card-flip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCircleDollarToSlot, faWallet, faQuestion, faClockRotateLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import '../../App.css';
import Popup from 'reactjs-popup';

import Navbar from '../pageComponents/Navbar';
import User from '../pageComponents/User';
import AddUser from '../pageComponents/AddUser';
import Help from '../pageComponents/Help';
import Timer from '../pageComponents/Timer';

const MultiplayerBlueGameRoom = ({ 
    players, 
    myCards, 
    communityCards, 
    settings, 
    win, 
    isMyTurn, 
    currentTurn, 
    pot, 
    onPlayerAction,
    onStartGame,
    gameStarted,
    connected,
    roomId,
    playerName
}) => {
    const [flip1, setFlip1] = useState(false);
    const [flip2, setFlip2] = useState(false);
    const [flip3, setFlip3] = useState(false);
    const [flip4, setFlip4] = useState(false);

    const [userMoney, setUserMoney] = useState(250);
    const [bet, setBet] = useState(10);
    const [bank, setBank] = useState(1000);
    const [folded, setFolded] = useState(false);
    const [turn, setTurn] = useState(true);
    const [timer, setTimer] = useState(40);
    const [disabling, setDisabling] = useState(false);
    const [called, setCalled] = useState(false);

    const [help, setHelp] = useState(false);
    const [log, setLog] = useState(false);
    
    //handling help popup
    const closeHelp = () => {
        setHelp(false);
    }

    const flipSound = new Audio("flip.mp3");

    const playFlipSound = () => {
        flipSound.play();
    };

    // Convert card object to filename
    const cardToFilename = (card) => {
        if (!card) return '';
        return `${card.rank.toLowerCase()}_of_${card.suit}.png`;
    };

    // Handle player actions
    const handleCall = () => {
        onPlayerAction('call', 10);
    };

    const handleRaise = () => {
        onPlayerAction('raise', 20);
    };

    const handleFold = () => {
        onPlayerAction('fold');
    };

    // Player positions for 6 players in front (exact copy from original PurpleGameRoom)
    const playerPositions = [
        { avatarTop: "16.5rem", avatarLeft: "2.5rem", cardsTop: "20.25rem", cardsLeft: "6.75rem" }, // Bottom left
        { avatarTop: "12rem", avatarLeft: "15.5rem", cardsTop: "15.75rem", cardsLeft: "19.75rem" }, // Bottom center
        { avatarTop: "9.5rem", avatarLeft: "28.5rem", cardsTop: "13.25rem", cardsLeft: "32.75rem" }, // Top left
        { avatarTop: "9.5rem", avatarLeft: "51.5rem", cardsTop: "13.25rem", cardsLeft: "55.75rem" }, // Top center
        { avatarTop: "11.5rem", avatarLeft: "65rem", cardsTop: "15.25rem", cardsLeft: "69.75rem" }, // Top right
        { avatarTop: "15.5rem", avatarLeft: "77.5rem", cardsTop: "19.25rem", cardsLeft: "81.75rem" }  // Bottom right
    ];

    return (
        <>
        <Popup open={help} onClose={closeHelp} modal nested>
            {(close) => <Help close={close} />}
        </Popup>

        {(help || log || settings) && (
            <div className="fixed inset-0 backdrop-blur z-10"></div>
        )}

        {/* log */}
        <div className={`fixed bottom-15 w-100 bg-black/20 text-gray-300 shadow-lg z-50 transform transition-transform duration-300 ${log ? "translate-x-5" : "-translate-x-full"}`}>
            <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">Log</h2>
                <button onClick={() => setLog(false)} className="text-white/50 hover:text-white cursor-pointer">
                    <FontAwesomeIcon icon={faClose} className="text-xl" />
                </button>
            </div>
            <div className="p-4">
                <p>Room: {roomId}</p>
                <p>Players: {players.length}/7</p>
                <p>Status: {connected ? 'Connected' : 'Connecting...'}</p>
                <p>Game: {gameStarted ? 'In Progress' : 'Waiting'}</p>
            </div>
        </div>

        <div className="blue-gameroom-bg h-screen">
            <Navbar />

            <div className="relative">
                <div className="fixed top-15 w-full flex gap-2 justify-center items-center">
                    <FontAwesomeIcon icon={faCoins} className="text-gray-300 text-xl" />
                    <p className="text-gray-300 text-lg">Pot</p>
                </div>
                <div className="fixed top-25 w-full flex justify-center">
                    <p className="text-white text-7xl font-semibold">{pot}</p>
                </div>
            </div>
            
            {/* Render 6 players in front (excluding current player) */}
            {players.filter(player => player.name !== playerName).map((player, index) => {
                const position = playerPositions[index];
                
                return (
                    <User 
                        key={player.id}
                        flip3={flip3} 
                        flip4={flip4} 
                        setFlip4={setFlip4} 
                        compCards={player.cards.map(cardToFilename)} 
                        avatarTop={position.avatarTop} 
                        avatarLeft={position.avatarLeft} 
                        cardsTop={position.cardsTop} 
                        cardsLeft={position.cardsLeft} 
                        avatar={player.avatar} 
                        name={player.name}
                        isCurrentTurn={currentTurn === players.findIndex(p => p.id === player.id) && gameStarted}
                        folded={player.folded}
                    />
                );
            })}

            {/* Add empty seats for remaining positions in front */}
            {Array.from({ length: 6 - players.filter(player => player.name !== playerName).length }, (_, index) => {
                const position = playerPositions[players.filter(player => player.name !== playerName).length + index];
                return (
                    <AddUser 
                        key={`empty-${index}`}
                        avatarTop={position.avatarTop} 
                        avatarLeft={position.avatarLeft} 
                    />
                );
            })}

            {/* Community Cards */}
            {gameStarted && communityCards.length > 0 && (
                <div className="flex justify-center mt-20 items-end gap-5 fixed bottom-65 w-full">
                    {communityCards.slice(0, 3).map((card, index) => (
                        <ReactCardFlip key={`flop-${index}`} isFlipped={flip1} flipDirection="horizontal">
                            <img 
                                src="card-back.jpeg" 
                                className="rounded-lg card flop-card" 
                                onClick={() => { setFlip1(!flip1); playFlipSound(); }} 
                                draggable="false"
                            />
                            <img 
                                src={`card-fronts/${cardToFilename(card)}`} 
                                className="card flop-card card-front" 
                                draggable="false"
                            />
                        </ReactCardFlip>
                    ))}
                    {communityCards.slice(3, 4).map((card, index) => (
                        <ReactCardFlip key={`turn-${index}`} isFlipped={flip2} flipDirection="horizontal">
                            <img 
                                src="card-back.jpeg" 
                                className="rounded-lg card flop-card" 
                                onClick={() => {if(flip1) { setFlip2(!flip2); playFlipSound(); }}} 
                                draggable="false"
                            />
                            <img 
                                src={`card-fronts/${cardToFilename(card)}`} 
                                className="card flop-card card-front" 
                                draggable="false"
                            />
                        </ReactCardFlip>
                    ))}
                    {communityCards.slice(4, 5).map((card, index) => (
                        <ReactCardFlip key={`river-${index}`} isFlipped={flip3} flipDirection="horizontal">
                            <img 
                                src="card-back.jpeg" 
                                className="rounded-lg card flop-card" 
                                onClick={() => {if(flip2) { setFlip3(!flip3); playFlipSound(); }}} 
                                draggable="false"
                            />
                            <img 
                                src={`card-fronts/${cardToFilename(card)}`} 
                                className="card flop-card card-front" 
                                draggable="false"
                            />
                        </ReactCardFlip>
                    ))}
                </div>
            )}

            {/* My Cards (7th player at bottom) */}
            {gameStarted && myCards.length > 0 && (
                <div className={`flex justify-center items-center relative ${folded ? "opacity-50" : ""}`}>
                    <div className="flex justify-center fixed bottom-20">
                        <img 
                            src={`card-fronts/${cardToFilename(myCards[0])}`} 
                            className="card user-card card-front transform -rotate-12 translate-y-2" 
                            draggable="false"
                        />
                        <img 
                            src={`card-fronts/${cardToFilename(myCards[1])}`} 
                            className="card user-card card-front transform rotate-12 translate-y-2 -ml-8" 
                            draggable="false"
                        />
                    </div>
                </div>
            )}

            {/* Game Controls */}
            <div className={`flex items-center fixed bottom-35 right-10 gap-5 ${folded || !isMyTurn || disabling ? "opacity-50" : ""}`}>
                <div className="flex items-center gap-2 bg-gray-600 rounded-full px-2 py-1 hover:scale-105">
                    <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-white text-xl" />
                    <p className="text-white">{bet}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faWallet} className="text-gray-600" />
                        <p className="text-gray-600">Your Bank</p>
                    </div>
                    <p className="text-white text-5xl text-semilbold">{bank}</p>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <div className="flex justify-center gap-5 fixed bottom-5 left-5">
                    <div className="gap-1 flex justify-center items-center hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => setHelp(true)}>
                            <FontAwesomeIcon icon={faQuestion} className="text-white text-xs rounded-full w-3 border border-gray-400 p-1" />
                            <button className="text-base text-white cursor-pointer">Help</button>
                    </div>
                    <div className="gap-1 flex justify-center items-center hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => setLog(true)}>
                        <FontAwesomeIcon icon={faClockRotateLeft} className="text-white text-xs rounded-full w-3 h-5 border border-gray-400 p-1" />
                        <button className="text-base text-white cursor-pointer">Log</button>
                    </div>
                </div>
                
                {/* Game Action Buttons */}
                {gameStarted && isMyTurn ? (
                    <div className={`flex justify-center gap-7 fixed bottom-4`}>
                        <button 
                            onClick={handleCall}
                            className="relative overflow-hidden group px-5 py-1 text-white text-lg rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-gray-600/50 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            <span className="relative z-10">Call</span>
                        </button>
                        <button 
                            onClick={handleRaise}
                            className="relative overflow-hidden group px-5 py-1 text-green-400 text-lg rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-green-400/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            <span className="relative z-10">Raise</span>
                        </button>
                        <button 
                            onClick={handleFold}
                            className="relative overflow-hidden group px-5 py-1 text-red-400 text-lg rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-red-400/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            <span className="relative z-10">Fold</span>
                        </button>
                    </div>
                ) : !gameStarted && players.length >= 2 ? (
                    <div className="flex justify-center gap-7 fixed bottom-4">
                        <button 
                            onClick={onStartGame}
                            className="relative overflow-hidden group px-5 py-1 text-green-400 text-lg rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            <span className="absolute inset-0 bg-green-400/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            <span className="relative z-10">Start Game</span>
                        </button>
                    </div>
                ) : null}
                
                <Timer timer={timer} setTimer={setTimer} folded={folded} setFolded={setFolded} turn={isMyTurn} setTurn={setTurn} color={`bg-gradient-to-r from-[#001845] via-[#002855] to-[#003d7a]`} />
            </div>
        </div>
        </>
    );
}

export default MultiplayerBlueGameRoom; 