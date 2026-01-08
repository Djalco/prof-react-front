import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authUtils } from '../../utils/auth';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        authUtils.removeToken();
        navigate('/login');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="sidebar bg-dark text-white d-flex flex-column" style={{ width: '250px', minHeight: '100vh', position: 'fixed' }}>
            <div className="p-3">
                <Link to="/" className="text-white text-decoration-none">
                    <h4 className="mb-0">📚 École</h4>
                    <small className="text-muted">Dashboard</small>
                </Link>
            </div>
            
            <hr className="text-white-50 mx-3" />
            
            <nav className="flex-grow-1">
                <ul className="nav flex-column px-2">
                    <li className="nav-item">
                        <Link 
                            to="/" 
                            className={`nav-link text-white ${isActive('/') ? 'bg-primary rounded' : ''}`}
                        >
                            <span className="me-2">🏠</span>
                            Accueil
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/profs" 
                            className={`nav-link text-white ${isActive('/profs') ? 'bg-primary rounded' : ''}`}
                        >
                            <span className="me-2">👨‍🏫</span>
                            Professeurs
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link 
                            to="/messages" 
                            className={`nav-link text-white ${isActive('/messages') ? 'bg-primary rounded' : ''}`}
                        >
                            <span className="me-2">💬</span>
                            Messages
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <div className="p-3 mt-auto">
                <button 
                    className="btn btn-outline-light w-100" 
                    onClick={handleLogout}
                >
                    <span className="me-2">🚪</span>
                    Déconnexion
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
