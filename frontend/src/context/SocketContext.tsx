import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    const authReducer = useSelector((state) => state.auth);
    const accessToken = authReducer?.user?.accessToken;

    useEffect(() => {

        if (!accessToken) return
        //

        const newSocket = io(import.meta.env.VITE_APP_WEBSOCKETS_URL, {
            withCredentials: true,
            extraHeaders: {
                token: accessToken,
            },
        });

        setSocket(newSocket);

        // Cleanup on unmount
        return () => newSocket.disconnect();
    }, [accessToken]);


    const handleUserLogin = (userId, _socket, socketId) => {
        _socket.emit("userLoggedIn", userId, socketId);
        console.log('emited login ', userId, ' + ', socketId)
    };

    const handleUserLogout = (userId) => {
        // Cleanup socket-related data or subscriptions for this user
        // If needed, emit an event to notify other instances
    };

    const value = {
        socket,
        handleUserLogin,
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
