import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classService from '../services/classe.service';

class MesClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            loading: true,
            error: ''
        };
    }

    componentDidMount() {
        // 1. On récupère l'ID (assure-toi que la clé est la même que dans LoginProf.js)
        const profId = localStorage.getItem('profId');

        if (!profId) {
            console.error("ID du professeur introuvable dans le localStorage");
            // Optionnel : rediriger vers la page de login
            return;
        }        
        if (profId) {
            classService.getClassesByProf(profId)
                .then(response => {
                    this.setState({
                        classes: response.data.data || [],
                        loading: false
                    });
                })
                .catch(error => {
                    this.setState({
                        error: 'Erreur lors du chargement des classes',
                        loading: false
                    });
                });
        } else {
            this.setState({
                error: 'Utilisateur non identifié',
                loading: false
            });
        }
    }

    render() {
        const { classes, loading, error } = this.state;

        return (
            <div>
                <div className="mb-4">
                    <h2>📚 Mes Classes</h2>
                    <p className="text-muted">Consulter les classes qui vous sont assignées</p>
                </div>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : classes.length > 0 ? (
                    <div className="row">
                        {classes.map((classe, index) => (
                            <div key={classe.id || index} className="col-md-6 col-lg-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <h5 className="card-title mb-0">{classe.nom}</h5>
                                            <span className="badge bg-primary">{classe.niveau}</span>
                                        </div>
                                        
                                        <div className="mb-3">
                                            <small className="text-muted d-block">
                                                <strong>Niveau:</strong> {classe.niveau}
                                            </small>
                                            {classe.description && (
                                                <small className="text-muted d-block mt-2">
                                                    <strong>Description:</strong> {classe.description}
                                                </small>
                                            )}
                                        </div>

                                        <div className="border-top pt-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <small className="text-muted">
                                                    📅 Créée le {new Date(classe.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                            <div className="mt-3">
                                                <Link 
                                                    to={`/admin/mes-classes/${classe.id}/etudiants`} 
                                                    className="btn btn-sm btn-primary w-100"
                                                >
                                                    👨‍🎓 Voir les étudiants
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info">
                        <h5>Aucune classe assignée</h5>
                        <p className="mb-0">Vous n'êtes actuellement assigné à aucune classe. Contactez l'administrateur.</p>
                    </div>
                )}
            </div>
        );
    }
}

export default MesClasses;
