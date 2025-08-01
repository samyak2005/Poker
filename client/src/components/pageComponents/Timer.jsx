import React, { useEffect } from "react";

const Timer = ({ timer, setTimer, folded, setFolded, turn, setTurn, color }) => {
  const duration = 40;

  useEffect(() => {    
    const intervalId = setInterval(() => {
        setTimer(prev => {
            if (prev === 0) {
              
              return 0;
            }
            return prev - 1;
        });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if(folded || !turn) setTimer(40);
  });

  return (
      <div className="fixed bottom-10 right-10 w-46 h-15 rounded-full overflow-hidden">
        <div
          className={`absolute inset-0 rounded-full ${timer <= 10 ? `bg-red-600 animate-pulse` : color}`}
          style={{
            width: `${(timer / duration) * 100}%`,
            transition: "width 1s linear",
          }}>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          {/* <button className={`w-full h-full text-lg text-white rounded-full border-3 border-gray-400  ${timer <= 10 && timer > 0 ? `animate-pulse` : ``}`}> {folded ? "You folded." : turn ? "Your Turn!" : "Comp's Turn"} */}
          <button className={`w-full h-full text-lg text-white rounded-full border-3 border-gray-400  ${timer <= 10? `animate-pulse` : ``}`}>Your Turn!
            {/* {(!folded && turn) && ( */}
              <span className="text-gray-400 ml-2">
                0:{timer < 10 ? `0${timer}` : timer}
              </span>
            {/* )} */}
          </button>
        </div>
      </div>
  );
};

export default Timer;
