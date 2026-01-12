import { Component } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classeService from "../../services/classe.service";

class ClasseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            niveau: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    componentDidMount() {
        if (this.props.edit) {
            this.setState({ loading: true });
            classeService.getById(this.props.params.id)
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
        const { nom, niveau } = this.state;
        const data = { nom, niveau };
        const savePromise = this.props.edit
            ? classeService.update(this.props.params.id, data)
            : classeService.create(data);
        savePromise
            .then(() => {
                this.props.navigate('/classes');
            })
            .catch(() => {
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