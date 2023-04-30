import ChatHeader from "./ChatHeader";
import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import { useState } from "react";

const ChatContainer = ({ user }) => {
    const [clickedUser, setClickedUser] = useState(null);

    return (
        <div className="chat-container">
            <ChatHeader user={user} />

            <div>
                <button
                    className={
                        "option border-b-4 " +
                        (clickedUser ? "border-gray-500" : "border-blue-500")
                    }
                    onClick={() => setClickedUser(null)}
                >
                    Matches
                </button>
                <button
                    className="option border-b-4 border-blue-500 disabled:border-gray-500"
                    disabled={!clickedUser}
                >
                    Chat
                </button>
            </div>

            {!clickedUser && (
                <MatchesDisplay
                    matches={user.matches}
                    setClickedUser={setClickedUser}
                />
            )}

            {clickedUser && (
                <ChatDisplay user={user} clickedUser={clickedUser} />
            )}
        </div>
    );
};

export default ChatContainer;
