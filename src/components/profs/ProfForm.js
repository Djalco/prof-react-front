import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import profService from '../../services/prof.service';
import classeService from '../../services/classe.service';
import TextInput from '../common/TextInput';
import MultiSelect from '../common/MultiSelect';

class ProfForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            bureau: '',
            mdp: '',
            selectedClasses: [],
            allClasses: [],
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClassesChange = this.handleClassesChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        
        // Charger toutes les classes
        classeService.getAll()
            .then(response => {
                this.setState({ allClasses: response.data.data || [] });
            })
            .catch(err => {
                console.error('Erreur lors du chargement des classes:', err);
            });

        if (this.props.edit) {
            // Charger les informations du professeur
            profService.getById(this.props.params.id)
                .then(response => {
                    this.setState({
                        ...response.data.data,
                        loading: false
                    });
                    
                    // Charger les classes assignées à ce professeur
                    return profService.getClasses(this.props.params.id);
                })
                .then(response => {
                    const classes = response.data.data || [];
                    this.setState({ 
                        selectedClasses: classes.map(c => c.id)
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

    handleClassesChange(selectedClasses) {
        this.setState({ selectedClasses });
    }

    handleSave() {
        this.setState({ loading: true });
        const { nom, prenom, bureau, mdp, selectedClasses } = this.state;
        const data = { nom, prenom, bureau, mdp: mdp || undefined };

        const savePromise = this.props.edit
            ? profService.update(this.props.params.id, data)
            : profService.create(data);

        savePromise
            .then((response) => {
                // Récupérer l'ID du professeur (nouvel ID ou ID existant)
                const profId = this.props.edit ? this.props.params.id : response.data.data.id;
                
                // Assigner les classes au professeur (même si le tableau est vide pour mettre à jour)
                return profService.assignClasses(profId, selectedClasses);
            })
            .then(() => {
                this.props.navigate('/admin/profs');
            })
            .catch((err) => {
                console.error('Erreur lors de la sauvegarde:', err);
                alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
                this.setState({ loading: false });
            });
    }

    handleCancel() {
        this.props.navigate('/admin/profs');
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
                    <TextInput
                        id="mdp"
                        label="Mot de passe"
                        type="password"
                        value={this.state.mdp}
                        onChange={this.handleChange}
                        required
                    />
                    
                    <MultiSelect
                        label="Classes"
                        options={this.state.allClasses}
                        selected={this.state.selectedClasses}
                        idKey="id"
                        labelKey=" niveau"                        labelFormatter={(classe) => `${classe.nom} ${classe.niveau}`}                        onChange={this.handleClassesChange}
                        disabled={loading}
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
function withRouter(Component) {
    return props => {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    };
}

export default withRouter(ProfForm);
