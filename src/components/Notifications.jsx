import React, { useState, useEffect } from "react";

const Notifications = ({ socket }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        socket.on("notification", (data) => {
            setNotifications((list) => [...list, data]);
            console.log(data);
        });
    }, [socket]);

    return (
        <>
            <div>
                <ul>
                    {notifications.map((notification) => (
                        <li>{notification}</li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default Notifications;
