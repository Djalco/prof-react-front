import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <div className="text-center mb-5">
                <h1 className="display-4">Bienvenue a vous</h1>
                <p className="lead text-muted">Gérez votre Ecole</p>
            </div>
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
                            <Link to="/etudiants" className="btn btn-primary">
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
                            <Link to="/classes" className="btn btn-primary">
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
                            <Link to="/profs" className="btn btn-primary">
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
                            <Link to="/messages" className="btn btn-primary">
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
                                <Link to="/prof-create" className="btn btn-success">
                                    ➕ Ajouter un professeur
                                </Link>
                                <Link to="/messages" className="btn btn-info">
                                    ✍️ Écrire un message
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
