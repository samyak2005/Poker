const Settings = ({ setSettings }) => {
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
                    <div className="overflow-x-auto bg-white/10 p-4 flex flex-nowrap items-center gap-5 rounded-[9999px]">
                        <div className="bg-black h-45 w-45 rounded-full shrink-0"></div>
                        <div className="bg-black h-45 w-45 rounded-full shrink-0"></div>
                        <div className="bg-black h-45 w-45 rounded-full shrink-0"></div>
                        <div className="bg-black h-45 w-45 rounded-full shrink-0"></div>
                        <div className="bg-black h-45 w-45 rounded-full shrink-0"></div>
                        <div className="bg-black h-45 w-45 rounded-full shrink-0"></div>
                        <div className="bg-black h-45 w-45 rounded-full shrink-0"></div>
                    </div>
                </div>
                <div className="w-full flex items-end justify-center gap-5 mt-auto border-t border-white/40 pt-3">
                    <button className="hover:bg-[#10002b] px-4 py-2 rounded-full h-10 cursor-pointer" onClick={() => setSettings(false)}>Cancel</button>
                    <button className="bg-gray-500 px-4 py-2 rounded-full h-10 opacity-50 cursor-not-allowed" disabled>Apply</button>
                </div>
            </div>
        </>
    )
}

export default Settings;