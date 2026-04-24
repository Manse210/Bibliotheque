import React from 'react';
import { User, Bell, Search } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm">
            <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-lg w-96">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Rechercher..." 
                    className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
                />
            </div>

            <div className="flex items-center gap-6">
                <button className="relative text-gray-400 hover:text-purple-600 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">Admin</p>
                        <p className="text-xs text-gray-400">Bibliothécaire</p>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <User className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
