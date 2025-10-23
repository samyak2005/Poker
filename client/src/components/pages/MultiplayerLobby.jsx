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

    // Fetch available rooms
    useEffect(() => {
        fetchRooms();
        const interval = setInterval(fetchRooms, 5000); // Refresh every 5 seconds
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
        
        // Store player info in localStorage for the game room
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
        
        // Store player info in localStorage for the game room
        localStorage.setItem('playerName', playerName);
        localStorage.setItem('playerAvatar', selectedAvatar);
        localStorage.setItem('roomId', roomId);
        localStorage.setItem('selectedTheme', selectedTheme);
        
        navigate('/multiplayer-game', { state: { roomId, playerName, avatar: selectedAvatar, theme: selectedTheme } });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            <div className="container mx-auto px-6 py-8 max-h-screen overflow-y-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2">Multiplayer Lobby</h1>
                    <p className="text-gray-300">Join a room or create your own</p>
                </div>

                {/* Player Setup */}
                <div className="bg-white/10 rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Player Setup</h2>
                    
                    {/* Player Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <input
                            type="text"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="w-full px-4 py-2 bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:border-white/60"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Avatar Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Choose Avatar</label>
                        <div className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                            {avatars.map((avatar, index) => (
                                <label key={index} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="avatar"
                                        value={avatar}
                                        checked={selectedAvatar === avatar}
                                        onChange={(e) => setSelectedAvatar(e.target.value)}
                                        className="hidden"
                                    />
                                    <img
                                        src={avatar}
                                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                                            selectedAvatar === avatar 
                                                ? 'border-blue-400 scale-110' 
                                                : 'border-white/30 hover:border-white/60'
                                        }`}
                                        alt={`Avatar ${index + 1}`}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Theme Selection */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Choose Theme</label>
                        <div className="grid grid-cols-2 gap-3">
                            {themes.map((theme) => (
                                <label key={theme.id} className="cursor-pointer">
                                    <input
                                        type="radio"
                                        name="theme"
                                        value={theme.id}
                                        checked={selectedTheme === theme.id}
                                        onChange={(e) => setSelectedTheme(e.target.value)}
                                        className="hidden"
                                    />
                                    <div className={`relative rounded-lg border-2 transition-all ${
                                        selectedTheme === theme.id 
                                            ? 'border-blue-400 scale-105' 
                                            : 'border-white/30 hover:border-white/60'
                                    }`}>
                                        <img
                                            src={theme.image}
                                            className="w-full h-20 object-cover rounded-lg"
                                            alt={`${theme.name} theme`}
                                        />
                                        <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-medium">{theme.name}</span>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Create Room */}
                <div className="bg-white/10 rounded-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Create Room</h2>
                        <button
                            onClick={() => setShowCreateRoom(!showCreateRoom)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            {showCreateRoom ? 'Cancel' : 'Create Room'}
                        </button>
                    </div>
                    
                    {showCreateRoom && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Room ID (optional)</label>
                                <input
                                    type="text"
                                    value={newRoomId}
                                    onChange={(e) => setNewRoomId(e.target.value)}
                                    className="w-full px-4 py-2 bg-white/20 rounded-lg border border-white/30 focus:outline-none focus:border-white/60"
                                    placeholder="Leave empty for auto-generated ID"
                                />
                            </div>
                            <button
                                onClick={handleCreateRoom}
                                className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                            >
                                Create and Join Room
                            </button>
                        </div>
                    )}
                </div>

                {/* Available Rooms */}
                <div className="bg-white/10 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
                    
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                            <p className="mt-2 text-gray-300">Loading rooms...</p>
                        </div>
                    ) : rooms.length === 0 ? (
                        <div className="text-center py-8">
                            <FontAwesomeIcon icon={faUsers} className="text-4xl text-gray-400 mb-4" />
                            <p className="text-gray-300">No active rooms found</p>
                            <p className="text-sm text-gray-400 mt-2">Create a room to get started!</p>
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
                            {rooms.map((room) => (
                                <div key={room.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
                                    <div>
                                        <h3 className="font-semibold text-lg">{room.id}</h3>
                                        <p className="text-gray-300 text-sm">
                                            {room.playerCount}/{room.maxPlayers} players
                                            {room.gameStarted && ' • Game in progress'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handleJoinRoom(room.id)}
                                        disabled={room.playerCount >= room.maxPlayers || room.gameStarted}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                            room.playerCount >= room.maxPlayers || room.gameStarted
                                                ? 'bg-gray-600 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        <FontAwesomeIcon icon={faPlay} />
                                        Join
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-8 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-2 border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        Back to Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MultiplayerLobby; 