import React from 'react';
import MatiereItem from './MatiereItem';

const MatiereList = ({ matieres, onDelete }) => {
    return (
        <table className='table table-condensed table-hover'>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Coeffecient</th>
                    <th>Commandes</th>
                </tr>
            </thead>
            <tbody>
                {matieres.map((matiere, index) => (
                    <MatiereItem
                        key={matiere.id || `matiere-${index}`}
                        matiere={matiere}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default MatiereList;
