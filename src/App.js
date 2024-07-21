// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Replace Switch with Routes
import Navbar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import UsersList from './components/UsersList';
import InterestsList from './components/InterestsList';
import Chat from './components/Chat';

const App = () => (
    <Router>
        <Navbar />
        <div className="container mt-4">
            <Routes> {/* Replace Switch with Routes */}
                <Route path="/login" element={<Login />} /> {/* Update component prop to element */}
                <Route path="/register" element={<Register />} /> {/* Update component prop to element */}
                <Route path="/users" element={<UsersList />} /> {/* Update component prop to element */}
                <Route path="/interests" element={<InterestsList />} /> {/* Update component prop to element */}
                <Route path="/chat/:room" element={<Chat />} /> {/* Update component prop to element */}
                <Route path="/" element={<h1>Welcome to the Interest Chat App</h1>} exact /> {/* Update component prop to element */}
            </Routes>
        </div>
    </Router>
);

export default App;