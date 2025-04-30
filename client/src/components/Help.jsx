import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Help = ({ close }) => {
    return (
       <div className="flex flex-col justify-center items-center gap-2 h-screen relative z-2">
            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-[#1C023F] hover:bg-[#3a0ca3] cursor-pointer" onClick={close}>
                <FontAwesomeIcon icon={faClose} className="text-lg text-white" />
            </div>
            <div className="h-[80vh]">
                <img src="help.png" className="h-full" draggable="false"/>
            </div>
       </div>
    )
}

export default Help;