import { Component } from "react";
import { useNavigate } from "react-router-dom";

class Home extends Component {

    handleRoleSelection = (role) => {
        const { navigate } = this.props;
        
        switch(role) {
            case 'admin':
                navigate('/login');
                break;
            case 'prof':
                navigate('/login-prof');
                break;
            case 'etudiant':
                navigate('/login');
                break;
            default:
                break;
        }
    }

    render() {
        return(
            <div className="container">
                <div className="text-center mb-5">
                    <h1 className="display-4 mb-3">Bienvenue</h1>
                    <p className="lead text-muted">Choisissez votre rôle pour continuer</p>
                </div>

                <div className="row justify-content-center g-4">
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm hover-card">
                            <div className="card-body text-center p-5">
                                <div className="mb-4">
                                    <span style={{ fontSize: '5rem' }}>👨‍💼</span>
                                </div>
                                <h3 className="card-title mb-3">Administrateur</h3>
                                <p className="card-text text-muted mb-4">
                                    Accès complet à la gestion de l'école
                                </p>
                                <button 
                                    className="btn btn-primary btn-lg w-100"
                                    onClick={() => this.handleRoleSelection('admin')}
                                >
                                    Accéder au Dashboard Admin
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm hover-card">
                            <div className="card-body text-center p-5">
                                <div className="mb-4">
                                    <span style={{ fontSize: '5rem' }}>👨‍🏫</span>
                                </div>
                                <h3 className="card-title mb-3">Professeur</h3>
                                <p className="card-text text-muted mb-4">
                                    Gérer vos classes et vos étudiants
                                </p>
                                <button 
                                    className="btn btn-success btn-lg w-100"
                                    onClick={() => this.handleRoleSelection('prof')}
                                >
                                    Accéder à l'espace Prof
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm hover-card">
                            <div className="card-body text-center p-5">
                                <div className="mb-4">
                                    <span style={{ fontSize: '5rem' }}>👨‍🎓</span>
                                </div>
                                <h3 className="card-title mb-3">Étudiant</h3>
                                <p className="card-text text-muted mb-4">
                                    Consulter vos cours et informations
                                </p>
                                <button 
                                    className="btn btn-info btn-lg w-100"
                                    onClick={() => this.handleRoleSelection('etudiant')}
                                >
                                    Accéder à l'espace Étudiant
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// HOC pour injecter navigate
function withRouter(Component) {
    return props => {
        const navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    };
}

export default withRouter(Home);