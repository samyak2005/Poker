import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const Help = ({ close }) => {
    return (
       <div className="flex flex-col justify-center items-center h-screen relative z-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-[#281B4E] text-white cursor-pointer absolute top-[18%] right-[6%]" onClick={close}>
                <FontAwesomeIcon icon={faClose} className="text-2xl" />
            </div>
            <div className="h-[80vh]">
                <img src="help.png" className="h-full" draggable="false"/>
            </div>
       </div>
    )
}

export default Help;