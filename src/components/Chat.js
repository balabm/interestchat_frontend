import React, { useState, useEffect } from 'react';

const Chat = ({ user }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const roomName = 'default_room';  // You can dynamically set this based on your application logic

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

        socket.onmessage = function(e) {
            const data = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, { user: 'server', message: data.message }]);
        };

        socket.onclose = function(e) {
            console.error('Chat socket closed unexpectedly');
        };

        return () => socket.close();
    }, [roomName]);

    const sendMessage = (e) => {
        e.preventDefault();
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);
        socket.onopen = function() {
            socket.send(JSON.stringify({
                'message': message
            }));
            setMessages((prevMessages) => [...prevMessages, { user, message }]);
            setMessage('');
        };
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.user}: </strong>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;
