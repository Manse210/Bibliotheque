import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import Catalogue from "./components/Catalogue";
import Lecteurs from "./components/Lecteurs";
import Emprunts from "./components/Emprunts";
import Login from "./components/Login";

function App() {
    // Note: Pour une vraie app, on vérifierait l'authentification ici
    const isAuthenticated = true; 

    return (
        <BrowserRouter>
            <Routes>
                {/* Route Publique */}
                <Route path="/login" element={<Login />} />

                {/* Routes Protégées (avec Layout) */}
                <Route 
                    path="/*" 
                    element={
                        isAuthenticated ? (
                            <MainLayout>
                                <Routes>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/catalogue" element={<Catalogue />} />
                                    <Route path="/lecteurs" element={<Lecteurs />} />
                                    <Route path="/emprunts" element={<Emprunts />} />
                                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                                </Routes>
                            </MainLayout>
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    } 
                />
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById("app");
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}