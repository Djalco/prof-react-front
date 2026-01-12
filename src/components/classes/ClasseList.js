import React from 'react';
import ClasseItem from './ClasseItem';

const ClasseList = ({ classes, onDelete }) => {
    return (
        <table className='table table-condensed table-hover'>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Niveau</th>
                    <th>Commandes</th>
                </tr>
            </thead>
            <tbody>
                {classes.map((classe, index) => (
                    <ClasseItem
                        key={classe.id || `classe-${index}`}
                        classe={classe}
                        onDelete={onDelete}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ClasseList;
