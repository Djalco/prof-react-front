import React, { Component } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import profService from '../services/prof.service';
import classeService from '../services/classe.service';

class ProfClasses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prof: null,
            assignedClasses: [],
            availableClasses: [],
            selectedClasses: [],
            loading: true
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const profId = this.props.params.id;
        
        Promise.all([
            profService.getById(profId),
            profService.getClasses(profId),
            classeService.getAll()
        ])
        .then(([profRes, assignedClassesRes, allClassesRes]) => {
            const assignedClasses = assignedClassesRes.data.data || [];
            const allClasses = allClassesRes.data.data || [];
            
            // Filtrer les classes disponibles (non assignées)
            const assignedIds = assignedClasses.map(c => c.id);
            const availableClasses = allClasses.filter(c => !assignedIds.includes(c.id));
            
            this.setState({
                prof: profRes.data.data,
                assignedClasses,
                availableClasses,
                loading: false
            });
        })
        .catch(err => {
            console.error('Erreur lors du chargement:', err);
            this.setState({ loading: false });
        });
    }

    handleSelectClasse = (classeId) => {
        const { selectedClasses } = this.state;
        if (selectedClasses.includes(classeId)) {
            this.setState({ selectedClasses: selectedClasses.filter(id => id !== classeId) });
        } else {
            this.setState({ selectedClasses: [...selectedClasses, classeId] });
        }
    }

    handleAssign = () => {
        const { selectedClasses, assignedClasses } = this.state;
        if (selectedClasses.length === 0) return;

        const profId = this.props.params.id;
        const currentClasseIds = assignedClasses.map(c => c.id);
        const newClasseIds = [...currentClasseIds, ...selectedClasses];

        profService.assignClasses(profId, newClasseIds)
            .then(() => {
                this.setState({ selectedClasses: [] });
                this.loadData();
            })
            .catch(err => {
                console.error('Erreur lors de l\'assignation:', err);
            });
    }

    handleRemove = (classeId) => {
        const { assignedClasses } = this.state;
        const profId = this.props.params.id;
        const newClasseIds = assignedClasses.filter(c => c.id !== classeId).map(c => c.id);

        profService.assignClasses(profId, newClasseIds)
            .then(() => {
                this.loadData();
            })
            .catch(err => {
                console.error('Erreur lors de la suppression:', err);
            });
    }

    render() {
        const { prof, assignedClasses, availableClasses, selectedClasses, loading } = this.state;

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
                    <h2>Gérer les classes du professeur: {prof?.nom} {prof?.prenom}</h2>
                    <Link to="/profs">
                        <button className="btn btn-secondary">Retour aux professeurs</button>
                    </Link>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">Classes assignées</h5>
                            </div>
                            <div className="card-body">
                                {assignedClasses.length === 0 ? (
                                    <p className="text-muted">Aucune classe assignée</p>
                                ) : (
                                    <ul className="list-group">
                                        {assignedClasses.map(classe => (
                                            <li key={classe.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                <span>{classe.nom} {classe.niveau}</span>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => this.handleRemove(classe.id)}
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
                                <h5 className="mb-0">Classes disponibles</h5>
                            </div>
                            <div className="card-body">
                                {availableClasses.length === 0 ? (
                                    <p className="text-muted">Aucune classe disponible</p>
                                ) : (
                                    <>
                                        <ul className="list-group mb-3">
                                            {availableClasses.map(classe => (
                                                <li 
                                                    key={classe.id} 
                                                    className={`list-group-item d-flex justify-content-between align-items-center ${selectedClasses.includes(classe.id) ? 'active' : ''}`}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => this.handleSelectClasse(classe.id)}
                                                >
                                                    <span>{classe.nom} {classe.niveau}</span>
                                                    {selectedClasses.includes(classe.id) && (
                                                        <span className="badge bg-light text-dark">✓</span>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                        <button
                                            className="btn btn-primary"
                                            onClick={this.handleAssign}
                                            disabled={selectedClasses.length === 0}
                                        >
                                            Assigner les classes sélectionnées
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

export default withRouter(ProfClasses);
