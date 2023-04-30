const Chat = ({ descendingOrderMessages }) => {
    console.log(descendingOrderMessages);
    return (
        <>
            <div className="chat-display p-2">
                {descendingOrderMessages.map((message, _index) => (
                    <div
                        className={
                            "mb-2 clear-both px-2 py-1 rounded-lg " +
                            (message.isMine
                                ? "float-right bg-sky-500 text-white"
                                : "float-left bg-slate-300")
                        }
                        key={_index}
                    >
                        {/* <div className="chat-message-header">
                            <div className="img-container">
                                <img src={message.img} alt={message.name + ' profile'}/>
                            </div>
                            <p>{message.name}</p>
                        </div> */}
                        <p>{message.message}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Chat;
