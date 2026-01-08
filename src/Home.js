import { Component } from 'react';
import { Link } from 'react-router-dom';
import ProfService from './ProfService';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {profSet : [] };
        this.removeProf = this.removeProf.bind(this)
    }
    componentDidMount(){
        ProfService.getAll().then(
            response=>{
                this.setState({profSet : response.data.data})
            }        
        )
    }

    removeProf(id){
        const res = this.state.profSet.filter((item)=>item.id !==id);
        this.setState({profSet : res})
    }

    render(){
        return ( 
            <div>
                <div className='text-right'>
                    <Link to="/prof-create">
                        <button className='btn btn-primary'> Ajouter</button> 
                    </Link>
                </div>
                <div>
                    <table className='table table*condensed table-hover'>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Bureau</th>
                                <th>Commandes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.profSet.map((item,index)=><Prof 
                                    prof={item}
                                    key={'prof'+index}
                                    onDelete ={this.removeProf}
                                 />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            )
    }
}
    function Prof(props) {
        const {id,nom,prenom,bureau} = props.prof;
        
        function deleteHandler(){
            ProfService.remove(id).then(()=>{
                props.onDelete(id)
            })
        }
        return (
            <tr>
                <td>{nom}</td>
                <td>{prenom}</td>
                <td>{bureau}</td>
                <td>
                    <Link to={"prof/"+id}><button className='btn'>Editer</button></Link>
                    <button className='btn' onClick={deleteHandler}>Supprimer</button>
                </td>
            </tr>
        )
    }
export default Home;