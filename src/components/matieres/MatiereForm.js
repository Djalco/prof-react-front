import { Component } from "react";
import matiereService from "../../services/matiere.service";
import { useNavigate, useParams } from "react-router-dom";

class MatiereForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            coef: '',
            allMatieres: [],
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    }

    componentDidMount() {
        this.setState({ loading: true });

        matiereService.getAll()
            .then(response => {
                this.setState({ allMatieres: response.data.data || [] });
            })
            .catch(err => {
                console.error('Erreur lors du chargement des matieres:', err)
            });

        if (this.props.edit) {
            this.setState({ loading: true });
            matiereService.getById(this.props.params.id)
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

    handleCancel() {
        this.props.navigate('/admin/matieres');
    }

    handleSave() {
        this.setState({ loading: true });
        const { nom, coef } = this.state;
        const data = { nom, coef };

        const savePromise = this.props.edit
            ? matiereService.update(this.props.params.id, data)
            : matiereService.create(data);

        savePromise
            /* .then((response) =>{
                const matiereId = this.props.edit ? this.props.params.id : response.data.data.id;
                return matiereService.assgnProfs(matiereId,selectedProfs)
            }) */
            .then(() => {
                this.props.navigate('/admin/matieres')
            })
            .catch((err) => {
                console.error('Erreur lors de la sauvegarde:', err)
                alert('Erreur lors de la sauvegarde. Veillez reessayer.')
                this.setState({ loading: false })
            })
    }
    render() {
        const { loading } = this.state;
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>{this.props.edit ? '✏️ Modifier une matiere' : '➕ Ajouter une matiere'}</h2>
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
                                <label htmlFor="niveau" className="form-label">Coefficient</label>
                                <input
                                    type="text"
                                    id="coef"
                                    className="form-control"
                                    value={this.state.coef}
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

// HOC pour injecter params et navigate
function withRouter(Component) {
    return props => {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    };
}

export default withRouter(MatiereForm);