import { useState } from "react";
import axios from "axios";
import Button from "./Button";

const ChatInput = ({
    user,
    clickedUser,
    getUserMessages,
    getClickedUsersMessages,
}) => {
    const [textArea, setTextArea] = useState("");
    const userId = user?.user_id;
    const clickedUserId = clickedUser?.user_id;

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea,
        };

        try {
            await axios.post("http://localhost:8000/message", { message });
            getUserMessages();
            getClickedUsersMessages();
            setTextArea("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="chat-input border-t-4">
            <textarea
                className="border border-gray-200 p-2 mb-4"
                placeholder="Enter your message"
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
            />

            <Button onClick={addMessage}>Send</Button>
        </div>
    );
};

export default ChatInput;
