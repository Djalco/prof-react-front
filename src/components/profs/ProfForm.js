import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import profService from '../../services/prof.service';
import TextInput from '../common/TextInput';

class ProfForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            bureau: '',
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        if (this.props.edit) {
            this.setState({ loading: true });
            profService.getById(this.props.params.id)
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
        const { nom, prenom, bureau } = this.state;
        const data = { nom, prenom, bureau, mdp: '' };

        const savePromise = this.props.edit
            ? profService.update(this.props.params.id, data)
            : profService.create(data);

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
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">
                        {this.props.edit ? 'Modifier un professeur' : 'Ajouter un professeur'}
                    </h3>
                    <TextInput
                        id="nom"
                        label="Nom"
                        value={this.state.nom}
                        onChange={this.handleChange}
                        required
                    />
                    <TextInput
                        id="prenom"
                        label="Prénom"
                        value={this.state.prenom}
                        onChange={this.handleChange}
                        required
                    />
                    <TextInput
                        id="bureau"
                        label="Bureau"
                        value={this.state.bureau}
                        onChange={this.handleChange}
                        required
                    />
                    <div className="mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={this.handleSave}
                            disabled={loading}
                        >
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </button>
                        <button
                            className="btn btn-secondary ms-2"
                            onClick={this.handleCancel}
                            disabled={loading}
                        >
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

// HOC pour injecter params et navigate
export function withRouter(Component) {
    return props => {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    };
}

export default withRouter(ProfForm);
