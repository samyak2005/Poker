import { useState, useEffect } from 'react';

const Settings = ({ setSettings, setTheme, color }) => {

    const [selectedTheme, setSelectedTheme] = useState("purple-theme.png");
    const [selectedDeck, setSelectedDeck] = useState("card-back.jpeg");
    const [sound, setSound] = useState(false);
    const [music, setMusic] = useState(false);
    const [duration, setDuration] = useState(40);

    const themes = ["purple-theme.png", "blue-theme.png", "green-theme.png", "pink-theme.png"];
    const card_decks = ["card-back.jpeg", "card-back.jpeg", "card-back.jpeg", "card-back.jpeg", "card-back.jpeg"];

    const handleApply = () => {
        localStorage.setItem("theme", selectedTheme);
        setTheme(selectedTheme);
        setSettings(false);
    };

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
            setSelectedTheme(theme);
            setTheme(theme);
        }
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40"></div>
            <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col h-[80vh] w-[80vw] ${color} text-white p-6 rounded-4xl shadow-lg z-50`}>
                <div className="w-full flex justify-center border-b border-white/40">
                    <p className="text-3xl font-bold pb-3">Settings</p>
                </div>

                <div className="overflow-y-auto px-10 pb-5 mt-5 mb-5">

                    {/* themes */}
                    <p className="p-5">Choose Theme:</p>
                    <div className="overflow-x-auto whitespace-nowrap bg-white/10 p-4 rounded-2xl">
                        {themes.map((src, index) => (
                            <label key={index} className=" cursor-pointer inline-block">
                                <input type="radio" name="theme" value={src} className="peer hidden" onChange={(e) => setSelectedTheme(e.target.value)}/>
                                <img src={src} className="bg-black h-45 rounded-2xl shrink-0 peer-checked:ring-4 peer-checked:ring-blue-300 mr-4" draggable="false"/>
                            </label>
                        ))}
                    </div>

                    {/* card deck styles */}
                    <p className="p-5">Choose Card Deck:</p>
                    <div className="overflow-x-auto whitespace-nowrap bg-white/10 p-4 rounded-2xl">
                        {card_decks.map((src, index) => (
                            <label key={index} className=" cursor-pointer inline-block">
                                <input type="radio" name="deck" value={src} className="peer hidden" onChange={(e) => setSelectedDeck(e.target.value)}/>
                                <img src={src} className="bg-black h-45 rounded-2xl shrink-0 peer-checked:ring-4 peer-checked:ring-blue-300 mr-4" draggable="false"/>
                            </label>
                        ))}
                    </div>

                    {/* sound */}
                    <p className="p-5">Sound:</p>
                    <div className="flex items-center justify-evenly bg-white/10 p-4 rounded-2xl">
                        {/* sound effects */}
                        <div className="flex items-center justify-center">
                            <p className="p-5">Sound Effects:</p>
                            <button className={`w-13 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${sound ? "bg-green-500" : "bg-gray-500"}`} onClick={() => setSound(!sound)}>
                                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${sound ? "translate-x-6" : ""}`}></div>
                            </button>
                        </div>

                        {/* background music */}
                        <div className="flex items-center justify-center">
                            <p className="p-5">Music:</p>
                            <button className={`w-13 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${music ? "bg-green-500" : "bg-gray-500"}`} onClick={() => setMusic(!music)}>
                                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${music ? "translate-x-6" : ""}`}></div>
                            </button>
                        </div>
                    </div>

                    {/* timer duration */}
                    <p className="p-5">Set Timer Duration: {duration}s</p>
                    <div className="bg-white/10 p-4 rounded-2xl">
                        <input type="range" min="20" max="60" step="5" value={duration} className="w-1/2 accent-gray-600 cursor-pointer" onChange={(e) => setDuration(parseInt(e.target.value, 10))} />
                    </div>

                    {/* <div className="flex items-center justify-center gap-5 my-5 mt-30"> */}
                        {/* reset to default */}
                        {/* <button className="flex justify-center bg-white/20 px-5 py-4 rounded-4xl hover:bg-white/40 cursor-pointer">
                            Set Settings to Default
                        </button> */}

                        {/* logout */}
                        {/* <button className="flex justify-center bg-white/20 px-5 py-4 rounded-4xl hover:bg-white/40 cursor-pointer">
                            Logout
                        </button> */}
                    {/* </div> */}

                </div>

                <div className="w-full flex items-end justify-center gap-5 mt-auto border-t border-white/40 pt-3">
                    <button className="hover:bg-white/20 px-4 py-2 rounded-full h-10 cursor-pointer" onClick={() => setSettings(false)}>Cancel</button>
                    <button className={"bg-black px-4 py-2 rounded-full h-10 hover:bg-white/20 cursor-pointer"} onClick={handleApply}>Apply</button>
                </div>
            </div>
        </>
    )
}

export default Settings;