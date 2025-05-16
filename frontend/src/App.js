import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Auth/Login';
import CompetitorForm from './components/Competitors/CompetitorForm';
import CompetitionForm from './components/Competitions/CompetitionForm';
import Statistics from './components/Statistics/Statistics';
import CompareCompetitors from './components/Statistics/CompareCompetitors';

function App() {
    const [user, setUser] = useState(null);
    const location = useLocation(); // Para obtener la ruta actual

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // No renderizar Navbar en la ruta /login
    const showNavbar = location.pathname !== '/login';

    return (
        <div>
            {showNavbar && <Navbar user={user} setUser={setUser} />}
            <div className="container mt-4">
                <Routes>
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route
                        path="/competitors/new"
                        element={user ? <CompetitorForm /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/competitions/new"
                        element={user ? <CompetitionForm /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/statistics"
                        element={user ? <Statistics /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/compare"
                        element={user ? <CompareCompetitors /> : <Navigate to="/login" />}
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}