import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authUtils } from '../../utils/auth';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName') || 'Utilisateur';
    const userRole = localStorage.getItem('userRole') || '';

    const handleLogout = () => {
        authUtils.removeToken();
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        navigate('/');
    };

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <div className="sidebar bg-dark text-white d-flex flex-column" style={{ width: '250px', minHeight: '100vh', position: 'fixed' }}>
            <div className="p-3">
                <Link to="/admin" className="text-white text-decoration-none">
                    <h4 className="mb-0">📚 École</h4>
                    <small className="text-muted">Dashboard</small>
                </Link>
            </div>
            
            <div className="px-3 py-2 bg-primary bg-opacity-25">
                <div className="d-flex align-items-center">
                    <div className="me-2">
                        <span style={{ fontSize: '2rem' }}>
                            {userRole === 'admin' ? '👨‍💼' : userRole === 'prof' ? '👨‍🏫' : '👨‍🎓'}
                        </span>
                    </div>
                    <div>
                        <div className="fw-bold">{userName}</div>
                        <small className="text-white-50">{userRole}</small>
                    </div>
                </div>
            </div>
            
            <hr className="text-white-50 mx-3" />
            
            <nav className="flex-grow-1">
                <ul className="nav flex-column px-2">
                    <li className="nav-item">
                        <Link 
                            to="/admin" 
                            className={`nav-link text-white ${isActive('/admin') ? 'bg-primary rounded' : ''}`}
                        >
                            <span className="me-2">🏠</span>
                            Accueil
                        </Link>
                    </li>
                    
                    {userRole === 'admin' && (
                        <>
                            <li className="nav-item">
                                <Link 
                                    to="/admin/profs" 
                                    className={`nav-link text-white ${isActive('/admin/profs') ? 'bg-primary rounded' : ''}`}
                                >
                                    <span className="me-2">👨‍🏫</span>
                                    Professeurs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/admin/etudiants" 
                                    className={`nav-link text-white ${isActive('/admin/etudiants') ? 'bg-primary rounded' : ''}`}
                                >
                                    <span className="me-2">👨‍🎓</span>
                                    Étudiants
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    to="/admin/classes"
                                    className={`nav-link text-white ${isActive('/admin/classes') ? 'bg-primary rounded' : ''}`}
                                >
                                    <span className="me-2">🎓</span>
                                    Classes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/admin/messages" 
                                    className={`nav-link text-white ${isActive('/admin/messages') ? 'bg-primary rounded' : ''}`}
                                >
                                    <span className="me-2">💬</span>
                                    Messages
                                </Link>
                            </li>
                        </>
                    )}

                    {userRole === 'prof' && (
                        <>
                            <li className="nav-item">
                                <Link 
                                    to="/admin/mes-classes" 
                                    className={`nav-link text-white ${isActive('/admin/mes-classes') ? 'bg-primary rounded' : ''}`}
                                >
                                    <span className="me-2">📚</span>
                                    Mes Classes
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/admin/messages" 
                                    className={`nav-link text-white ${isActive('/admin/messages') ? 'bg-primary rounded' : ''}`}
                                >
                                    <span className="me-2">💬</span>
                                    Messages
                                </Link>
                            </li>
                        </>
                    )}

                    {userRole === 'etudiant' && (
                        <>
                            <li className="nav-item">
                                <Link 
                                    to="/admin/mes-caramades" 
                                    className={`nav-link text-white ${isActive('/admin/mes-caramades') ? 'bg-primary rounded' : ''}`}
                                >
                                    <span className="me-2">👥</span>
                                    Mes Camarades
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    to="/admin/messages" 
                                    className={`nav-link text-white ${isActive('/admin/messages') ? 'bg-primary rounded' : ''}`}
                                >
                                    <span className="me-2">💬</span>
                                    Messages
                                </Link>
                            </li>
                        </>
                    )}
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
