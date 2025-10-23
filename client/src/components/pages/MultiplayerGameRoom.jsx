import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlay, faUsers, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import '../../App.css';
import { API_URL } from '../../config';
import MultiplayerPurpleGameRoom from '../gamerooms/MultiplayerPurpleGameRoom';
import MultiplayerBlueGameRoom from '../gamerooms/MultiplayerBlueGameRoom';
import MultiplayerGreenGameRoom from '../gamerooms/MultiplayerGreenGameRoom';
import MultiplayerPinkGameRoom from '../gamerooms/MultiplayerPinkGameRoom';
import Settings from '../pageComponents/Settings';
import Win from '../pageComponents/Win';

const MultiplayerGameRoom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [socket, setSocket] = useState(null);
    const [connected, setConnected] = useState(false);
    const [roomId, setRoomId] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [players, setPlayers] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [pot, setPot] = useState(0);
    const [currentBet, setCurrentBet] = useState(0);
    const [minimumRaise, setMinimumRaise] = useState(20);
    const [bettingRound, setBettingRound] = useState(0);
    const [myCards, setMyCards] = useState([]);
    const [communityCards, setCommunityCards] = useState([]);
    const [isMyTurn, setIsMyTurn] = useState(false);
    const [theme, setTheme] = useState("purple");
    const [settings, setSettings] = useState(false);
    const [win, setWin] = useState(false);
    const [gameEnd, setGameEnd] = useState(null);

    //getting theme from local storage
    useEffect(() => {
        const storedTheme = localStorage.getItem("selectedTheme");
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        // Get player info from location state or localStorage
        const { roomId: stateRoomId, playerName: statePlayerName, avatar: stateAvatar, startingChips: stateStartingChips } = location.state || {};
        const storedRoomId = localStorage.getItem('roomId');
        const storedPlayerName = localStorage.getItem('playerName');
        const storedAvatar = localStorage.getItem('playerAvatar');
        const storedStartingChips = localStorage.getItem('startingChips');

        setRoomId(stateRoomId || storedRoomId);
        setPlayerName(statePlayerName || storedPlayerName);
        setAvatar(stateAvatar || storedAvatar);

        // Store startingChips in a ref or state to use when joining
        window.playerStartingChips = parseInt(stateStartingChips || storedStartingChips || 1000);

        // Connect to Socket.IO server
        const newSocket = io(API_URL);
        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [location.state]);

    useEffect(() => {
        if (!socket || !roomId || !playerName) return;

        // Join room with starting chips
        const startingChips = window.playerStartingChips || 1000;
        socket.emit('joinRoom', { roomId, playerName, avatar, startingChips });

        // Socket event listeners
        socket.on('connect', () => {
            console.log('Connected to server');
            setConnected(true);
        });

        socket.on('playerJoined', ({ player, players: roomPlayers, roomId: joinedRoomId }) => {
            console.log('Player joined:', player);
            setPlayers(roomPlayers);
        });

        socket.on('playerLeft', ({ playerId, players: roomPlayers }) => {
            console.log('Player left:', playerId);
            setPlayers(roomPlayers);
        });

        socket.on('gameStarted', ({ players: roomPlayers, communityCards: flopCards, currentTurn: turn, pot: roomPot, currentBet: bet, minimumRaise: minRaise, bettingRound: round, dealerIndex }) => {
            console.log('Game started!');
            setGameStarted(true);
            setPlayers(roomPlayers);
            setCommunityCards(flopCards);
            setCurrentTurn(turn);
            setPot(roomPot);
            setCurrentBet(bet);
            setMinimumRaise(minRaise);
            setBettingRound(round);
            
            // Find my cards
            const myPlayer = roomPlayers.find(p => p.name === playerName);
            if (myPlayer) {
                setMyCards(myPlayer.cards);
            }
        });

        socket.on('playerAction', ({ playerId, action, amount, currentTurn: turn, pot: roomPot, currentBet: bet, minimumRaise: minRaise, bettingRound: round, players: roomPlayers, communityCards: flopCards }) => {
            console.log('Player action:', action, amount);
            setCurrentTurn(turn);
            setPot(roomPot);
            setCurrentBet(bet);
            setMinimumRaise(minRaise);
            setBettingRound(round);
            setPlayers(roomPlayers);
            setCommunityCards(flopCards);
            
            // Check if it's my turn
            const myPlayer = roomPlayers.find(p => p.name === playerName);
            if (myPlayer) {
                setIsMyTurn(myPlayer.id === socket.id && turn === roomPlayers.findIndex(p => p.id === socket.id));
            }
        });

        socket.on('roomFull', ({ message }) => {
            alert(message);
            navigate('/multiplayer-lobby');
        });

        socket.on('gameError', ({ message }) => {
            alert(message);
        });

        socket.on('gameEnd', ({ winner, winners, pot: roomPot, players: roomPlayers }) => {
            console.log('Game ended!');
            setGameEnd({ winner, winners });
            setPot(roomPot);
            setPlayers(roomPlayers);
        });

        socket.on('newHand', ({ players: roomPlayers, communityCards: flopCards, currentTurn: turn, pot: roomPot, currentBet: bet, minimumRaise: minRaise, bettingRound: round }) => {
            console.log('New hand started!');
            setGameEnd(null);
            setGameStarted(true);
            setPlayers(roomPlayers);
            setCommunityCards(flopCards);
            setCurrentTurn(turn);
            setPot(roomPot);
            setCurrentBet(bet);
            setMinimumRaise(minRaise);
            setBettingRound(round);
            
            // Find my cards
            const myPlayer = roomPlayers.find(p => p.name === playerName);
            if (myPlayer) {
                setMyCards(myPlayer.cards);
            }
        });

        return () => {
            socket.off('connect');
            socket.off('playerJoined');
            socket.off('playerLeft');
            socket.off('gameStarted');
            socket.off('playerAction');
            socket.off('roomFull');
            socket.off('gameError');
            socket.off('gameEnd');
            socket.off('newHand');
        };
    }, [socket, roomId, playerName, avatar, navigate]);

    const handleStartGame = () => {
        if (socket && roomId) {
            socket.emit('startGame', { roomId });
        }
    };

    const handlePlayerAction = (action, amount = 0) => {
        if (socket && roomId) {
            socket.emit('playerAction', { roomId, action, amount });
        }
    };

    const handleLeaveRoom = () => {
        if (socket) {
            socket.disconnect();
        }
        navigate('/multiplayer-lobby');
    };

    // Common props for all game room components
    const gameRoomProps = {
        players,
        myCards,
        communityCards,
        settings,
        win,
        isMyTurn,
        currentTurn,
        pot,
        currentBet,
        minimumRaise,
        bettingRound,
        gameEnd,
        onPlayerAction: handlePlayerAction,
        onStartGame: handleStartGame,
        gameStarted,
        connected,
        roomId,
        playerName
    };

    // Render the appropriate game room based on theme
    const renderGameRoom = () => {
        switch (theme) {
            case 'blue':
                return <MultiplayerBlueGameRoom {...gameRoomProps} />;
            case 'green':
                return <MultiplayerGreenGameRoom {...gameRoomProps} />;
            case 'pink':
                return <MultiplayerPinkGameRoom {...gameRoomProps} />;
            case 'purple':
            default:
                return <MultiplayerPurpleGameRoom {...gameRoomProps} />;
        }
    };

    return (
        <>
            {settings && <Settings setSettings={setSettings} setTheme={setTheme} color={`bg-[#10002b]/80`} />}

            {win && <Win win={win} setWin={setWin} />}

            <div className="fixed top-15 left-5 flex gap-5 z-1">
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={() => setSettings(true)}>
                    <FontAwesomeIcon icon={faGear} />
                </div>
                <div className="text-gray-300 cursor-pointer hover:scale-120 hover:text-white transition-transform duration-300" onClick={handleLeaveRoom}>
                    <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
            </div>

            {renderGameRoom()}
        </>
    );
};

export default MultiplayerGameRoom; 