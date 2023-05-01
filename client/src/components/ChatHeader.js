import { useCookies } from "react-cookie";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";
const ChatHeader = ({ user }) => {
    // eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    const logout = () => {
        removeCookie("UserId", cookies.UserId);
        removeCookie("AuthToken", cookies.AuthToken);
        window.location.reload();
    };

    return (
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 px-5 py-3">
            <div className="flex justify-between items-center mb-2">
                <div className="profile">
                    <div className="img-container ">
                        <img
                            src={user.url}
                            alt={"photo of " + user.first_name}
                        />
                    </div>
                    <h3>{user.first_name}</h3>
                </div>

                <div
                    className="log-out-icon-container cursor-pointer p-5"
                    onClick={logout}
                >
                    <MdLogout className="log-out-icon" />
                </div>
            </div>

            <div className="mb-3 flex flex-row items-center">
                <Link
                    to="/news"
                    className="text-white border px-3 py-2 rounded-lg mr-2"
                >
                    News
                </Link>
                <Link
                    to="/fitness"
                    className="text-white border px-3 py-2 rounded-lg mr-2"
                >
                    Fitness
                </Link>
            </div>
        </div>
    );
};

export default ChatHeader;
