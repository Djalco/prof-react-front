import React, { Component } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

        if (!classeId) {
            this.setState({ error: 'Identifiant de classe manquant', loading: false });
            return;
        }

        this.setState({ loading: true });

        // Chargement parallèle de la classe et de ses étudiants
        Promise.all([
            classService.getById(classeId),
            classService.getEtudiants(classeId)
        ])
        .then(([classeRes, etudiantsRes]) => {
            this.setState({
                classe: classeRes.data.data,
                etudiants: etudiantsRes.data.data || [],
                loading: false
            });
        })
        .catch(error => {
            console.error('Erreur lors du chargement:', error);
            this.setState({
                error: 'Impossible de récupérer les données de la classe.',
                loading: false
            });
        });
    }

    handleGoBack = () => {
        this.props.navigate('/admin/mes-classes');
    }

    render() {
        const { classe, etudiants, loading, error } = this.state;
        const { classeId } = this.props.params;

        if (loading) {
            return (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="alert alert-danger shadow-sm">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
                    <button className="btn btn-link" onClick={this.handleGoBack}>Retour</button>
                </div>
            );
        }

        return (
            <div className="container-fluid">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <button className="btn btn-sm btn-outline-secondary mb-2" onClick={this.handleGoBack}>
                            ← Retour à mes classes
                        </button>
                        <h2 className="fw-bold">👨‍🎓 Gestion de la Classe</h2>
                    </div>
                    
                    {/* Lien vers la saisie des notes collective */}
                    <Link to={`/admin/mes-classes/${classeId}/saisie-notes`}>
                        <button className="btn btn-success shadow-sm">
                            <i className="bi bi-plus-circle me-2"></i> Attribuer les Notes
                        </button>
                    </Link>
                </div>

                {/* Infos de la Classe */}
                {classe && (
                    <div className="card border-0 shadow-sm mb-4 bg-light">
                        <div className="card-body">
                            <div className="row align-items-center">
                                {/* <div className="col-auto">
                                    <div className="bg-primary text-white rounded p-3">
                                        <h3 className="mb-0">{classe.niveau}</h3>
                                    </div>
                                </div> */}
                                <div className="col">
                                    <h4 className="card-title text-dark mb-1">{classe.nom} {classe.niveau} </h4>
                                    <p className="card-text text-muted mb-0">
                                        {classe.description || "Aucune description fournie pour cette classe."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tableau des Étudiants */}
                <div className="card border-0 shadow-sm">
                    <div className="card-header bg-white py-3">
                        <h5 className="mb-0">Liste des élèves inscrits ({etudiants.length})</h5>
                    </div>
                    <div className="card-body p-0">
                        {etudiants.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th className="ps-4">#</th>
                                            <th>Nom & Prénom</th>
                                            <th>Email</th>
                                            <th className="text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {etudiants.map((etudiant, index) => (
                                            <tr key={etudiant.id || index}>
                                                <td className="ps-4 text-muted">{index + 1}</td>
                                                <td>
                                                    <span className="fw-bold text-dark">{etudiant.nom.toUpperCase()}</span> {etudiant.prenom}
                                                </td>
                                                <td>{etudiant.email}</td>
                                                <td className="text-center">
                                                    <Link 
                                                        to={`/admin/etudiant/${etudiant.id}/notes`} 
                                                        className="btn btn-sm btn-outline-primary"
                                                    >
                                                        Consulter bulletin
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <p className="text-muted">Aucun étudiant n'est encore inscrit dans cette classe.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

// Wrapper pour React Router v6
function ClasseEtudiants(props) {
    const params = useParams();
    const navigate = useNavigate();
    return <ClasseEtudiantsBase {...props} params={params} navigate={navigate} />;
}

export default ClasseEtudiants;