import { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import etudiantService from "../../services/etudiant.service";
import classService from "../../services/classe.service";

class EtudiantForm extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            classeId: '',
            classes: [],
            loading: false  
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() {
        // Charger la liste des classes
        classService.getAll()
            .then(response => {
                this.setState({ classes: response.data.data || [] });
            })
            .catch(error => {
                console.error('Erreur lors du chargement des classes:', error);
            });

        if (this.props.edit) {
            this.setState({ loading: true });
            etudiantService.getById(this.props.params.id)
                .then(response => {
                    this.setState({
                        ...response.data.data,
                        loading: false
                    });
                })
                .catch(() => {
                    this.setState({ loading: false });
                });         
        }
    }
    handleChange(evt) {
        const { id, value } = evt.target;
        this.setState({ [id]: value });
    }   
    handleSave() {
        this.setState({ loading: true });
        const { nom, prenom, email, classeId } = this.state;         
        const data = { nom, prenom, email, classeId: classeId || null };
        const savePromise = this.props.edit
            ? etudiantService.update(this.props.params.id, data)
            : etudiantService.create(data); 
        savePromise
            .then(() => {
                this.props.navigate('/admin/etudiants');   
            })
            .catch(() => {
                this.setState({ loading: false });
            }); 
    }
    handleCancel() {
        this.props.navigate('/admin/etudiants');
    }       
    render() {
        const { loading } = this.state;
        return (
            <div>       
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>{this.props.edit ? '✏️ Modifier un étudiant' : '➕ Ajouter un étudiant'}</h2>
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
                                <label htmlFor="prenom" className="form-label">Prénom</label>
                                <input
                                    type="text"     
                                    id="prenom"
                                    className="form-control"
                                    value={this.state.prenom}
                                    onChange={this.handleChange}        
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"     
                                    id="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={this.handleChange}        
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classeId" className="form-label">Classe</label>
                                <select
                                    id="classeId"
                                    className="form-select"
                                    value={this.state.classeId}
                                    onChange={this.handleChange}
                                >
                                    <option value="">-- Sélectionner une classe --</option>
                                    {this.state.classes.map(classe => (
                                        <option key={classe.id} value={classe.id}>
                                            {classe.nom} - {classe.niveau}
                                        </option>
                                    ))}
                                </select>
                            </div>
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

export default withRouter(EtudiantForm);