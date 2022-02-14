import React, { useState, useEffect } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
    const [currentmessage, setCurrentmessage] = useState("");
    const [messageList, setMessageList] = useState([]);
    const sendMessage = async () => {
        if (currentmessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentmessage,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentmessage("");
        }
    };
    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                        <div
                            className="message"
                            id={
                                username === messageContent.author
                                    ? "you"
                                    : "other"
                            }
                        >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    value={currentmessage}
                    placeholder="type your message here..."
                    onChange={(event) => setCurrentmessage(event.target.value)}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    );
};

export default Chat;
