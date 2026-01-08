import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import etudiantService from '../services/etudiant.service';
import EtudiantList from '../components/etudiants/EtudiantList';

class Etudiants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            etudiantSet: [],
            loading: true
        };
        this.removeetudiant = this.removeetudiant.bind(this);
    }

    componentDidMount() {
        etudiantService.getAll()
            .then(response => {
                this.setState({
                    etudiantSet: response.data.data,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({ loading: false });
            });
    }

    removeetudiant(id) {
        const res = this.state.etudiantSet.filter((item) => item.id !== id);
        this.setState({ etudiantSet: res });
    }

    render() {
        const { loading, etudiantSet } = this.state;

        return (
            <div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h2>👨‍🏫 Liste des etudiants</h2>
                    <div>
                        <Link to="/etudiant-create">
                            <button className='btn btn-primary'>
                                ➕ Ajouter un etudiant
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
                        {etudiantSet.length > 0 ? (
                                <EtudiantList etudiants={etudiantSet} onDelete={this.removeetudiant} />
                        ) : (
                            <div className="alert alert-info">
                                Aucun etudiant trouvé. Ajoutez-en un !
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Etudiants;