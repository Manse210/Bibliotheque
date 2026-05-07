import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const MainLayout = ({ children, onLogout }) => {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar onLogout={onLogout} />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
