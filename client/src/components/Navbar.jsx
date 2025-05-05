import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [profile, setProfile] = useState(false);
    const [avatar, setAvatar] = useState("avatar5.jpeg");
    const avatars = ["avatar1.jpeg", "avatar2.jpeg", "avatar3.jpeg", "avatar4.jpeg", "avatar5.jpeg", "avatar6.jpeg"];
    
    return (
        <>
            {profile && (
                <div className="fixed top-14 right-3 mt-2 w-90 bg-black/40 text-white shadow-lg p-4 z-50">
                    <p className="p-5">Choose Avatar:</p>
                    <div className="overflow-x-auto whitespace-nowrap bg-white/10 p-4 rounded-[9999px]">
                        {avatars.map((src, index) => (
                            <label key={index} className=" cursor-pointer inline-block">
                                <input type="radio" name="avatar" value={src} className="peer hidden" onChange={(e) => setAvatar(e.target.value)}/>
                                <img src={src} className="bg-black w-10 h-10 rounded-full shrink-0 peer-checked:ring-4 peer-checked:ring-blue-300 mr-4" draggable="false"/>
                            </label>
                        ))}
                    </div>
    
                    <p className="cursor-pointer hover:bg-white/10 p-2">...</p>
                    <p className="cursor-pointer hover:bg-white/10 p-2">...</p>
                </div>
            )}

            <div className="fixed top-0 p-2 px-5 h-13 w-full flex border-b border-gray-800 text-white">
                <div className="w-[33.34%] flex justify-start items-center">
                    {/* <img src="chipinn-text-2.png" className="h-8" draggable="false" /> */}
                    name of app
                </div>
                <div className="w-[33.34%] flex justify-center items-center">table name</div>
                <div className="w-[33.34%] flex justify-end items-center gap-5">
                    <button className="border border-white/30 rounded-full px-4 py-1 hover:bg-white/20 hover:scale-105 cursor-pointer">Get $</button>
                    {/* <div>money</div> */}
                    <button className="flex justify-center items-center gap-2 cursor-pointer hover:scale-105" onClick={() => setProfile(prev => !prev)}>
                        <img src={avatar} className="w-9 h-9 rounded-full"/>
                        <FontAwesomeIcon icon={faAngleDown} className="text-gray-300" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Navbar;