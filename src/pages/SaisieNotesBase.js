import React, { Component } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import classService from '../services/classe.service';
import noteService from '../services/note.service';

class SaisieNotesBase extends Component {
    constructor(props) {
        super(props);

        // On récupère les IDs stockés lors du login
        // Note: Assure-toi d'avoir fait localStorage.clear() une fois pour vider l'ancien "35"
        const profIdFromStorage = localStorage.getItem('profId');
        const matiereIdFromStorage = localStorage.getItem('matiereId');

        this.state = {
            etudiants: [],
            notes: {},
            profId: profIdFromStorage || null,
            matiereId: matiereIdFromStorage || 1, // 1 par défaut, à ajuster selon ta DB
            loading: true,
            submitting: false
        };
    }

    componentDidMount() {
        const { classeId } = this.props.params;

        classService.getEtudiants(classeId)
            .then(res => {
                const etudiants = res.data.data || [];
                const notesInitiales = {};
                etudiants.forEach(etue => {
                    notesInitiales[etue.id] = { valeur: '', appreciation: '' };
                });
                this.setState({ etudiants, notes: notesInitiales, loading: false });
            })
            .catch(err => {
                console.error("Erreur chargement étudiants:", err);
                this.setState({ loading: false });
            });
    }

    handleInputChange = (etudiantId, field, value) => {
        this.setState(prevState => ({
            notes: {
                ...prevState.notes,
                [etudiantId]: { ...prevState.notes[etudiantId], [field]: value }
            }
        }));
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { notes, profId, matiereId } = this.state;

        if (!profId) {
            alert("Erreur : ID du professeur introuvable. Veuillez vous reconnecter.");
            return;
        }

        this.setState({ submitting: true });

        // Préparation du tableau pour le Backend (format Sequelize bulkCreate)
        const notesToSend = Object.keys(notes)
            .filter(id => notes[id].valeur !== '') // On n'envoie que les lignes remplies
            .map(id => ({
                valeur: parseFloat(notes[id].valeur),
                appreciation: notes[id].appreciation || "Pas d'appréciation",
                etudiantId: parseInt(id),
                matiereId: parseInt(matiereId),
                profId: parseInt(profId)
            }));

        if (notesToSend.length === 0) {
            alert("Veuillez saisir au moins une note.");
            this.setState({ submitting: false });
            return;
        }

        // Log pour vérifier les IDs avant l'envoi (très utile pour débugger la 500)
        console.log("Données envoyées au bulkCreate:", notesToSend);

        try {
            // Appel au service (vérifie que ton backend utilise bien req.body.notes)
            await noteService.saveBulk({ notes: notesToSend });

            alert("✅ " + notesToSend.length + " notes enregistrées avec succès !");
            this.props.navigate(-1);
        } catch (error) {
            // Affichage de l'erreur précise du serveur dans la console
            const errorDetail = error.response?.data?.error || error.message;
            console.error("Détail erreur backend:", errorDetail);

            alert("❌ Erreur serveur (500). Détail : " + errorDetail);
        } finally {
            this.setState({ submitting: false });
        }
    }

    render() {
        const { etudiants, notes, loading, submitting } = this.state;

        if (loading) return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2">Chargement des étudiants...</p>
            </div>
        );

        return (
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold">📝 Saisie collective des notes</h3>
                    <button className="btn btn-outline-secondary" onClick={() => this.props.navigate(-1)}>
                        Annuler
                    </button>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="card shadow-sm border-0">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th className="ps-4">Étudiant</th>
                                    <th style={{ width: '150px' }}>Note / 20</th>
                                    <th>Appréciation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {etudiants.map(etue => (
                                    <tr key={etue.id}>
                                        <td className="ps-4">
                                            <span className="fw-bold">{etue.nom.toUpperCase()}</span> {etue.prenom}
                                        </td>
                                        <td>
                                            <input
                                                type="number" className="form-control"
                                                min="0" max="20" step="0.25"
                                                placeholder="0.00"
                                                value={notes[etue.id].valeur}
                                                onChange={(e) => this.handleInputChange(etue.id, 'valeur', e.target.value)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text" className="form-control"
                                                placeholder="Ex: Excellent travail..."
                                                value={notes[etue.id].appreciation}
                                                onChange={(e) => this.handleInputChange(etue.id, 'appreciation', e.target.value)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 mb-5">
                        <button type="submit" className="btn btn-primary btn-lg shadow" disabled={submitting}>
                            {submitting ? (
                                <><span className="spinner-border spinner-border-sm me-2"></span>Enregistrement...</>
                            ) : '✅ Valider et enregistrer'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

// Wrapper pour injecter les hooks useNavigate et useParams (Requis pour React Router v6)
export default function SaisieNotes(props) {
    const params = useParams();
    const navigate = useNavigate();
    return <SaisieNotesBase {...props} params={params} navigate={navigate} />;
}