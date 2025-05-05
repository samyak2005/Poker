import { useState, useEffect } from 'react';
import '../App.css';
import PurpleGameRoom from "./PurpleGameRoom";
import BlueGameRoom from "./BlueGameRoom";
import Settings from './Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCircleDollarToSlot, faWallet, faGear, faRightFromBracket, faQuestion, faClockRotateLeft, faAngleDown, faClose } from '@fortawesome/free-solid-svg-icons';

const GameRoom = () => {
    const cards = [
        "ace_of_hearts.png", "2_of_hearts.png", "3_of_hearts.png", "4_of_hearts.png", "5_of_hearts.png", "6_of_hearts.png", "7_of_hearts.png", "8_of_hearts.png", "9_of_hearts.png", "10_of_hearts.png", "queen_of_hearts.png", "jack_of_hearts.png", "king_of_hearts.png",
        "ace_of_spades.png", "2_of_spades.png", "3_of_spades.png", "4_of_spades.png", "5_of_spades.png", "6_of_spades.png", "7_of_spades.png", "8_of_spades.png", "9_of_spades.png", "10_of_spades.png", "queen_of_spades.png", "jack_of_spades.png", "king_of_spades.png",
        "ace_of_diamonds.png", "2_of_diamonds.png", "3_of_diamonds.png", "4_of_diamonds.png", "5_of_diamonds.png", "6_of_diamonds.png", "7_of_diamonds.png", "8_of_diamonds.png", "9_of_diamonds.png", "10_of_diamonds.png", "queen_of_diamonds.png", "jack_of_diamonds.png", "king_of_diamonds.png",
        "ace_of_clubs.png", "2_of_clubs.png", "3_of_clubs.png", "4_of_clubs.png", "5_of_clubs.png", "6_of_clubs.png", "7_of_clubs.png", "8_of_clubs.png", "9_of_clubs.png", "10_of_clubs.png", "queen_of_clubs.png", "jack_of_clubs.png", "king_of_clubs.png"
    ];

    const [userCards, setUserCards] = useState(["ace_of_spades", "ace_of_spades"]);
    const [flopCards, setFlopCards] = useState(["ace_of_spades", "ace_of_spades", "ace_of_spades", "ace_of_spades", "ace_of_spades"]);
    const [compCards, setCompCards] = useState(["ace_of_spades", "ace_of_spades"]);

    const [userObj, setUserObj] = useState([]);
    const [compObj, setCompObj] = useState([]);
    const [flopObj, setFlopObj] = useState([]);

    const [theme, setTheme] = useState("purple-theme.png");
    const [settings, setSettings] = useState(false);
    const [avatar, setAvatar] = useState("avatar5.jpeg");

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
    }, [userCards, flopCards]);

    //creating object for computer cards
    useEffect(() => {
        const comp = [
            {"rank": getRank(compCards[0]), "suit": getSuit(compCards[0])},
            {"rank": getRank(compCards[1]), "suit": getSuit(compCards[1])}
        ];
        setCompObj(comp);
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
    }, [flopCards])

        //handling call, raise and fold
    // const handleCall = () => {
    //     setPot(prev => prev + bet);
    //     setBank(prev => prev - bet);

    //     setTurn(false);
    //     setCalled(true);
    // }
    // useEffect(() => {
    //     if(turn) return;

    //     setTimeout(() => {
    //         setTurn(true);
    //         setCalled(false);
    //         setPot(prev => prev + bet);

    //         if(!flip1  && called) setFlip1(!flip1);
    //         else if(!flip2 && called) setFlip2(!flip2);
    //         else if(!flip3  && called) setFlip3(!flip3);
    //         else if(!flip4  && called) setFlip4(!flip4);
    //     }, 1000);

    //     setTimeout(() => {
    //         if(flip3 && called) {
    //             alert('you either won or lost, idk i dont have data from backend :3');
    //             window.location.reload();
    //         }
    //     }, 1500)
    // }, [called, turn]);
    // const handleRaise = () => {
    //     setBank(prev => prev - bet*2);
    //     setPot(prev => prev + bet*2);
    //     setBet(prev => prev*2);

    //     // setCalled(true);
    //     setTurn(false);
    // }
    // const handleFold = () => {
    //     setFolded(true);
    // }
    // useEffect(() => {
    //     if(!turn || called) setTimer(40);
    // }, []);

    if(theme === "purple-theme.png") return (
        <>
            {settings && <Settings setSettings={setSettings} setAvatar={setAvatar} setTheme={setTheme} color={`bg-[#10002b]/80`} />}

            <div className="fixed top-15 left-5 flex gap-5 z-1">
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => setSettings(true)}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => navigate('/lobby')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>

            <PurpleGameRoom userCards={userCards} flopCards={flopCards} compCards={compCards} />
        </>
    );

    else if(theme === "blue-theme.png") return ( 
        <>
            {settings && <Settings setSettings={setSettings} setAvatar={setAvatar} setTheme={setTheme} color={`bg-[#001845]/80`} />}

            <div className="fixed top-15 left-5 flex gap-5 z-1">
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => setSettings(true)}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => navigate('/lobby')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>

            <BlueGameRoom />
        </>
    )
}

export default GameRoom;