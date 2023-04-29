import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const ChatHeader = ({ user }) => {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    const navigate = useNavigate();

    const logout = () => {
        removeCookie("UserId", cookies.UserId);
        removeCookie("AuthToken", cookies.AuthToken);
        window.location.reload();
    };

    return (
        <div className="chat-container-header p-5">
            <div className="profile">
                <div className="img-container ">
                    <img src={user.url} alt={"photo of " + user.first_name} />
                </div>
                <h3>{user.first_name}</h3>
            </div>

            <div className="log-out-icon-container cursor-pointer p-5" onClick={logout}>
                <MdLogout className="log-out-icon" />
            </div>
        </div>
    );
};

export default ChatHeader;
