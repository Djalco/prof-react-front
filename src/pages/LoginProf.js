import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import profAuthService from "../services/profAuth.service";
import { authUtils } from "../utils/auth";
import TextInput from "../components/common/TextInput";

class LoginProf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            mdp: "",
            redirectToHome: false,
            error: "",
            loading: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        const { id, value } = evt.target;
        this.setState({ [id]: value, error: "" });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true, error: "" });

        profAuthService.login({
            email: this.state.email,
            mdp: this.state.mdp
        })
            .then(response => {
                if (response.data.token) {
                    authUtils.setToken(response.data.token);
                    // Stocker les informations du professeur
                    localStorage.setItem('userName', response.data.nom + ' ' + (response.data.prenom || ''));
                    localStorage.setItem('userRole', 'prof');
                    localStorage.setItem('userId', response.data.profId);
                    this.setState({ redirectToHome: true });
                }
            })
            .catch(error => {
                const errorMessage = error.response?.data?.message || "Identifiants incorrects";
                this.setState({
                    error: errorMessage,
                    loading: false
                });
            });
    }

    render() {
        if (this.state.redirectToHome) {
            return <Navigate to="/admin" replace />;
        }

        const { error, loading } = this.state;

        return (
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <span style={{ fontSize: '4rem' }}>👨‍🏫</span>
                            </div>
                            <h2 className="card-title text-center mb-4">Connexion Professeur</h2>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={this.handleSubmit}>
                                <TextInput
                                    id="email"
                                    label="Email d'utilisateur"
                                    type="text"
                                    value={this.state.email}
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
                                /> <br />
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={loading}
                                >
                                    {loading ? 'Connexion...' : 'Se connecter'}
                                </button>
                            </form>
                            
                            <div className="text-center mt-3">
                                <a href="/login" className="text-muted">
                                    Se connecter en tant qu'Admin/Étudiant
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginProf;