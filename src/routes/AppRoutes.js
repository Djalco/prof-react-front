import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import LoginAdmin from '../pages/LoginAdmin';
import LoginProf from '../pages/LoginProf';
import LoginEtudiant from '../pages/LoginEtudiant';
import Messages from '../pages/Messages';
import Etudiants from '../pages/Etudiants';
import MesClasses from '../pages/MesClasses';
import MesCaramades from '../pages/MesCaramades';
import ClasseEtudiants from '../pages/ClasseEtudiants';

import ProfForm from '../components/profs/ProfForm';
import ProfClasses from '../pages/ProfClasses';
import Classes from '../pages/Classes';
import ClasseForm from '../components/classes/ClasseForm';
import ClasseProfs from '../pages/ClasseProfs';
import EtudiantForm from '../components/etudiants/EtudiantForm';
import Profs from '../pages/Profs';
import Home from '../pages/Home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginAdmin />} />
            <Route path="/login-prof" element={<LoginProf />} />
            <Route path="/login-etudiant" element={<LoginEtudiant />} />
            
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                
                {/* Prof routes */}
                <Route path="profs" element={<Profs />} />
                <Route path="prof/:id" element={<ProfForm edit={true} />} />
                <Route path="prof-create" element={<ProfForm edit={false} />} />
                <Route path="prof/:id/classes" element={<ProfClasses />} />

                {/* Messages route */}   
                <Route path="messages" element={<Messages />} />

                {/* Routes spécifiques pour les profs */}
                <Route path="mes-classes" element={<MesClasses />} />
                <Route path="mes-classes/:classeId/etudiants" element={<ClasseEtudiants />} />

                {/* Route spécifique pour les étudiants */}
                <Route path="mes-caramades" element={<MesCaramades />} />

                {/* Route spécifique pour les étudiants */}
                <Route path="mes-caramades" element={<MesCaramades />} />

                {/* Etudiant routes */}
                <Route path="etudiants" element={<Etudiants />} />
                <Route path="etudiant/:id" element={<EtudiantForm edit={true} />} />
                <Route path="etudiant-create" element={<EtudiantForm edit={false} />} />

                {/* Classes routes */}
                <Route path="classes" element={<Classes />} />
                <Route path="classe/:id" element={<ClasseForm edit={true} />} />
                <Route path="classe-create" element={<ClasseForm edit={false} />} />
                <Route path="classe/:id/profs" element={<ClasseProfs />} />
                <Route path="classe/:classeId/etudiants" element={<ClasseEtudiants />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
