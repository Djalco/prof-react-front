import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/common/Navbar';

const DashboardLayout = () => {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main-content" style={{ marginLeft: '250px', width: 'calc(100% - 250px)', minHeight: '100vh' }}>
                <div className="container-fluid py-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
