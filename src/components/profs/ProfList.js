import React from 'react';
import ProfItem from './ProfItem';

const ProfList = ({ profs,matieres, onDelete }) => {
    console.log(profs)

    return (
        <table className='table table-condensed table-hover'>
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Bureau</th>
                    <th>Cours</th>
                    <th>Commandes</th>
                </tr>
            </thead>
            <tbody>
                {profs.map((prof, index) => {
                    const matiereTrouvee = matieres.find(m => m.id === prof.matiereId)

                    return (
                        <ProfItem
                            key={prof.id || `prof-${index}`}
                            prof={prof}
                            nomMatiere={matiereTrouvee ? matiereTrouvee.nom : "Non renseigne" }
                            onDelete={onDelete}
                        />
                    )
                } )}
            </tbody>
        </table>
    );
};

export default ProfList;
