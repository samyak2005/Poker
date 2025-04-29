import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';
import ReactCardFlip from "react-card-flip";

const User = ({flip4, setFlip4, compCards, avatarTop, avatarLeft, cardsTop, cardsLeft}) => {
    return (
        <div className="computer flex flex-col relative z-1">
            <div 
            className="flex flex-col items-center gap-1"
            style={{
                position: "fixed",
                top: `${avatarTop}`,
                left: `${avatarLeft}`
            }}
            >
                <div className="h-30 w-30">
                    <img src="avatar.jpeg" className="rounded-full" />
                </div>
                <div>
                    <p className="text-white text-2xl text-semibold mt-6">Tom</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faCoins} className="text-gray-300 text-lg" />
                        <p className="text-gray-300 text-base">180</p>
                    </div>
                    <div className="flex items-center gap-1 bg-gray-600 rounded-full px-2 py-1">
                        <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-white text-base" />
                        <p className="text-white text-base">10</p>
                    </div>
                </div>
            </div>

            <div 
            className="flex fixed top-65 left-67"
            style={{
                position: "fixed",
                top: `${cardsTop}`,
                left: `${cardsLeft}`
            }}
            >
                <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card comp-card transform -rotate-12 translate-y-2 left-card" onClick={() => setFlip4(!flip4)}/>
                    <img src={"card-fronts/" + compCards[0]} className="card comp-card card-front transform -rotate-12 translate-y-2"/>
                </ReactCardFlip>
                <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card comp-card transform rotate-12 translate-y-2" onClick={() => setFlip4(!flip4)}/>
                    <img src={"card-fronts/" + compCards[1]} className="card comp-card card-front transform rotate-12 translate-y-2"/>
                </ReactCardFlip>
            </div>
        </div>
    )
}

export default User;