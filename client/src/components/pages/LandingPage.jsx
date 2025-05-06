import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const [mode, setMode] = useState("");

    const handleClick = () => {
        if (mode) {
          navigate("/lobby");
        } else {
          alert("Select a mode before continuing.");
        }
      };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-black text-white">
            <div className="flex flex-col justify-center items-center mb-10">
                {/* <img src="grandpa-poker.png" draggable="false"/> */}
                <h1 className="text-bold text-5xl">name of app</h1>
            </div>

            <form className="flex flex-col gap-6 text-2xl text-semibold">
                <label htmlFor="one-player" className="flex items-center gap-3">
                    <input type="radio" name="players" value="1" className="accent-white w-5 h-5 cursor-pointer" onChange={(e) => setMode(e.target.value)}/>
                    <span className="font-semibold">1 Player</span>
                </label>

                <hr className="border-gray-500"/>

                <label htmlFor="multiplayer" className="flex items-center gap-3">
                    <input type="radio" name="players" value="multi" className="accent-white w-5 h-5 cursor-pointer" onChange={(e) => setMode(e.target.value)}/>
                    <span className="font-semibold">Multi Player</span>
                </label>

                <hr className="border-gray-500"/>

                <button
                    type="button"
                    onClick={handleClick}
                    className="flex items-center gap-3 mt-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                    <span className="text-sm text-green-400">▶</span>
                    <span>PLAY</span>
                    <span className="text-2xl">→</span>
                </button>
            </form>
        </div>
    )
}

export default LandingPage;