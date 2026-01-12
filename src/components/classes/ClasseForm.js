import { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classeService from "../../services/classe.service";
import profService from "../../services/prof.service";
import MultiSelect from "../common/MultiSelect";

class ClasseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            niveau: '',
            selectedProfs: [],
            allProfs: [],
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleProfsChange = this.handleProfsChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        
        // Charger tous les professeurs
        profService.getAll()
            .then(response => {
                this.setState({ allProfs: response.data.data || [] });
            })
            .catch(err => {
                console.error('Erreur lors du chargement des professeurs:', err);
            });

        if (this.props.edit) {
            // Charger les informations de la classe
            classeService.getById(this.props.params.id)
                .then(response => {
                    this.setState({
                        ...response.data.data,
                        loading: false
                    });
                    
                    // Charger les professeurs assignés à cette classe
                    return classeService.getProfs(this.props.params.id);
                })
                .then(response => {
                    const profs = response.data.data || [];
                    this.setState({ 
                        selectedProfs: profs.map(p => p.id)
                    });
                })
                .catch(err => {
                    console.error('Erreur:', err);
                    this.setState({ loading: false });
                });
        } else {
            this.setState({ loading: false });
        }
    }

    handleChange(evt) {
        const { id, value } = evt.target;
        this.setState({ [id]: value });
    }
    
    handleProfsChange(selectedProfs) {
        this.setState({ selectedProfs });
    }

    handleSave() {
        this.setState({ loading: true });
        const { nom, niveau, selectedProfs } = this.state;
        const data = { nom, niveau };
        
        const savePromise = this.props.edit
            ? classeService.update(this.props.params.id, data)
            : classeService.create(data);
        
        savePromise
            .then((response) => {
                // Récupérer l'ID de la classe (nouvel ID ou ID existant)
                const classeId = this.props.edit ? this.props.params.id : response.data.data.id;
                
                // Assigner les professeurs à la classe (même si le tableau est vide pour mettre à jour)
                return classeService.assignProfs(classeId, selectedProfs);
            })
            .then(() => {
                this.props.navigate('/classes');
            })
            .catch((err) => {
                console.error('Erreur lors de la sauvegarde:', err);
                alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
                this.setState({ loading: false });
            });
    }

    handleCancel() {
        this.props.navigate('/classes');
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>{this.props.edit ? '✏️ Modifier une classe' : '➕ Ajouter une classe'}</h2>
                </div>
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="nom" className="form-label">Nom</label>
                                <input
                                    type="text"
                                    id="nom"
                                    className="form-control"
                                    value={this.state.nom}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="niveau" className="form-label">Niveau</label>
                                <input
                                    type="text"
                                    id="niveau"
                                    className="form-control"
                                    value={this.state.niveau}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            
                            <MultiSelect
                                label="Professeurs"
                                options={this.state.allProfs}
                                selected={this.state.selectedProfs}
                                idKey="id"
                                labelKey="nom"
                                onChange={this.handleProfsChange}
                                disabled={loading}
                            />
                            
                            <button className="btn btn-primary me-2" onClick={this.handleSave}>
                                Enregistrer
                            </button>
                            <button className="btn btn-secondary" onClick={this.handleCancel}>
                                Annuler
                            </button>
                        </div>
                    </div>
                )}
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

export default withRouter(ClasseForm);
