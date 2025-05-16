import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, setUser }) {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">Judo Control</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/competitors/new">Registrar Competidor</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/competitions/new">Registrar Competición</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/statistics">Estadísticas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/compare">Comparar Competidores</Link>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="d-flex">
                        {user ? (
                            <button className="btn btn-outline-danger" onClick={handleLogout}>
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link className="btn btn-outline-primary" to="/login">Iniciar Sesión</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;