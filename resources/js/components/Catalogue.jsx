import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, BookOpen, X, Pencil, Trash2 } from 'lucide-react';
import livreService from '../services/livreService';

const Catalogue = () => {
    const [livres, setLivres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLivre, setSelectedLivre] = useState(null);
    const [formData, setFormData] = useState({
        titre: '',
        auteur: '',
        isbn: '',
        annee_publication: '',
        quantite_disponible: 1
    });

    // Charger les livres au montage
    useEffect(() => {
        fetchLivres();
    }, []);

    const fetchLivres = async () => {
        setIsLoading(true);
        try {
            const data = await livreService.getAll();
            setLivres(data);
        } catch (error) {
            console.error('Erreur lors du chargement des livres:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (livre = null) => {
        setSelectedLivre(livre);
        if (livre) {
            setFormData({
                titre: livre.titre,
                auteur: livre.auteur,
                isbn: livre.isbn || '',
                annee_publication: livre.annee_publication || '',
                quantite_disponible: livre.quantite_disponible || 1
            });
        } else {
            setFormData({
                titre: '',
                auteur: '',
                isbn: '',
                annee_publication: '',
                quantite_disponible: 1
            });
        }
        setIsModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedLivre) {
                // await livreService.update(selectedLivre.id, formData);
            } else {
                await livreService.create(formData);
            }
            setIsModalOpen(false);
            fetchLivres(); // Rafraîchir la liste
        } catch (error) {
            console.error('Erreur lors de la sauvegarde:', error);
            alert('Une erreur est survenue lors de la sauvegarde.');
        }
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
                        {isLoading ? (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    Chargement des livres...
                                </td>
                            </tr>
                        ) : livres.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-8 text-gray-500">
                                    Aucun livre trouvé dans le catalogue.
                                </td>
                            </tr>
                        ) : (
                            livres.map((livre) => (
                                <tr key={livre.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-12 bg-gray-100 rounded flex items-center justify-center">
                                                <BookOpen className="w-6 h-6 text-gray-300" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-800">{livre.titre}</p>
                                                <p className="text-xs text-gray-400">ISBN: {livre.isbn || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{livre.auteur}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            livre.statut === 'Disponible' 
                                            ? 'bg-green-50 text-green-600' 
                                            : 'bg-orange-50 text-orange-600'
                                        }`}>
                                            {livre.statut}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button 
                                                onClick={() => handleOpenModal(livre)}
                                                className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Modifier"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button 
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
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
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                <input 
                                    type="text" 
                                    name="titre"
                                    required
                                    value={formData.titre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Ex: Le Petit Prince"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Auteur</label>
                                <input 
                                    type="text" 
                                    name="auteur"
                                    required
                                    value={formData.auteur}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Ex: Antoine de Saint-Exupéry"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                                    <input 
                                        type="text" 
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="123-456-789"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Année</label>
                                    <input 
                                        type="number" 
                                        name="annee_publication"
                                        value={formData.annee_publication}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        placeholder="2024"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Quantité disponible</label>
                                <input 
                                    type="number" 
                                    name="quantite_disponible"
                                    value={formData.quantite_disponible}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    placeholder="1"
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
