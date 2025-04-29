import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Help = ({ close }) => {
    return (
       <div className="flex flex-col justify-center items-center gap-2 h-screen relative z-2">
            <div className="h-8 w-8 rounded-full border-2 border-gray-700 p-1 text-center hover:bg-gray-300 cursor-pointer" onClick={close}>
                <FontAwesomeIcon icon={faClose} className="text-lg" />
            </div>
            <div className="h-[70vh]">
                <img src="help.jpeg" className="h-full"/>
            </div>
       </div>
    )
}

export default Help;