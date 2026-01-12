import React, { Component } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import classeService from '../services/classe.service';
import profService from '../services/prof.service';

class ClasseProfs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classe: null,
            assignedProfs: [],
            availableProfs: [],
            selectedProfs: [],
            loading: true
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const classeId = this.props.params.id;
        
        Promise.all([
            classeService.getById(classeId),
            classeService.getProfs(classeId),
            profService.getAll()
        ])
        .then(([classeRes, assignedProfsRes, allProfsRes]) => {
            const assignedProfs = assignedProfsRes.data.data || [];
            const allProfs = allProfsRes.data.data || [];
            
            // Filtrer les professeurs disponibles (non assignés)
            const assignedIds = assignedProfs.map(p => p.id);
            const availableProfs = allProfs.filter(p => !assignedIds.includes(p.id));
            
            this.setState({
                classe: classeRes.data.data,
                assignedProfs,
                availableProfs,
                loading: false
            });
        })
        .catch(err => {
            console.error('Erreur lors du chargement:', err);
            this.setState({ loading: false });
        });
    }

    handleSelectProf = (profId) => {
        const { selectedProfs } = this.state;
        if (selectedProfs.includes(profId)) {
            this.setState({ selectedProfs: selectedProfs.filter(id => id !== profId) });
        } else {
            this.setState({ selectedProfs: [...selectedProfs, profId] });
        }
    }

    handleAssign = () => {
        const { selectedProfs, assignedProfs } = this.state;
        if (selectedProfs.length === 0) return;

        const classeId = this.props.params.id;
        const currentProfIds = assignedProfs.map(p => p.id);
        const newProfIds = [...currentProfIds, ...selectedProfs];

        classeService.assignProfs(classeId, newProfIds)
            .then(() => {
                this.setState({ selectedProfs: [] });
                this.loadData();
            })
            .catch(err => {
                console.error('Erreur lors de l\'assignation:', err);
            });
    }

    handleRemove = (profId) => {
        const { assignedProfs } = this.state;
        const classeId = this.props.params.id;
        const newProfIds = assignedProfs.filter(p => p.id !== profId).map(p => p.id);

        classeService.assignProfs(classeId, newProfIds)
            .then(() => {
                this.loadData();
            })
            .catch(err => {
                console.error('Erreur lors de la suppression:', err);
            });
    }

    render() {
        const { classe, assignedProfs, availableProfs, selectedProfs, loading } = this.state;

        if (loading) {
            return (
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Gérer les professeurs de la classe: {classe?.nom}</h2>
                    <Link to="/classes">
                        <button className="btn btn-secondary">Retour aux classes</button>
                    </Link>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">Professeurs assignés</h5>
                            </div>
                            <div className="card-body">
                                {assignedProfs.length === 0 ? (
                                    <p className="text-muted">Aucun professeur assigné</p>
                                ) : (
                                    <ul className="list-group">
                                        {assignedProfs.map(prof => (
                                            <li key={prof.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>{prof.nom} {prof.prenom}</span>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => this.handleRemove(prof.id)}
                                                >
                                                    Retirer
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">Professeurs disponibles</h5>
                            </div>
                            <div className="card-body">
                                {availableProfs.length === 0 ? (
                                    <p className="text-muted">Aucun professeur disponible</p>
                                ) : (
                                    <>
                                        <ul className="list-group mb-3">
                                            {availableProfs.map(prof => (
                                                <li 
                                                    key={prof.id} 
                                                    className={`list-group-item d-flex justify-content-between align-items-center ${selectedProfs.includes(prof.id) ? 'active' : ''}`}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => this.handleSelectProf(prof.id)}
                                                >
                                                    <span>{prof.nom} {prof.prenom}</span>
                                                    {selectedProfs.includes(prof.id) && (
                                                        <span className="badge bg-light text-dark">✓</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.handleAssign}
                                            disabled={selectedProfs.length === 0}
                                        >
                                            Assigner les professeurs sélectionnés
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// HOC pour injecter params et navigate
function withRouter(Component) {
    return props => {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    };
}

export default withRouter(ClasseProfs);
