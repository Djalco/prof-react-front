import React from 'react';
import EtudiantItem from './EtudiantItem';

const EtudiantList = ({ etudiants, onDelete }) => {
    return (
        <table className='table table-condensed table-hover'>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Commandes</th>
                </tr>
            </thead>
            <tbody>
                {etudiants.map((etudiant, index) => (
                    <EtudiantItem
                        key={etudiant.id || `etudiant-${index}`}
                        etudiant={etudiant}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default EtudiantList;
