import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import Catalogue from "./components/Catalogue";
import Lecteurs from "./components/Lecteurs";
import Emprunts from "./components/Emprunts";
import Login from "./components/Login";
import Profile from "./components/Profile";
import authService from "./services/authService";
import { ToastProvider } from "./ToastContext";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('user_token'));

    const handleLogout = async () => {
        await authService.logout();
        setIsAuthenticated(false);
    };

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
        return (
            <BrowserRouter>
                <ToastProvider>
                    <Routes>
                        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                </ToastProvider>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <ToastProvider>
                <MainLayout onLogout={handleLogout}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/catalogue" element={<Catalogue />} />
                        <Route path="/lecteurs" element={<Lecteurs />} />
                        <Route path="/emprunts" element={<Emprunts />} />
                        <Route path="/profil" element={<Profile />} />
                        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </MainLayout>
            </ToastProvider>
        </BrowserRouter>
    );
}

const container = document.getElementById("app");
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}