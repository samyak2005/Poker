import { useState, useEffect } from "react";
import Confetti from "react-confetti";

const Win = ({ win, setWin }) => {
    const [isZoomingOut, setIsZoomingOut] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => setIsZoomingOut(true), 3000);
        const timer2 = setTimeout(() => setWin(false), 5000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    return (
        <>
            {win && <Confetti />}
            {win && <div className={`fixed top-1/2 left-1/2 flex items-center justify-center h-[80vh] w-[80vw] text-8xl text-white text-bold p-6 z-50 ${isZoomingOut ? "win-out" : "win-in"}`}>
                You Won!
            </div>}
        </>
    );
};

export default Win;