import { useState, useEffect } from 'react';
import '../../App.css';
import PurpleGameRoom from "../gamerooms/PurpleGameRoom";
import BlueGameRoom from "../gamerooms/BlueGameRoom";
import GreenGameRoom from "../gamerooms/GreenGameRoom";
import PinkGameRoom from "../gamerooms/PinkGameRoom";
import Settings from '../pageComponents/Settings';
import Win from '../pageComponents/Win';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const MainGameRoom = () => {
    const navigate = useNavigate();

    // Remove local shuffle logic
    // const cards = [...];

    const [userCards, setUserCards] = useState(["ace_of_spades", "ace_of_spades"]);
    const [flopCards, setFlopCards] = useState(["ace_of_spades", "ace_of_spades", "ace_of_spades", "ace_of_spades", "ace_of_spades"]);
    const [compCards, setCompCards] = useState(["ace_of_spades", "ace_of_spades"]);

    const [userObj, setUserObj] = useState([]);
    const [compObj, setCompObj] = useState([]);
    const [flopObj, setFlopObj] = useState([]);

    const [theme, setTheme] = useState("purple-theme.png");
    const [settings, setSettings] = useState(false);
    const [avatar, setAvatar] = useState("avatar5.jpeg");
    const [win, setWin] = useState(false);

    // Fetch shuffled and dealt cards from backend
    useEffect(() => {
        fetch('http://localhost:3000/api/shuffle-and-deal')
            .then(res => res.json())
            .then(data => {
                // Debug: log the raw backend data
                console.log('Backend data:', data);

                // Convert backend card objects to frontend filenames
                const cardToFilename = (card) => `${card.rank.toLowerCase()}_of_${card.suit}.png`;

                // Debug: log the filenames being generated
                console.log('User card filenames:', data.userCards.map(cardToFilename));
                console.log('Flop card filenames:', data.flopCards.map(cardToFilename));
                console.log('Comp card filenames:', data.compCards.map(cardToFilename));

                setUserCards(data.userCards.map(cardToFilename));
                setFlopCards(data.flopCards.map(cardToFilename));
                setCompCards(data.compCards.map(cardToFilename));
            });
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

    //getting theme from local storage
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            setTheme(theme);
        }
    }, []);

    if(theme === "purple-theme.png") return (
        <>
            {settings && <Settings setSettings={setSettings} setTheme={setTheme} color={`bg-[#10002b]/80`} />}

            {win && <Win win={win} setWin={setWin} />}

            <div className="fixed top-15 left-5 flex gap-5 z-1">
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => setSettings(true)}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => navigate('/lobby')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>

            <PurpleGameRoom userCards={userCards} flopCards={flopCards} compCards={compCards} settings={settings} win={win} />
        </>
    );

    else if(theme === "blue-theme.png") return ( 
        <>
            {settings && <Settings setSettings={setSettings} setTheme={setTheme} color={`bg-[#001845]/80`} />}

            {win && <Win win={win} setWin={setWin} />}

            <div className="fixed top-15 left-5 flex gap-5 z-1">
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => setSettings(true)}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => navigate('/lobby')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>

            <BlueGameRoom userCards={userCards} flopCards={flopCards} compCards={compCards} settings={settings} />
        </>
    )

    else if(theme === "green-theme.png") return ( 
        <>
            {settings && <Settings setSettings={setSettings} setTheme={setTheme} color={`bg-[#081c15]/80`} />}

            {win && <Win win={win} setWin={setWin} />}

            <div className="fixed top-15 left-5 flex gap-5 z-1">
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => setSettings(true)}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => navigate('/lobby')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>

            <GreenGameRoom userCards={userCards} flopCards={flopCards} compCards={compCards} settings={settings} />
        </>
    )

    else if(theme === "pink-theme.png") return ( 
        <>
            {settings && <Settings setSettings={setSettings} setTheme={setTheme} color={`bg-[#590d22]/80`} />}

            {win && <Win win={win} setWin={setWin} />}

            <div className="fixed top-15 left-5 flex gap-5 z-1">
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => setSettings(true)}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => navigate('/lobby')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>

            <PinkGameRoom userCards={userCards} flopCards={flopCards} compCards={compCards} settings={settings}  />
        </>
    )
}

export default MainGameRoom;