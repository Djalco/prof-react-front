import React, { Component } from 'react';
import etudiantService from '../services/etudiant.service';

class MesCaramades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            etudiants: [],
            classe: null,
            loading: true,
            error: ''
        };
    }

    componentDidMount() {
        const userId = localStorage.getItem('userId');
        
        if (userId) {
            // Récupérer les informations de l'étudiant connecté
            etudiantService.getById(userId)
                .then(response => {
                    const etudiantData = response.data.data;
                    this.setState({ classe: etudiantData.classeId });
                    
                    // Si l'étudiant a une classe, récupérer tous les étudiants de cette classe
                    if (etudiantData.classeId) {
                        return etudiantService.getAll();
                    } else {
                        throw new Error('Vous n\'êtes assigné à aucune classe');
                    }
                })
                .then(response => {
                    const allEtudiants = response.data.data || [];
                    // Filtrer uniquement les étudiants de la même classe
                    const mesCaramades = allEtudiants.filter(
                        etudiant => etudiant.classeId === this.state.classe
                    );
                    
                    this.setState({
                        etudiants: mesCaramades,
                        loading: false
                    });
                })
                .catch(error => {
                    this.setState({
                        error: error.message || 'Erreur lors du chargement des camarades',
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
        const { etudiants, loading, error } = this.state;
        const currentUserId = localStorage.getItem('userId');

        return (
            <div>
                <div className="mb-4">
                    <h2>👥 Mes Camarades de Classe</h2>
                    <p className="text-muted">Liste des étudiants de votre classe</p>
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
                                {etudiants.length} étudiant{etudiants.length > 1 ? 's' : ''} dans votre classe
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
                                            <tr 
                                                key={etudiant.id || index}
                                                className={etudiant.id === parseInt(currentUserId) ? 'table-primary' : ''}
                                            >
                                                <td>{index + 1}</td>
                                                <td>
                                                    {etudiant.nom}
                                                    {etudiant.id === parseInt(currentUserId) && (
                                                        <span className="badge bg-primary ms-2">Vous</span>
                                                    )}
                                                </td>
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
                        <h5>Aucun camarade</h5>
                        <p className="mb-0">Votre classe ne contient actuellement aucun autre étudiant.</p>
                    </div>
                )}
            </div>
        );
    }
}

export default MesCaramades;
