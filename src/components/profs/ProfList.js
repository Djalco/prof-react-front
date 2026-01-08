import React from 'react';
import ProfItem from './ProfItem';

const ProfList = ({ profs, onDelete }) => {
    return (
        <table className='table table-condensed table-hover'>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Bureau</th>
                    <th>Commandes</th>
                </tr>
            </thead>
            <tbody>
                {profs.map((prof, index) => (
                    <ProfItem
                        key={prof.id || `prof-${index}`}
                        prof={prof}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ProfList;
