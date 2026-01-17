import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import etudiantAuthService from '../services/etudiantAuth.service';
import { authUtils } from '../utils/auth';

class LoginEtudiant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            nom: '',
            error: '',
            loading: false,
            redirectToAdmin: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true, error: '' });

        const { email, nom } = this.state;

        etudiantAuthService.login(email, nom)
            .then(() => {
                this.setState({ redirectToAdmin: true });
            })
            .catch(error => {
                this.setState({
                    error: error.response?.data?.message || 'Erreur de connexion',
                    loading: false
                });
            });
    }

    render() {
        if (this.state.redirectToAdmin || authUtils.isAuthenticated()) {
            return <Navigate to="/admin/mes-caramades" replace />;
        }

        const { email, nom, error, loading } = this.state;

        return (
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <h2 className="mb-2">👨‍🎓 Connexion Étudiant</h2>
                                    <p className="text-muted">Accédez à votre espace</p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={this.handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={this.handleChange}
                                            required
                                            placeholder="votre.email@exemple.com"
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="nom" className="form-label">
                                            Nom
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="nom"
                                            name="nom"
                                            value={nom}
                                            onChange={this.handleChange}
                                            required
                                            placeholder="Votre nom"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Connexion...
                                            </>
                                        ) : (
                                            'Se connecter'
                                        )}
                                    </button>
                                </form>

                                <div className="text-center mt-3">
                                    <a href="/" className="text-decoration-none">
                                        ← Retour à l'accueil
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginEtudiant;
