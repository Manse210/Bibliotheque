import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Calendar, User, Book, X, CheckCircle, Clock } from 'lucide-react';

const Emprunts = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Emprunts</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Nouvel Emprunt</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher un emprunt (livre ou lecteur)..." 
                            className="bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 w-full text-sm outline-none"
                        />
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Livre & Lecteur</th>
                            <th className="px-6 py-4">Date Emprunt</th>
                            <th className="px-6 py-4">Retour Prévu</th>
                            <th className="px-6 py-4">Statut</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[1, 2].map((i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                            <Book className="w-4 h-4 text-purple-500" />
                                            <span>L'Étranger - Albert Camus</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-400">
                                            <User className="w-3 h-3" />
                                            <span>Jean Dupont</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    01 Mai 2024
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    15 Mai 2024
                                </td>
                                <td className="px-6 py-4">
                                    {i === 1 ? (
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
                                            <Clock className="w-3 h-3" />
                                            En cours
                                        </span>
                                    ) : (
                                        <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold flex items-center gap-1 w-fit">
                                            <CheckCircle className="w-3 h-3" />
                                            Rendu
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-400 hover:text-purple-600">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Nouvel Emprunt */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">Nouvel Emprunt</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner un Livre</label>
                                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none appearance-none">
                                    <option>Choisir un livre...</option>
                                    <option>L'Étranger - Albert Camus</option>
                                    <option>1984 - George Orwell</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner un Lecteur</label>
                                <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none appearance-none">
                                    <option>Choisir un lecteur...</option>
                                    <option>Jean Dupont</option>
                                    <option>Marie Simon</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de retour prévue</label>
                                <div className="relative">
                                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="date" 
                                        className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                </div>
                            </div>
                            
                            <div className="pt-4 flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Annuler
                                </button>
                                <button 
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-lg shadow-purple-200"
                                >
                                    Confirmer l'emprunt
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Emprunts;
