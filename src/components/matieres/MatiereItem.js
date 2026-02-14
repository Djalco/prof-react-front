import React from 'react';
import { Link } from 'react-router-dom';
import matiereService from '../../services/matiere.service';

const MatiereItem = ({ matiere, onDelete }) => {
    const { id, nom, coef } = matiere;

    const handleDelete = () => {
        matiereService.remove(id).then(() => {
            onDelete(id);
        });
    };
    
    return (
        <tr>
            <td>{nom}</td>
            <td>{coef}</td>
            <td>
                <Link to={`/admin/matiere/${id}`}>
                    <button className='btn btn-sm btn-info'>Éditer</button>
                </Link>
               {/*  <Link to={`/admin/Matiere/${id}/profs`}>
                    <button className='btn btn-sm btn-success ms-2'>Professeurs</button>
                </Link>
                <Link to={`/admin/Matiere/${id}/etudiants`}>
                    <button className='btn btn-sm btn-primary ms-2'>Étudiants</button>
                </Link> */}
                <button className='btn btn-sm btn-danger ms-2' onClick={handleDelete}>
                    Supprimer
                </button>
            </td>
        </tr>
    );
};

export default MatiereItem;
