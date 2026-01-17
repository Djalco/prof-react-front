import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classService from '../services/classe.service';

class ClasseEtudiantsBase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classe: null,
            etudiants: [],
            loading: true,
            error: ''
        };
    }

    componentDidMount() {
        const { classeId } = this.props.params;
        
        if (classeId) {
            // Récupérer les informations de la classe
            classService.getById(classeId)
                .then(response => {
                    this.setState({ classe: response.data.data });
                })
                .catch(error => {
                    console.error('Erreur classe:', error);
                });

            // Récupérer les étudiants de la classe
            classService.getEtudiants(classeId)
                .then(response => {
                    this.setState({
                        etudiants: response.data.data || [],
                        loading: false
                    });
                })
                .catch(error => {
                    this.setState({
                        error: 'Erreur lors du chargement des étudiants',
                        loading: false
                    });
                });
        } else {
            this.setState({
                error: 'Identifiant de classe manquant',
                loading: false
            });
        }
    }

    handleGoBack = () => {
        this.props.navigate('/admin/mes-classes');
    }

    render() {
        const { classe, etudiants, loading, error } = this.state;

        return (
            <div>
                <div className="mb-4">
                    <button 
                        className="btn btn-outline-secondary mb-3" 
                        onClick={this.handleGoBack}
                    >
                        ← Retour à mes classes
                    </button>
                    
                    <h2>👨‍🎓 Étudiants de la classe</h2>
                    {classe && (
                        <div className="mb-3">
                            <h4 className="text-primary">{classe.nom}</h4>
                            <span className="badge bg-secondary">{classe.niveau}</span>
                            {classe.description && (
                                <p className="text-muted mt-2">{classe.description}</p>
                            )}
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : etudiants.length > 0 ? (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">
                                Liste des étudiants ({etudiants.length})
                            </h5>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Prénom</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {etudiants.map((etudiant, index) => (
                                            <tr key={etudiant.id || index}>
                                                <td>{index + 1}</td>
                                                <td>{etudiant.nom}</td>
                                                <td>{etudiant.prenom}</td>
                                                <td>{etudiant.email}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-info">
                        <h5>Aucun étudiant</h5>
                        <p className="mb-0">Cette classe ne contient actuellement aucun étudiant.</p>
                    </div>
                )}
            </div>
        );
    }
}

// Wrapper function pour utiliser les hooks React Router v6
function ClasseEtudiants(props) {
    const params = useParams();
    const navigate = useNavigate();
    
    return <ClasseEtudiantsBase {...props} params={params} navigate={navigate} />;
}

export default ClasseEtudiants;
