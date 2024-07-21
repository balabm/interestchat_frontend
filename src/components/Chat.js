// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

const Chat = () => {
    const { room } = useParams();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = io('http://localhost:8000');

    useEffect(() => {
        socket.emit('join', room);

        socket.on('message', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        return () => socket.disconnect();
    }, [room]);

    const handleSend = async () => {
        socket.emit('message', { room, message });
        setMessage('');
    };

    return (
        <div className="container">
            <h2>Chat Room: {room}</h2>
            <div className="chat-box" style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <strong>{msg.sender.username}: </strong>{msg.content}
                    </div>
                ))}
            </div>
            <div className="input-group mt-2">
                <input
                    type="text"
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="btn btn-primary" onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
