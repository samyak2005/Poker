import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';
import ReactCardFlip from "react-card-flip";

const User = ({flip3, flip4, setFlip4, compCards, avatarTop, avatarLeft, cardsTop, cardsLeft}) => {
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
                    <img src="avatar.jpeg" className="rounded-full" draggable="false"/>
                </div>
                <div>
                    <p className="text-white text-2xl mt-6">Tom</p>
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
            className="flex ml-4"
            style={{
                position: "fixed",
                top: `${cardsTop}`,
                left: `${cardsLeft}`
            }}
            >
                <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                    <div className="relative transform -rotate-12 translate-y-2 w-14 h-30">
                        <img src="card-back.jpeg" className="rounded-lg card comp-card w-full h-full" draggable="false"/>
                        <div className="rounded-lg absolute top-0 left-0 w-full h-full bg-black opacity-20" onClick={() => {if(flip3) setFlip4(!flip4)}}></div>
                    </div>
                    <div className="relative transform -rotate-12 translate-y-2 w-14 h-30">
                        <img src={"card-fronts/" + compCards[0]} className="card comp-card card-front w-full h-full" draggable="false" />
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 rounded-lg"></div>
                    </div>
                </ReactCardFlip>

                <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card comp-card transform rotate-12 translate-y-2 w-18 h-30 -ml-4" onClick={() => {if(flip3) setFlip4(!flip4)}} draggable="false"/>
                    <img src={"card-fronts/" + compCards[1]} className="card comp-card card-front transform rotate-12 translate-y-2 w-18 h-30 -ml-4" draggable="false"/>
                </ReactCardFlip>
            </div>
        </div>
    )
}

export default User;