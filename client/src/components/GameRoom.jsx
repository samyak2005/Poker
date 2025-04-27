import ReactCardFlip from "react-card-flip";
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

    const [userObj, setUserObj] = useState([]);
    const [compObj, setCompObj] = useState([]);

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
        return card[0];
    }

    const getSuit = (card) => {
        return card.split('_')[2].split('.')[0];
    }

    //getting rank and suit of usercards
    useEffect(() => {
        const user = [
            {"rank": getRank(userCards[0]), "suit": getSuit(userCards[0])},
            {"rank": getRank(userCards[1]), "suit": getSuit(userCards[1])},
            {"rank": getRank(flopCards[0]), "suit": getSuit(flopCards[0])},
            {"rank": getRank(flopCards[1]), "suit": getSuit(flopCards[1])},
            {"rank": getRank(flopCards[2]), "suit": getSuit(flopCards[2])},
            {"rank": getRank(flopCards[3]), "suit": getSuit(flopCards[3])},
            {"rank": getRank(flopCards[4]), "suit": getSuit(flopCards[4])}
        ];
        setUserObj(user);
        // console.log(user);
    }, [userCards, flopCards])

    //getting rank and suit of compcards
    useEffect(() => {
        const comp = [
            {"rank": getRank(compCards[0]), "suit": getSuit(compCards[0])},
            {"rank": getRank(compCards[1]), "suit": getSuit(compCards[1])},
            {"rank": getRank(flopCards[0]), "suit": getSuit(flopCards[0])},
            {"rank": getRank(flopCards[1]), "suit": getSuit(flopCards[1])},
            {"rank": getRank(flopCards[2]), "suit": getSuit(flopCards[2])},
            {"rank": getRank(flopCards[3]), "suit": getSuit(flopCards[3])},
            {"rank": getRank(flopCards[4]), "suit": getSuit(flopCards[4])}
        ];
        setCompObj(comp);
        // console.log(comp);
    }, [compCards, flopCards])

    return (
        <div className="gameroom-bg h-screen">
            <div className="computer h-[37vh] flex flex-col justify-center items-center gap-2">
                <div className="flex flex-col justify-center items-center">
                    <div className="bg-black rounded-full h-20 w-20 mb-2"></div>
                    <p className="text-white text-lg text-semibold">Computer</p>
                    <p className="text-white text-xl text-semibold">$250</p>
                </div>
                <div className="flex gap-5">
                    {/* <img src="card-back.jpeg" className="rounded-lg card"/>
                    <img src="card-back.jpeg" className="rounded-lg card"/> */}
                    <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                        <img src="card-back.jpeg" className="rounded-lg card" onClick={() => setFlip4(!flip4)}/>
                        <img src={"card-fronts/" + compCards[0]} className="card card-front"/>
                    </ReactCardFlip>
                    <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                        <img src="card-back.jpeg" className="rounded-lg card" onClick={() => setFlip4(!flip4)}/>
                        <img src={"card-fronts/" + compCards[1]} className="card card-front"/>
                    </ReactCardFlip>
                </div>
            </div>
            <div className="h-[37vh] flex justify-center items-center gap-5">
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card" onClick={() => setFlip1(!flip1)}/>
                    <img src={"card-fronts/" + flopCards[0]} className="card card-front"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card" onClick={() => setFlip1(!flip1)}/>
                    <img src={"card-fronts/" + flopCards[1]} className="card card-front"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip1} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card" onClick={() => setFlip1(!flip1)}/>
                    <img src={"card-fronts/" + flopCards[2]} className="card card-front"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip2} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card" onClick={() => setFlip2(!flip2)}/>
                    <img src={"card-fronts/" + flopCards[3]} className="card card-front"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip3} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card" onClick={() => setFlip3(!flip3)}/>
                    <img src={"card-fronts/" + flopCards[4]} className="card card-front"/>
                </ReactCardFlip>
            </div>

            <div className="flex gap-45 justify-center items-center h-[25vh]">
                <div className="flex flex-col justify-center items-center ml-5 opacity-0">
                    <div className="bg-black rounded-full h-20 w-20 mb-2"></div>
                    <p className="text-white text-lg text-semibold">You</p>
                    <p className="text-white text-xl text-semibold">$250</p>
                </div>
                <div>
                    <button className="bg-[#95D3F0] py-3 px-6 rounded-3xl text-2xl text-white text-bold cursor-pointer" onClick={handleCall}>Call {bet}</button>
                </div>
                <div className="flex justify-center items-center gap-5">
                    <img src={"card-fronts/" + userCards[0]} className="card card-front"/>
                    <img src={"card-fronts/" + userCards[1]} className="card card-front"/>
                </div>
                <div>
                    <button className="bg-[#95D3F0] py-3 px-6 rounded-3xl text-2xl text-white text-bold cursor-pointer" onClick={handleRaise}>Raise {bet*2}</button>
                </div>
                <div className="flex flex-col justify-center items-center mr-5">
                    <div className="bg-black rounded-full h-20 w-20 mb-2"></div>
                    <p className="text-white text-lg text-semibold">You</p>
                    <p className="text-white text-xl text-semibold">${userMoney}</p>
                </div>
            </div>
        </div>
    );
}

export default GameRoom;