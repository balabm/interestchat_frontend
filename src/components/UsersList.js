// src/components/UsersList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('access');
            const response = await axios.get('http://localhost:8000/api/users/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
        };
        fetchUsers();
    }, []);

    const handleSendInterest = async (userId) => {
        const token = localStorage.getItem('access');
        await axios.post('http://localhost:8000/api/interests/', { recipient: userId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
    };

    return (
        <div className="container">
            <h2>Users</h2>
            <ul className="list-group">
                {users.map(user => (
                    <li key={user.id} className="list-group-item">
                        {user.username}
                        <button
                            className="btn btn-primary float-right"
                            onClick={() => handleSendInterest(user.id)}
                        >
                            Send Interest
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
