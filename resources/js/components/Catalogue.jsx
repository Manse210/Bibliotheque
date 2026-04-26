import React from 'react';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';

const Catalogue = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Catalogue des Livres</h1>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
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
        </div>
    );
};

// Mock BookOpen since it's used here
import { BookOpen } from 'lucide-react';
export default Catalogue;
