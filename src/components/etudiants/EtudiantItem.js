import React from 'react';
import { Link } from 'react-router-dom';
import etudiantService from '../../services/etudiant.service';

const EtudiantItem = ({ etudiant, onDelete }) => {
    const { id, nom, prenom } = etudiant;

    const handleDelete = () => {
        etudiantService.remove(id).then(() => {
            onDelete(id);
        });
    };

    return (
        <tr>
            <td>{nom}</td>
            <td>{prenom}</td>
            <td>
                <Link to={`/etudiant/${id}`}>
                    <button className='btn btn-sm btn-info'>Éditer</button>
                </Link>
                <button className='btn btn-sm btn-danger ms-2' onClick={handleDelete}>
                    Supprimer
                </button>
            </td>
        </tr>
    );
};

export default EtudiantItem;
