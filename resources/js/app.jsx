import React from "react";
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

function App() {
    // Temporaire: on désactive le contrôle d'auth tant que la BDD/auth backend ne sont pas finalisées.
    const isAuthenticated = true;

    const handleLogout = async () => {
        await authService.logout();
    };

    if (!isAuthenticated) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        );
    }

    return (
        <BrowserRouter>
            <MainLayout onLogout={handleLogout}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/catalogue" element={<Catalogue />} />
                    <Route path="/lecteurs" element={<Lecteurs />} />
                    <Route path="/emprunts" element={<Emprunts />} />
                    <Route path="/profil" element={<Profile />} />
                    <Route path="/login" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    {/* Catch-all for undefined routes in the dashboard */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </MainLayout>
        </BrowserRouter>
    );
}

const container = document.getElementById("app");
console.log("Container found:", container);
if (container) {
    const root = createRoot(container);
    console.log("Rendering App...");
    root.render(<App />);
} else {
    console.error("Root element #app not found!");
}