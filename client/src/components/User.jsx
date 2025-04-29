import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';
import ReactCardFlip from "react-card-flip";

const User = ({flip4, setFlip4, compCards}) => {
    return (
        <div className="computer flex flex-col relative z-1">
            <div className="flex flex-col items-center gap-1 fixed top-50 left-50">
                {/* <div className="bg-white rounded-full h-30 w-30"></div> */}
                <div className="h-35 w-35">
                    <img src="avatar.jpeg" className="rounded-full" />
                </div>
                <div>
                    <p className="text-white text-3xl text-semibold mt-8 mb-2">Tom</p>
                </div>
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCoins} className="text-gray-300 text-xl" />
                    <p className="text-gray-300 text-lg">180</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-600 rounded-full px-2 py-1">
                    <FontAwesomeIcon icon={faCircleDollarToSlot} className="text-white text-xl" />
                    <p className="text-white">10</p>
                </div>
            </div>

            <div className="flex fixed top-70 left-70">
                <ReactCardFlip isFlipped={flip4} flipDirection="horizontal">
                    <img src="card-back.jpeg" className="rounded-lg card comp-card transform -rotate-12 translate-y-2" onClick={() => setFlip4(!flip4)}/>
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