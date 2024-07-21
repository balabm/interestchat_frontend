// src/components/InterestsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InterestsList = () => {
    const [interests, setInterests] = useState([]);

    useEffect(() => {
        const fetchInterests = async () => {
            const token = localStorage.getItem('access');
            const response = await axios.get('http://localhost:8000/api/interests/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInterests(response.data);
        };
        fetchInterests();
    }, []);

    const handleAccept = async (id) => {
        const token = localStorage.getItem('access');
        await axios.post(`http://localhost:8000/api/interests/${id}/accept/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setInterests(interests.filter(interest => interest.id !== id));
    };

    const handleReject = async (id) => {
        const token = localStorage.getItem('access');
        await axios.post(`http://localhost:8000/api/interests/${id}/reject/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setInterests(interests.filter(interest => interest.id !== id));
    };

    return (
        <div className="container">
            <h2>Interests</h2>
            <ul className="list-group">
                {interests.map(interest => (
                    <li key={interest.id} className="list-group-item">
                        {interest.sender.username} sent you an interest
                        <button
                            className="btn btn-success float-right ml-2"
                            onClick={() => handleAccept(interest.id)}
                        >
                            Accept
                        </button>
                        <button
                            className="btn btn-danger float-right"
                            onClick={() => handleReject(interest.id)}
                        >
                            Reject
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InterestsList
