import { useNavigate } from 'react-router-dom';

const Lobby = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen flex justify-center items-center">
            <button className="border border-black rounded-full p-2 cursor-pointer" onClick={() => navigate('/game-room')}>GameRoom</button>
        </div>
    )
}

export default Lobby;