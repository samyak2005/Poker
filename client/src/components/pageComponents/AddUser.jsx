import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const User = ({ avatarTop, avatarLeft} ) => {
    return (
        <div className="flex flex-col items-center gap-1"
        style={{
            position: "fixed",
            top: `${avatarTop}`,
            left: `${avatarLeft}`
        }}>
            <div className="h-30 w-30 bg-white/5 rounded-full flex justify-center items-center">
                <FontAwesomeIcon icon={faPlus} className="text-white/10 text-3xl" />
            </div>
        </div>
    )
}

export default User;