import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Form from '../pages/Form';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/prof/:id"
                element={
                    <ProtectedRoute>
                        <Form edit={true} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/prof-create"
                element={
                    <ProtectedRoute>
                        <Form edit={false} />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
