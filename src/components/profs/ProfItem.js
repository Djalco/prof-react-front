import React from 'react';
import { Link } from 'react-router-dom';
import profService from '../../services/prof.service';

const ProfItem = ({ prof, onDelete }) => {
    const { id, nom, prenom, bureau } = prof;

    const handleDelete = () => {
        profService.remove(id).then(() => {
            onDelete(id);
        });
    };

    return (
        <tr>
            <td>{nom}</td>
            <td>{prenom}</td>
            <td>{bureau}</td>
            <td>
                <Link to={`/admin/prof/${id}`}>
                    <button className='btn btn-sm btn-info'>Éditer</button>
                </Link>
                <Link to={`/admin/prof/${id}/classes`}>
                    <button className='btn btn-sm btn-success ms-2'>Classes</button>
                </Link>
                <button className='btn btn-sm btn-danger ms-2' onClick={handleDelete}>
                    Supprimer
                </button>
            </td>
        </tr>
    );
};

export default ProfItem;
