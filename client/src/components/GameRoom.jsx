import ReactCardFlip from "react-card-flip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCircleDollarToSlot, faWallet, faGear, faRightFromBracket, faQuestion, faClockRotateLeft, faAngleDown, faClose } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import '../App.css';
import Popup from 'reactjs-popup';

import User from './User';
import Help from './Help';
import Timer from './Timer';

const GameRoom = () => {
    const cards = [
        "ace_of_hearts.png", "2_of_hearts.png", "3_of_hearts.png", "4_of_hearts.png", "5_of_hearts.png", "6_of_hearts.png", "7_of_hearts.png", "8_of_hearts.png", "9_of_hearts.png", "10_of_hearts.png", "queen_of_hearts.png", "jack_of_hearts.png", "king_of_hearts.png",
        "ace_of_spades.png", "2_of_spades.png", "3_of_spades.png", "4_of_spades.png", "5_of_spades.png", "6_of_spades.png", "7_of_spades.png", "8_of_spades.png", "9_of_spades.png", "10_of_spades.png", "queen_of_spades.png", "jack_of_spades.png", "king_of_spades.png",
        "ace_of_diamonds.png", "2_of_diamonds.png", "3_of_diamonds.png", "4_of_diamonds.png", "5_of_diamonds.png", "6_of_diamonds.png", "7_of_diamonds.png", "8_of_diamonds.png", "9_of_diamonds.png", "10_of_diamonds.png", "queen_of_diamonds.png", "jack_of_diamonds.png", "king_of_diamonds.png",
        "ace_of_clubs.png", "2_of_clubs.png", "3_of_clubs.png", "4_of_clubs.png", "5_of_clubs.png", "6_of_clubs.png", "7_of_clubs.png", "8_of_clubs.png", "9_of_clubs.png", "10_of_clubs.png", "queen_of_clubs.png", "jack_of_clubs.png", "king_of_clubs.png"
    ];

    const [flip1, setFlip1] = useState(false);
    const [flip2, setFlip2] = useState(false);
    const [flip3, setFlip3] = useState(false);
    const [flip4, setFlip4] = useState(false);

    const [userCards, setUserCards] = useState(["ace_of_spades", "ace_of_spades"]);
    const [flopCards, setFlopCards] = useState(["ace_of_spades", "ace_of_spades", "ace_of_spades", "ace_of_spades", "ace_of_spades"]);
    const [compCards, setCompCards] = useState(["ace_of_spades", "ace_of_spades"]);

    const [userMoney, setUserMoney] = useState(250);
    const [bet, setBet] = useState(10);
    const [timer, setTimer] = useState(40);

    const [userObj, setUserObj] = useState([]);
    const [compObj, setCompObj] = useState([]);
    const [flopObj, setFlopObj] = useState([]);

    const [help, setHelp] = useState(false);
    const [profile, setProfile] = useState(false);
    const [log, setLog] = useState(false);

    //shuffling cards
    const shuffleArray = (cards) => {
        const shuffled = [...cards];
        for (let i = 0; i < shuffled.length - 1; i++) {
          const j = Math.floor(Math.random() * (i+1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };
    useEffect(() => {
        const shuffled = shuffleArray(cards);
        setUserCards(shuffled.splice(0,2));
        setFlopCards(shuffled.splice(2,7));
        setCompCards(shuffled.splice(7,9));
    }, []);

    // const handleCall = () => {
        
    // }

    // const handleRaise = () => {

    // }

    //getting rank of card
    const getRank = (card) => {
        if(card[0] == "a") return "A";
        if(card[0] == "j") return "J";
        if(card[0] == "q") return "Q";
        if(card[0] == "k") return "K";
        if(card[0] == "1" && card[1] == "0") return "10";
        return card[0];
    }

    //getting suit of card
    const getSuit = (card) => {
        return card.split('_')[2].split('.')[0];
    }

    //creating object for user cards
    useEffect(() => {
        const user = [
            {"rank": getRank(userCards[0]), "suit": getSuit(userCards[0])},
            {"rank": getRank(userCards[1]), "suit": getSuit(userCards[1])}
        ];
        setUserObj(user);
        console.log(user);
    }, [userCards, flopCards]);

    //creating object for computer cards
    useEffect(() => {
        const comp = [
            {"rank": getRank(compCards[0]), "suit": getSuit(compCards[0])},
            {"rank": getRank(compCards[1]), "suit": getSuit(compCards[1])}
        ];
        setCompObj(comp);
        console.log(comp);
    }, [compCards, flopCards]);

    //creating object for flop cards
    useEffect(() => {
        const flop = [
            {"rank": getRank(flopCards[0]), "suit": getSuit(flopCards[0])},
            {"rank": getRank(flopCards[1]), "suit": getSuit(flopCards[1])},
            {"rank": getRank(flopCards[2]), "suit": getSuit(flopCards[2])},
            {"rank": getRank(flopCards[3]), "suit": getSuit(flopCards[3])},
            {"rank": getRank(flopCards[4]), "suit": getSuit(flopCards[4])}
        ];
        setFlopObj(flop);
        console.log(flop);
    }, [flopCards])

    //handling help popup
    const closeHelp = () => {
        setHelp(false);
    }

    return (
        <>
        <Popup open={help} onClose={closeHelp} modal nested>
            {(close) => <Help close={close} />}
        </Popup>

        {(help || log) && (
            <div className="fixed inset-0 backdrop-blur z-10"></div>
        )}

        {profile && (
            <div className="fixed top-14 right-3 mt-2 w-60 bg-black/40 text-white shadow-lg p-4 z-50">
                <p className="cursor-pointer hover:bg-white/10 p-2">...</p>
                <p className="cursor-pointer hover:bg-white/10 p-2">...</p>
            </div>
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
                <p>no data found</p>
            </div>
        </div>

        <div className="gameroom-bg h-screen">
            <div className="fixed top-0 p-2 px-5 h-13 w-full flex border-b border-gray-800 text-white">
                <div className="w-[33.34%] flex justify-start items-center">name of app</div>
                <div className="w-[33.34%] flex justify-center items-center">table name</div>
                <div className="w-[33.34%] flex justify-end items-center gap-5">
                    <button className="border border-white/30 rounded-full px-4 py-1 hover:bg-white/20 hover:scale-105 cursor-pointer">Get $</button>
                    {/* <div>money</div> */}
                    <button className="flex justify-center items-center gap-2 cursor-pointer hover:scale-105" onClick={() => setProfile(prev => !prev)}>
                        <img src="avatar.jpeg" className="w-9 h-9 rounded-full"/>
                        <FontAwesomeIcon icon={faAngleDown} className="text-gray-300" />
                    </button>
                </div>
            </div>
            <div className="fixed top-15 left-5 flex gap-5 z-1">
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300">
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>
            <div className="relative">
                <div className="fixed top-15 w-full flex gap-2 justify-center items-center">
                    <FontAwesomeIcon icon={faCoins} className="text-gray-300 text-xl" />
                    <p className="text-gray-300 text-lg">Pot</p>
                </div>
                <div className="fixed top-25 w-full flex justify-center">
                    <p className="text-white text-7xl font-semibold">50</p>
                </div>
            </div>
            
            {/* <User flip4={flip4} setFlip4={setFlip4} compCards={compCards} avatarTop={"16.5rem"} avatarLeft={"2.5rem"} cardsTop={"20.25rem"} cardsLeft={"6.75rem"} /> */}
            <User flip3={flip3} flip4={flip4} setFlip4={setFlip4} compCards={compCards} avatarTop={"12.5rem"} avatarLeft={"15.5rem"} cardsTop={"16.25rem"} cardsLeft={"19.75rem"} />
            {/* <User flip4={flip4} setFlip4={setFlip4} compCards={compCards} avatarTop={"8.5rem"} avatarLeft={"28.5rem"} cardsTop={"12.25rem"} cardsLeft={"32.75rem"} /> */}

            {/* <User flip4={flip4} setFlip4={setFlip4} compCards={compCards} avatarTop={"8.5rem"} avatarLeft={"51.5rem"} cardsTop={"12.25rem"} cardsLeft={"55.75rem"} />
            <User flip4={flip4} setFlip4={setFlip4} compCards={compCards} avatarTop={"12.5rem"} avatarLeft={"64.5rem"} cardsTop={"16.25rem"} cardsLeft={"68.75rem"} />
            <User flip4={flip4} setFlip4={setFlip4} compCards={compCards} avatarTop={"16.5rem"} avatarLeft={"77.5rem"} cardsTop={"20.25rem"} cardsLeft={"81.75rem"} /> */}

            <div className="flex justify-center mt-20 items-end gap-5 fixed top-75 w-full">
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => setFlip1(!flip1)} draggable="false"/>
                    <img src={"card-fronts/" + flopCards[0]} className="card flop-card card-front" draggable="false"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => setFlip1(!flip1)} draggable="false"/>
                    <img src={"card-fronts/" + flopCards[1]} className="card flop-card card-front" draggable="false"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => setFlip1(!flip1)} draggable="false"/>
                    <img src={"card-fronts/" + flopCards[2]} className="card flop-card card-front" draggable="false"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip2} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => {if(flip1) setFlip2(!flip2)}} draggable="false"/>
                    <img src={"card-fronts/" + flopCards[3]} className="card flop-card card-front" draggable="false"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip3} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => {if(flip2) setFlip3(!flip3)}} draggable="false"/>
                    <img src={"card-fronts/" + flopCards[4]} className="card flop-card card-front" draggable="false"/>
                </ReactCardFlip>
            </div>

            <div className="flex justify-center items-center relative">
                <div className="flex justify-center fixed bottom-20">
                    <img src={"card-fronts/" + userCards[0]} className="card user-card card-front transform -rotate-12 translate-y-2" draggable="false"/>
                    <img src={"card-fronts/" + userCards[1]} className="card user-card card-front transform rotate-12 translate-y-2 -ml-8" draggable="false"/>
                </div>
            </div>

            <div className="flex items-center fixed bottom-35 right-10 gap-5">
                <div className="flex items-center gap-2 bg-gray-600 rounded-full px-2 py-1 hover:scale-105">
                    <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-white text-xl" />
                    <p className="text-white">{bet}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faWallet} className="text-gray-600" />
                        <p className="text-gray-600">Your Bank</p>
                    </div>
                    <p className="text-white text-5xl text-semilbold">180</p>
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
                <div className="flex justify-center gap-7 fixed bottom-4">
                <button className="relative overflow-hidden group px-5 py-1 text-white text-lg rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <span className="absolute inset-0 bg-gray-600/50 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    <span className="relative z-10">Call</span>
                </button>
                <button className="relative overflow-hidden group px-5 py-1 text-green-400 text-lg rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <span className="absolute inset-0 bg-green-400/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    <span className="relative z-10">Raise</span>
                </button>
                <button className="relative overflow-hidden group px-5 py-1 text-red-400 text-lg rounded-full hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <span className="absolute inset-0 bg-red-400/30 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    <span className="relative z-10">Fold</span>
                </button>
                    {/* <button className="text-lg text-white cursor-pointer rounded-full px-4 hover:scale-110 transition-all duration-300 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gray-700 before:scale-x-0 before:origin-left before:transition-transform hover:before:scale-x-100">Call</button> */}
                    {/* <button className="text-lg text-green-400 cursor-pointer rounded-full p-1 px-4 hover:scale-110 transition-all duration-300 hover:-translate-y-1 hover:rotate-1 hover:shadow-xl">Raise</button>
                    <button className="text-lg text-red-400 cursor-pointer rounded-full p-1 px-4 hover:scale-110 transition-transform duration-300 ">Fold</button> */}
                </div>
                {/* <div className="fixed bottom-10 right-10">
                    <button className="text-lg text-white rounded-full border-3 border-gray-400 py-3 px-5">Your Turn! <span className="text-gray-400">0:{timer < 10 ? `0${timer}` : timer}</span></button>
                </div> */}
                <Timer />
            </div>
        </div>
        </>
    );
}

export default GameRoom;