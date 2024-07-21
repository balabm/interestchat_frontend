import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InterestsList = () => {
    const [interests, setInterests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterests = async () => {
            try {
                const response = await axios.get('/api/interests/');
                setInterests(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchInterests();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.post(`/api/interests/${id}/accept/`);
            navigate(`/chat/${id}`);
        } catch (err) {
            console.error(err);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.post(`/api/interests/${id}/reject/`);
            setInterests(interests.filter((interest) => interest.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Interests List</h1>
            <ul>
                {interests.map((interest) => (
                    <li key={interest.id}>
                        <span>{interest.sender_username} wants to connect with you.</span>
                        <button onClick={() => handleAccept(interest.id)}>Accept</button>
                        <button onClick={() => handleReject(interest.id)}>Reject</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InterestsList;
