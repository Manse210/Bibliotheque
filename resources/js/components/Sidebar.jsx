import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Book, Users, ClipboardList, LogOut } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/catalogue', name: 'Catalogue', icon: Book },
        { path: '/lecteurs', name: 'Lecteurs', icon: Users },
        { path: '/emprunts', name: 'Emprunts', icon: ClipboardList },
    ];

    return (
        <div className="w-64 bg-purple-900 text-white min-h-screen flex flex-col shadow-xl">
            <div className="p-6 text-2xl font-bold border-b border-purple-800 flex items-center gap-2">
                <Book className="w-8 h-8" />
                <span>BiblioApp</span>
            </div>
            
            <nav className="flex-1 mt-6">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-6 py-4 transition-colors ${
                                isActive 
                                ? 'bg-purple-800 border-l-4 border-white' 
                                : 'hover:bg-purple-800/50'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-purple-800">
                <button className="flex items-center gap-3 text-purple-200 hover:text-white transition-colors w-full">
                    <LogOut className="w-5 h-5" />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
