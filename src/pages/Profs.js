import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profService from '../services/prof.service';
import ProfList from '../components/profs/ProfList';
import matiereService from '../services/matiere.service';

class Profs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profSet: [],
            matieres :[],
            loading: true
        };
        this.removeProf = this.removeProf.bind(this);
    }

    componentDidMount() {
        // On charge les profs ET les matières en même temps
        Promise.all([
            profService.getAll(),
            matiereService.getAll()
        ])
            .then(([profRes, matiereRes]) => {
                this.setState({
                    profSet: profRes.data.data || [],
                    matieres: matiereRes.data.data || [], // <--- On stocke les matières
                    loading: false
                });
            })
            .catch((err) => {
                console.error("Erreur de chargement", err);
                this.setState({ loading: false });
            });
    }
    removeProf(id) {
        const res = this.state.profSet.filter((item) => item.id !== id);
        this.setState({ profSet: res });
    }

    render() {
        const { loading, profSet ,matieres} = this.state;

        return (
            <div>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h2>👨‍🏫 Liste des Professeurs</h2>
                    <div>
                        <Link to="/admin/prof-create">
                            <button className='btn btn-primary'>
                                ➕ Ajouter un professeur
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
                                // On passe les matières à ProfList
                                <ProfList
                                    profs={profSet}
                                    matieres={matieres}
                                    onDelete={this.removeProf}
                                />
                            ) : (
                                <div className="alert alert-info">Aucun professeur trouvé.</div>
                            )}
                        </div>
                )}
            </div>
        );
    }
}

export default Profs;