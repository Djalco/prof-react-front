import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import profService from '../services/prof.service';
import ProfList from '../components/profs/ProfList';
import { authUtils } from '../utils/auth';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profSet: [],
            redirectToLogin: false,
            loading: true
        };
        this.removeProf = this.removeProf.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        profService.getAll()
            .then(response => {
                this.setState({
                    profSet: response.data.data,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({ loading: false });
            });
    }

    removeProf(id) {
        const res = this.state.profSet.filter((item) => item.id !== id);
        this.setState({ profSet: res });
    }

    handleLogout() {
        authUtils.removeToken();
        this.setState({ redirectToLogin: true });
    }

    render() {
        if (this.state.redirectToLogin) {
            return <Navigate to="/login" />;
        }

        const { loading, profSet } = this.state;

        return (
            <div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h2>Liste des Professeurs</h2>
                    <div>
                        <button
                            className='btn btn-danger me-2'
                            onClick={this.handleLogout}
                        >
                            Déconnexion
                        </button>
                        <Link to="/prof-create">
                            <button className='btn btn-primary'>
                                Ajouter un professeur
                            </button>
                        </Link>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Chargement...</span>
                        </div>
                    </div>
                ) : (
                    <div>
                        {profSet.length > 0 ? (
                            <ProfList profs={profSet} onDelete={this.removeProf} />
                        ) : (
                            <div className="alert alert-info">
                                Aucun professeur trouvé. Ajoutez-en un !
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Home;