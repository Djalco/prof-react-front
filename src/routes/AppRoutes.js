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
                <Route path="profs" element={<Home />} />
                <Route path="prof/:id" element={<ProfForm edit={true} />} />
                <Route path="prof-create" element={<ProfForm edit={false} />} />

                <Route path="messages" element={<Messages />} />

                <Route path="etudiants" element={<Etudiants />} />
                <Route path="etudiant/:id" element={<EtudiantForm edit={true} />} />
                <Route path="etudiant-create" element={<EtudiantForm edit={false} />} />

            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
