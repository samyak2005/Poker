import { useState } from 'react';

const Settings = ({ setSettings, setAvatar }) => {
    const [selected, setSelected] = useState("");
    const avatars = ["avatar1.jpeg", "avatar2.jpeg", "avatar3.jpeg", "avatar4.jpeg", "avatar5.jpeg", "avatar6.jpeg"];

    const handleApply = () => {
        setAvatar(selected);
        setSettings(false);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col h-[80vh] w-[80vw] bg-[#10002b]/80 text-white p-6 rounded-4xl shadow-lg z-50">
                <div className="w-full flex justify-center border-b border-white/40">
                    <p className="text-3xl font-bold pb-3">Settings</p>
                </div>
                <div className="overflow-y-auto px-10 pb-5 mt-5 mb-5">
                    <p className="p-5">Choose Theme:</p>
                    <div className="overflow-x-auto bg-white/10 p-4 flex flex-nowrap items-center gap-5 rounded-2xl">
                        <div className="bg-black h-45 w-70 rounded-2xl shrink-0"></div>
                        <div className="bg-black h-45 w-70 rounded-2xl shrink-0"></div>
                        <div className="bg-black h-45 w-70 rounded-2xl shrink-0"></div>
                        <div className="bg-black h-45 w-70 rounded-2xl shrink-0"></div>
                        <div className="bg-black h-45 w-70 rounded-2xl shrink-0"></div>
                    </div>

                    <p className="p-5">Choose Avatar:</p>
                    <div className="overflow-x-auto whitespace-nowrap bg-white/10 p-4 rounded-[9999px]">
                        {avatars.map((src, index) => (
                            <label key={index} className=" cursor-pointer inline-block">
                                <input type="radio" name="avatar" value={src} className="peer hidden" onChange={(e) => setSelected(e.target.value)}/>
                                <img src={src} className="bg-black w-45 h-45 rounded-full shrink-0 peer-checked:ring-4 peer-checked:ring-pink-400 mr-4" draggable="false"/>
                            </label>
                        ))}
                    </div>

                </div>
                <div className="w-full flex items-end justify-center gap-5 mt-auto border-t border-white/40 pt-3">
                    <button className="hover:bg-white/20 px-4 py-2 rounded-full h-10 cursor-pointer" onClick={() => setSettings(false)}>Cancel</button>
                    <button className={`bg-black px-4 py-2 rounded-full h-10 ${selected ? "hover:bg-white/20 cursor-pointer" : "opacity-50 cursor-not-allowed"}`} onClick={handleApply}>Apply</button>
                </div>
            </div>
        </>
    )
}

export default Settings;