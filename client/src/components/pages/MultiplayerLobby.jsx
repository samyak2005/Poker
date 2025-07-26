import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPlay, faUsers } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../config';

const MultiplayerLobby = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playerName, setPlayerName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('avatar5.jpeg');
    const [selectedTheme, setSelectedTheme] = useState('purple');
    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [newRoomId, setNewRoomId] = useState('');

    const avatars = ["avatar1.jpeg", "avatar2.jpeg", "avatar3.jpeg", "avatar4.jpeg", "avatar5.jpeg", "avatar6.jpeg"];
    const themes = [
        { id: 'purple', name: 'Purple', image: 'purple-theme.png' },
        { id: 'blue', name: 'Blue', image: 'blue-theme.png' },
        { id: 'green', name: 'Green', image: 'green-theme.png' },
        { id: 'pink', name: 'Pink', image: 'pink-theme.png' }
    ];

    useEffect(() => {
        fetchRooms();
        const interval = setInterval(fetchRooms, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await fetch(`${API_URL}/api/rooms`);
            const data = await response.json();
            setRooms(data.rooms);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setLoading(false);
        }
    };

    const handleJoinRoom = (roomId) => {
        if (!playerName.trim()) {
            alert('Please enter your name first!');
            return;
        }
        
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('playerAvatar', selectedAvatar);
        localStorage.setItem('roomId', roomId);
        localStorage.setItem('selectedTheme', selectedTheme);
        
        navigate('/multiplayer-game', { state: { roomId, playerName, avatar: selectedAvatar, theme: selectedTheme } });
    };

    const handleCreateRoom = () => {
        if (!playerName.trim()) {
            alert('Please enter your name first!');
            return;
        }
        
        const roomId = newRoomId.trim() || `room-${Date.now()}`;
        
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('playerAvatar', selectedAvatar);
        localStorage.setItem('roomId', roomId);
        localStorage.setItem('selectedTheme', selectedTheme);
        
        navigate('/multiplayer-game', { state: { roomId, playerName, avatar: selectedAvatar, theme: selectedTheme } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-bounce"></div>
                <div className="absolute top-0 right-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-violet-600 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-bounce"></div>
            </div>

            <div className="container mx-auto px-6 py-6 max-h-screen overflow-y-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="mb-3">
                        <img 
                            src="chipinn-text.png" 
                            alt="ChipInn Poker" 
                            className="w-48 h-auto mx-auto mb-2 drop-shadow-2xl animate-pulse hover:scale-105 transition-transform duration-300 filter brightness-110 contrast-125"
                            draggable="false"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-3">
                        <span className="text-xl">🎮</span>
                        <h1 className="text-2xl font-black bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                            GAME LOBBY
                        </h1>
                        <span className="text-xl">🔥</span>
                    </div>
                    <p className="text-lg text-white/90 font-medium">
                        Pick your vibe and join the action! 
                        <span className="text-yellow-300 font-bold"> NO WAITING</span> ✨
                    </p>
                </div>

                {/* Player Setup */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">👤</span>
                        <h2 className="text-xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                            YOUR PROFILE
                        </h2>
                    </div>
                    
                    {/* Player Name */}
                    <div className="mb-4">
                        <label className="block text-base font-bold mb-2 text-white/90">🎯 GAMER TAG</label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="w-full px-4 py-3 bg-white/20 rounded-xl border-2 border-white/30 focus:outline-none focus:border-pink-400 focus:bg-white/30 transition-all duration-300 text-base font-medium"
                            placeholder="Enter your epic gamer name..."
                        />
                    </div>

                    {/* Avatar Selection */}
                    <div className="mb-4">
                        <label className="block text-lg font-bold mb-2 text-white/90">🎭 PICK YOUR VIBE</label>
                        <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pb-4 px-2 pt-2">
                            {avatars.map((avatar, index) => (
                                <label key={index} className="cursor-pointer group flex-shrink-0 p-2">
                                    <input
                                        type="radio"
                                        name="avatar"
                                        value={avatar}
                                        checked={selectedAvatar === avatar}
                                        onChange={(e) => setSelectedAvatar(e.target.value)}
                                        className="hidden"
                                    />
                                    <div className={`relative transition-all duration-300 ${
                                        selectedAvatar === avatar 
                                            ? 'scale-110 ring-4 ring-pink-400 ring-offset-2 ring-offset-purple-900' 
                                            : 'group-hover:scale-105 ring-2 ring-white/30 group-hover:ring-white/60'
                                    }`}>
                                        <img
                                            src={avatar}
                                            className="w-14 h-14 rounded-full border-2 border-white/20"
                                            alt={`Avatar ${index + 1}`}
                                        />
                                        {selectedAvatar === avatar && (
                                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-pink-400 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Theme Selection */}
                    <div className="mb-4">
                        <label className="block text-base font-bold mb-2 text-white/90">🎨 TABLE VIBES</label>
                        <div className="grid grid-cols-2 gap-4">
                            {themes.map((theme) => (
                                <label key={theme.id} className="cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="theme"
                                        value={theme.id}
                                        checked={selectedTheme === theme.id}
                                        onChange={(e) => setSelectedTheme(e.target.value)}
                                        className="hidden"
                                    />
                                    <div className={`relative rounded-xl border-2 transition-all duration-300 overflow-hidden transform ${
                                        selectedTheme === theme.id 
                                            ? 'border-pink-400 scale-105 ring-2 ring-pink-400 ring-offset-2 ring-offset-purple-900 z-10' 
                                            : 'border-white/30 group-hover:border-white/60 group-hover:scale-105'
                                    }`}>
                                        <img
                                            src={theme.image}
                                            className="w-full h-20 object-cover"
                                            alt={`${theme.name} theme`}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-2">
                                            <span className="text-white font-bold text-base">{theme.name.toUpperCase()}</span>
                                        </div>
                                        {selectedTheme === theme.id && (
                                            <div className="absolute top-2 right-2 w-5 h-5 bg-pink-400 rounded-full flex items-center justify-center">
                                                <span className="text-white text-xs">✓</span>
                                            </div>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Create Room */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/20 shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">🏠</span>
                            <h2 className="text-xl font-black bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                CREATE ROOM
                            </h2>
                        </div>
                        <button
                            onClick={() => setShowCreateRoom(!showCreateRoom)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            {showCreateRoom ? 'Cancel' : 'Create Room'}
                        </button>
                    </div>
                    
                    {showCreateRoom && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-base font-bold mb-2 text-white/90">🏷️ ROOM NAME (OPTIONAL)</label>
                                <input
                                    type="text"
                                    value={newRoomId}
                                    onChange={(e) => setNewRoomId(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/20 rounded-xl border-2 border-white/30 focus:outline-none focus:border-green-400 focus:bg-white/30 transition-all duration-300 text-base font-medium"
                                    placeholder="Leave empty for auto-generated name..."
                                />
                            </div>
                            <button
                                onClick={handleCreateRoom}
                                className="w-full px-4 py-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                            >
                                🚀 CREATE & JOIN ROOM
                            </button>
                        </div>
                    )}
                </div>

                {/* Available Rooms */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">🎯</span>
                        <h2 className="text-xl font-black bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                            ACTIVE ROOMS
                        </h2>
                    </div>
                    
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-pink-400 mx-auto mb-3"></div>
                            <p className="text-lg text-white/90 font-medium">Loading epic rooms...</p>
                            <p className="text-white/60 mt-1">Finding the best tables for you! 🔥</p>
                        </div>
                    ) : rooms.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-5xl mb-3">🎮</div>
                            <p className="text-xl text-white/90 font-bold mb-2">NO ACTIVE ROOMS</p>
                            <p className="text-base text-white/70 mb-3">Be the first to create one!</p>
                            <button
                                onClick={() => setShowCreateRoom(true)}
                                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg"
                            >
                                🚀 CREATE FIRST ROOM
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                            {rooms.map((room) => (
                                <div key={room.id} className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-black text-lg text-white mb-1">{room.id}</h3>
                                            <div className="flex items-center gap-3 text-white/80">
                                                <span className="flex items-center gap-1">
                                                    <span className="text-base">👥</span>
                                                    <span className="font-bold">{room.playerCount}/{room.maxPlayers}</span>
                                                </span>
                                                {room.gameStarted && (
                                                    <span className="flex items-center gap-1 text-yellow-300 font-bold">
                                                        <span className="text-base">🎮</span>
                                                        <span>GAME ON!</span>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleJoinRoom(room.id)}
                                            disabled={room.playerCount >= room.maxPlayers || room.gameStarted}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                                                room.playerCount >= room.maxPlayers || room.gameStarted
                                                    ? 'bg-gray-600 cursor-not-allowed opacity-50'
                                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg'
                                            }`}
                                        >
                                            <FontAwesomeIcon icon={faPlay} />
                                            {room.playerCount >= room.maxPlayers || room.gameStarted ? 'FULL' : 'JOIN'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-105 shadow-lg border border-white/20"
                    >
                        ← BACK TO MENU
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MultiplayerLobby; 