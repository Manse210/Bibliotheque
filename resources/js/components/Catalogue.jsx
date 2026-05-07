import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, BookOpen, X } from 'lucide-react';

const Catalogue = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLivre, setSelectedLivre] = useState(null);

    const handleOpenModal = (livre = null) => {
        setSelectedLivre(livre);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Catalogue des Livres</h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Ajouter un Livre</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Titre, auteur, ISBN..." 
                            className="bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 w-full text-sm outline-none"
                        />
                    </div>
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        Filtres
                    </button>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Livre</th>
                            <th className="px-6 py-4">Auteur</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center">
                                            <BookOpen className="w-6 h-6 text-gray-300" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Titre du Livre {i}</p>
                                            <p className="text-xs text-gray-400">ISBN: 123-456-789</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">Auteur Nom</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold">Disponible</span>
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

            {/* Modal d'Ajout/Édition */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">
                                {selectedLivre ? 'Modifier le Livre' : 'Ajouter un Nouveau Livre'}
                            </h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Ex: Le Petit Prince"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
                                <input 
                                    type="text" 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Ex: Antoine de Saint-Exupéry"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="123-456-789"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
                                    <input 
                                        type="number" 
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="2024"
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
                                    {selectedLivre ? 'Enregistrer' : 'Ajouter'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Catalogue;

