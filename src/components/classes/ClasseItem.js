import React from 'react';
import { Link } from 'react-router-dom';
import classeService from '../../services/classe.service';

const ClasseItem = ({ classe, onDelete }) => {
    const { id, nom, niveau } = classe;

    const handleDelete = () => {
        classeService.remove(id).then(() => {
            onDelete(id);
        });
    };

    return (
        <tr>
            <td>{nom}</td>
            <td>{niveau}</td>
            <td>
                <Link to={`/admin/classe/${id}`}>
                    <button className='btn btn-sm btn-info'>Éditer</button>
                </Link>
                <Link to={`/admin/classe/${id}/profs`}>
                    <button className='btn btn-sm btn-success ms-2'>Professeurs</button>
                </Link>
                <Link to={`/admin/classe/${id}/etudiants`}>
                    <button className='btn btn-sm btn-primary ms-2'>Étudiants</button>
                </Link>
                <button className='btn btn-sm btn-danger ms-2' onClick={handleDelete}>
                    Supprimer
                </button>
            </td>
        </tr>
    );
};

export default ClasseItem;
