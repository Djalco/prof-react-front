import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Messages from '../pages/Messages';
import Etudiants from '../pages/Etudiants';

import ProfForm from '../components/profs/ProfForm';
import Classes from '../pages/Classes';
import ClasseForm from '../components/classes/ClasseForm';
import EtudiantForm from '../components/etudiants/EtudiantForm';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <DashboardLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                 {/* Prof routes */}
                <Route path="profs" element={<Home />} />
                <Route path="prof/:id" element={<ProfForm edit={true} />} />
                <Route path="prof-create" element={<ProfForm edit={false} />} />

                {/* Messages route */}   
                <Route path="messages" element={<Messages />} />

                {/* Etudiant routes */}
                <Route path="etudiants" element={<Etudiants />} />
                <Route path="etudiant/:id" element={<EtudiantForm edit={true} />} />
                <Route path="etudiant-create" element={<EtudiantForm edit={false} />} />

                {/* Classes routes */}
                <Route path="classes" element={<Classes />} />
                <Route path="classe/:id" element={<ClasseForm edit={true} />} />
                <Route path="classe-create" element={<ClasseForm edit={false} />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
