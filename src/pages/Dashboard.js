import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const userName = localStorage.getItem('userName') || 'Utilisateur';
    const userRole = localStorage.getItem('userRole') || '';

    return (
        <div>
            <div className="text-center mb-5">
                <h1 className="display-4">
                    Bienvenue {userRole === 'admin' ? 'Admin' : userRole === 'prof' ? 'Professeur' : 'Étudiant'} {userName}
                </h1>
                <p className="lead text-muted">
                    {userRole === 'admin' ? 'Gérez votre École' : userRole === 'prof' ? 'Consultez vos classes' : 'Consultez vos camarades'}
                </p>
            </div>

            {userRole === 'admin' && (
                <>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <span style={{ fontSize: '4rem' }}>🎓</span>
                                    </div>
                                    <h3 className="card-title">Étudiants</h3>
                                    <p className="card-text text-muted">
                                        Gérez la liste des étudiants de l'école
                                    </p>
                                    <Link to="/admin/etudiants" className="btn btn-primary">
                                        Voir les étudiants
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <span style={{ fontSize: '4rem' }}>🎓</span>
                                    </div>
                                    <h3 className="card-title">Classes</h3>
                                    <p className="card-text text-muted">
                                        Gérez la liste des classes de l'école
                                    </p>
                                    <Link to="/admin/classes" className="btn btn-primary">
                                        Voir les classes
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <span style={{ fontSize: '4rem' }}>👨‍🏫</span>
                                    </div>
                                    <h3 className="card-title">Professeurs</h3>
                                    <p className="card-text text-muted">
                                        Gérez la liste des professeurs de l'école
                                    </p>
                                    <Link to="/admin/profs" className="btn btn-primary">
                                        Voir les professeurs
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <span style={{ fontSize: '4rem' }}>💬</span>
                                    </div>
                                    <h3 className="card-title">Messages</h3>
                                    <p className="card-text text-muted">
                                        Consultez et ajoutez des messages
                                    </p>
                                    <Link to="/admin/messages" className="btn btn-primary">
                                        Voir les messages
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>   

                    <div className="row mt-4">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Actions rapides</h5>
                                    <div className="d-flex gap-2 flex-wrap">
                                        <Link to="/admin/prof-create" className="btn btn-success">
                                            ➕ Ajouter un professeur
                                        </Link>
                                        <Link to="/admin/matiere-create" className="btn btn-info">
                                            ➕ Ajouter une matiere
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {userRole === 'prof' && (
                <>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <span style={{ fontSize: '4rem' }}>📚</span>
                                    </div>
                                    <h3 className="card-title">Mes Classes</h3>
                                    <p className="card-text text-muted">
                                        Consultez les classes qui vous sont assignées
                                    </p>
                                    <Link to="/admin/mes-classes" className="btn btn-primary">
                                        Voir mes classes
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <span style={{ fontSize: '4rem' }}>💬</span>
                                    </div>
                                    <h3 className="card-title">Messages</h3>
                                    <p className="card-text text-muted">
                                        Consultez les messages de l'école
                                    </p>
                                    <Link to="/admin/messages" className="btn btn-primary">
                                        Voir les messages
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {userRole === 'etudiant' && (
                <>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <span style={{ fontSize: '4rem' }}>👥</span>
                                    </div>
                                    <h3 className="card-title">Les Étudiants</h3>
                                    <p className="card-text text-muted">
                                        Consultez la liste de vos camarades de classe
                                    </p>
                                    <Link to="/admin/mes-caramades" className="btn btn-primary">
                                        Voir les Étudiants
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body text-center">
                                    <div className="mb-3">
                                        <span style={{ fontSize: '4rem' }}>💬</span>
                                    </div>
                                    <h3 className="card-title">Messages</h3>
                                    <p className="card-text text-muted">
                                        Consultez les messages de l'école
                                    </p>
                                    <Link to="/admin/messages" className="btn btn-primary">
                                        Voir les messages
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
