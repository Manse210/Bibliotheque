import React from 'react';
import { Book } from 'lucide-react';

const Login = () => {
    return (
        <div className="min-h-screen bg-purple-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                            <Book className="w-10 h-10" />
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Bienvenue</h2>
                    <p className="text-center text-gray-400 mb-8">Connectez-vous pour gérer la bibliothèque</p>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                            <input 
                                type="email" 
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                placeholder="exemple@mail.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Mot de passe</label>
                            <input 
                                type="password" 
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-purple-200 transition-all active:scale-95">
                            Se connecter
                        </button>
                    </form>
                </div>
                
                <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-400">© 2026 BiblioApp - Tous droits réservés</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
