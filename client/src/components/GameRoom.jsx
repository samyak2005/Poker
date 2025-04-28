import ReactCardFlip from "react-card-flip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCircleDollarToSlot, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import '../App.css';

const GameRoom = () => {
    const [flip1, setFlip1] = useState(false);
    const [flip2, setFlip2] = useState(false);
    const [flip3, setFlip3] = useState(false);
    const [flip4, setFlip4] = useState(false);

    const [userCards, setUserCards] = useState(["ace_of_spades", "ace_of_spades"]);
    const [flopCards, setFlopCards] = useState(["ace_of_spades", "ace_of_spades", "ace_of_spades", "ace_of_spades", "ace_of_spades"]);
    const [compCards, setCompCards] = useState(["ace_of_spades", "ace_of_spades"]);

    const [userMoney, setUserMoney] = useState(250);
    const [bet, setBet] = useState(10);
    const [timer, setTimer] = useState(59);

    const [userObj, setUserObj] = useState([]);
    const [compObj, setCompObj] = useState([]);
    const [flopObj, setFlopObj] = useState([]);

    const cards = [
        "ace_of_hearts.png", "2_of_hearts.png", "3_of_hearts.png", "4_of_hearts.png", "5_of_hearts.png", "6_of_hearts.png", "7_of_hearts.png", "8_of_hearts.png", "9_of_hearts.png", "10_of_hearts.png", "queen_of_hearts.png", "jack_of_hearts.png", "king_of_hearts.png",
        "ace_of_spades.png", "2_of_spades.png", "3_of_spades.png", "4_of_spades.png", "5_of_spades.png", "6_of_spades.png", "7_of_spades.png", "8_of_spades.png", "9_of_spades.png", "10_of_spades.png", "queen_of_spades.png", "jack_of_spades.png", "king_of_spades.png",
        "ace_of_diamonds.png", "2_of_diamonds.png", "3_of_diamonds.png", "4_of_diamonds.png", "5_of_diamonds.png", "6_of_diamonds.png", "7_of_diamonds.png", "8_of_diamonds.png", "9_of_diamonds.png", "10_of_diamonds.png", "queen_of_diamonds.png", "jack_of_diamonds.png", "king_of_diamonds.png",
        "ace_of_clubs.png", "2_of_clubs.png", "3_of_clubs.png", "4_of_clubs.png", "5_of_clubs.png", "6_of_clubs.png", "7_of_clubs.png", "8_of_clubs.png", "9_of_clubs.png", "10_of_clubs.png", "queen_of_clubs.png", "jack_of_clubs.png", "king_of_clubs.png"
    ];

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

    const getRank = (card) => {
        if(card[0] == "a") return "A";
        if(card[0] == "j") return "J";
        if(card[0] == "q") return "Q";
        if(card[0] == "k") return "K";
        if(card[0] == "1" && card[1] == "0") return "10";
        return card[0];
    }

    const getSuit = (card) => {
        return card.split('_')[2].split('.')[0];
    }

    //getting rank and suit of usercards
    useEffect(() => {
        const user = [
            {"rank": getRank(userCards[0]), "suit": getSuit(userCards[0])},
            {"rank": getRank(userCards[1]), "suit": getSuit(userCards[1])}
        ];
        setUserObj(user);
        console.log(user);
    }, [userCards, flopCards]);

    //getting rank and suit of compcards
    useEffect(() => {
        const comp = [
            {"rank": getRank(compCards[0]), "suit": getSuit(compCards[0])},
            {"rank": getRank(compCards[1]), "suit": getSuit(compCards[1])}
        ];
        setCompObj(comp);
        console.log(comp);
    }, [compCards, flopCards]);

    //getting rank and suit of flopcards
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

    //timer
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prev => {
                if (prev === 0) return 0;
                return prev - 1;
            });
        }, 1000);
    
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="gameroom-bg h-screen">
            <div className="relative">
                <div className="fixed top-10 w-full flex gap-2 justify-center items-center">
                    <FontAwesomeIcon icon={faCoins} className="text-gray-300 text-xl" />
                    <p className="text-gray-300 text-lg">Pot</p>
                </div>
                <div className="fixed top-20 w-full flex justify-center">
                    <p className="text-white text-8xl text-bold">50</p>
                </div>
            </div>
            <div className="computer flex flex-col relative">
                <div className="flex flex-col items-center gap-2 fixed top-55 left-55">
                    <div className="bg-white rounded-full h-30 w-30"></div>
                    <div>
                        <p className="text-white text-3xl text-semibold mt-10">Tom</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCoins} className="text-gray-300 text-xl" />
                        <p className="text-gray-300 text-lg">180</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-600 rounded-full px-2 py-1">
                        <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-white text-xl" />
                        <p className="text-white">{bet}</p>
                    </div>
                </div>

                <div className="flex fixed top-70 left-70">
                    <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                        <img src="card-back.jpeg" className="rounded-lg card comp-card transform -rotate-12 translate-y-2" onClick={() => setFlip4(!flip4)}/>
                        <img src={"card-fronts/" + compCards[0]} className="card comp-card card-front transform -rotate-12 translate-y-2"/>
                    </ReactCardFlip>
                    <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                        <img src="card-back.jpeg" className="rounded-lg card comp-card transform rotate-12 translate-y-2" onClick={() => setFlip4(!flip4)}/>
                        <img src={"card-fronts/" + compCards[1]} className="card comp-card card-front transform rotate-12 translate-y-2"/>
                    </ReactCardFlip>
                </div>
            </div>
            <div className="flex justify-center mt-20 items-end gap-5 fixed top-60 left-[34%]">
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => setFlip1(!flip1)}/>
                    <img src={"card-fronts/" + flopCards[0]} className="card flop-card card-front"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => setFlip1(!flip1)}/>
                    <img src={"card-fronts/" + flopCards[1]} className="card flop-card card-front"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => setFlip1(!flip1)}/>
                    <img src={"card-fronts/" + flopCards[2]} className="card flop-card card-front"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip2} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => setFlip2(!flip2)}/>
                    <img src={"card-fronts/" + flopCards[3]} className="card flop-card card-front"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip3} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card flop-card" onClick={() => setFlip3(!flip3)}/>
                    <img src={"card-fronts/" + flopCards[4]} className="card flop-card card-front"/>
                </ReactCardFlip>
            </div>

            <div className="flex justify-center items-center relative">
                <div className="flex justify-center fixed bottom-20">
                    <img src={"card-fronts/" + userCards[0]} className="card user-card card-front transform -rotate-12 translate-y-2"/>
                    <img src={"card-fronts/" + userCards[1]} className="card user-card card-front transform rotate-12 translate-y-2 -ml-8"/>
                </div>
            </div>

            <div className="flex items-center fixed bottom-35 right-10 gap-5">
                <div className="flex items-center gap-2 bg-gray-600 rounded-full px-2 py-1">
                    <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-white text-xl" />
                    <p className="text-white">{bet}</p>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center justify-center gap-2">
                        <FontAwesomeIcon icon={faWallet} className="text-gray-600" />
                        <p className="text-gray-600">Your Bank</p>
                    </div>
                    <p className="text-white text-5xl">180</p>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <div className="flex justify-center gap-15 fixed bottom-5">
                    <button className="text-lg text-white cursor-pointer">Call</button>
                    <button className="text-lg text-green-400 cursor-pointer">Raise</button>
                    <button className="text-lg text-red-400 cursor-pointer">Fold</button>
                </div>
                <div className="fixed bottom-10 right-10">
                    <button className="text-lg text-white cursor-pointer rounded-full border-3 border-gray-400 py-3 px-5">Your Turn! <span className="text-gray-400">0:{timer < 10 ? `0${timer}` : timer}</span></button>
                </div>
            </div>
        </div>
    );
}

export default GameRoom;