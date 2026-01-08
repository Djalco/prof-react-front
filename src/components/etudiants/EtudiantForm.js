import { Component } from "react";
import { withRouter } from "../profs/ProfForm";
import etudiantService from "../../services/etudiant.service";

class EtudiantForm extends Component {
    constructor(props) {
        super(props);   
        this.state = {
            nom: '',
            prenom: '',
            loading: false  
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() {
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
        const { nom, prenom } = this.state;         
        const data = { nom, prenom };
        const savePromise = this.props.edit
            ? etudiantService.update(this.props.params.id, data)
            : etudiantService.create(data); 
        savePromise
            .then(() => {
                this.props.navigate('/');   
            })
            .catch(() => {
                this.setState({ loading: false });
            }); 
    }
    handleCancel() {
        this.props.navigate('/');
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
export default withRouter(EtudiantForm);