import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, User, X, Mail, Phone } from 'lucide-react';

const Lecteurs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLecteur, setSelectedLecteur] = useState(null);

    const handleOpenModal = (lecteur = null) => {
        setSelectedLecteur(lecteur);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Lecteurs</h1>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Nouveau Lecteur</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Rechercher un lecteur..." 
                            className="bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 w-full text-sm outline-none"
                        />
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Lecteur</th>
                            <th className="px-6 py-4">Contact</th>
                            <th className="px-6 py-4">Livres Empruntés</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                                            {i === 1 ? 'JD' : i === 2 ? 'MS' : 'AL'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">
                                                {i === 1 ? 'Jean Dupont' : i === 2 ? 'Marie Simon' : 'Alice Legrand'}
                                            </p>
                                            <p className="text-xs text-gray-400">ID: LCT-00{i}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Mail className="w-3 h-3 text-gray-400" />
                                            <span>lecteur{i}@email.com</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Phone className="w-3 h-3 text-gray-400" />
                                            <span>06 12 34 56 0{i}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="font-semibold">{i * 2 - 1}</span> livres
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

            {/* Modal Lecteur */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">
                                {selectedLecteur ? 'Modifier le Lecteur' : 'Inscrire un Nouveau Lecteur'}
                            </h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <form className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="Dupont"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="Jean"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="jean.dupont@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                <input 
                                    type="tel" 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="06 00 00 00 00"
                                />
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
                                    {selectedLecteur ? 'Enregistrer' : 'Inscrire'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Lecteurs;
