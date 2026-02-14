import { Component } from "react";
import matiereService from "../services/matiere.service";
import { Link } from "react-router-dom";
import MatiereList from "../components/matieres/MatiereList";

class Matiere extends Component{
    constructor(props){
        super(props);
        this.state = {
            matieresSet : [],
            loading : true
        }
        this.removeMatiere = this.removeMatiere.bind(this)
    }

    componentDidMount() {
        matiereService.getAll()
            .then(response => {
                this.setState({
                    matieresSet: response.data.data,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({ loading: false });
            });
    }
    removeMatiere(id) {
        const res = this.state.matieresSet.filter((item) => item.id !== id);
        this.setState({ matieresSet: res });
    }

    render() {
        const { loading, matieresSet } = this.state;
        return (
            <div>
                <div className='d-flex justify-content-between align-items-center mb-3'>

                    <h2>📚Liste des matieres</h2>
                    <div>
                        <Link to="/admin/matiere-create">
                            <button className='btn btn-primary'>
                                ➕ Ajouter une matiere
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
                        {matieresSet.length > 0 ? (
                                <MatiereList matieres={matieresSet} onDelete={this.removeMatiere} />
                        ) : (
                            <div className="alert alert-info">
                                Aucun matiere trouvée. Ajoutez-en une !
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Matiere;