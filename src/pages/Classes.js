import { Component } from "react";
import { Link } from "react-router-dom";
import classeService from "../services/classe.service";
import ClasseList from "../components/classes/ClasseList";

class Classes extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            classesSet: [],
            loading: true
        };
        this.removeClasse = this.removeClasse.bind(this);
    }
    componentDidMount() {
        classeService.getAll()
            .then(response => { 
                this.setState({
                    classesSet: response.data.data,
                    loading: false
                });
            })
            .catch(() => {
                this.setState({ loading: false });
            }); 
    }

    removeClasse(id) {
        const res = this.state.classesSet.filter((item) => item.id !== id);
        this.setState({ classesSet: res });
    }
    render() {
        const { loading, classesSet } = this.state; 
        return (
            <div>
                <div className='d-flex justify-content-between align-items-center mb-3'>    

                    <h2>🏫 Liste des classes</h2>
                    <div>
                        <Link to="/admin/classe-create">
                            <button className='btn btn-primary'>
                                ➕ Ajouter une classe
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
                        {classesSet.length > 0 ? (      
                                <ClasseList classes={classesSet} onDelete={this.removeClasse} />
                        ) : (
                            <div className="alert alert-info">      
                                Aucun classe trouvée. Ajoutez-en une !
                            </div>
                        )}  
                    </div>
                )}  
            </div>
        );
    }       
}
export default Classes;