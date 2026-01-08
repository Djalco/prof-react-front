import { Component } from "react";
import ProfService from "./service/ProfService";
import { useParams, useNavigate } from "react-router-dom";

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = { nom: '', prenom: '', bureau: '' };
        this.changeHandler = this.changeHandler.bind(this);
        this.saveHandler = this.saveHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.edit) {
            ProfService.getById(this.props.params.id)
                .then(response => {
                    this.setState({ ...response.data.data });
                });
        }
    }

    saveHandler() {
        if (this.props.edit) {
            ProfService.update(this.props.params.id, this.state)
                .then(() => this.props.navigate('/'));
        } else {
            ProfService.create({ ...this.state, mdp: '' })
                .then(() => this.props.navigate('/'));
        }
    }

    changeHandler(evt) {
        const fieldId = evt.target.id;
        this.setState(prevState => ({
            ...prevState,
            [fieldId]: evt.target.value
        }));
    }

    cancelHandler() {
        this.props.navigate('/');
    }

    render() {
        return (
            <div>
                <TextInput id="nom" label="Nom" value={this.state.nom} onChange={this.changeHandler} />
                <TextInput id="prenom" label="Prenom" value={this.state.prenom} onChange={this.changeHandler} />
                <TextInput id="bureau" label="Bureau" value={this.state.bureau} onChange={this.changeHandler} />
                <br />
                <button className="btn btn-primary" onClick={this.saveHandler}>Enregistrer</button>
                <button className="btn btn-secondary" onClick={this.cancelHandler}>Retour</button>
            </div>
        );
    }
}

function TextInput(props) {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}: </label>
            <input type="text" id={props.id} className="form-control"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

// HOC pour injecter params et navigate dans les class components
export function withRouter(Component) {
    return props => {
        const params = useParams();
        const navigate = useNavigate();
        return <Component {...props} params={params} navigate={navigate} />;
    };
}

export default withRouter(Form);
