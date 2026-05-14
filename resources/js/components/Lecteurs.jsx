import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, MoreVertical, User, X, Mail, Phone, Pencil, Trash2 } from 'lucide-react';
import api from '../api';
import { useToast } from '../ToastContext';

const Lecteurs = () => {
    const showToast = useToast();
    const [lecteurs, setLecteurs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLecteur, setSelectedLecteur] = useState(null);
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: ''
    });

    useEffect(() => {
        fetchLecteurs();
    }, []);

    const fetchLecteurs = async () => {
        try {
            const response = await api.get('/lecteurs');
            setLecteurs(response.data);
        } catch (error) {
            console.error('Erreur chargement lecteurs:', error);
            showToast('Erreur lors du chargement des lecteurs.', 'error');
        }
    };

    const handleOpenModal = (lecteur = null) => {
        if (lecteur) {
            setSelectedLecteur(lecteur);
            setFormData({
                nom: lecteur.nom,
                prenom: lecteur.prenom,
                email: lecteur.email,
                telephone: lecteur.telephone || ''
            });
        } else {
            setSelectedLecteur(null);
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                telephone: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Soumission du formulaire...', formData);
        try {
            // Assure la récupération du cookie CSRF avant chaque opération modifiante
            await api.get('/sanctum/csrf-cookie');
            
            if (selectedLecteur) {
                await api.put(`/lecteurs/${selectedLecteur.id}`, formData);
                showToast('Lecteur modifié avec succès !');
            } else {
                await api.post('/lecteurs', formData);
                showToast('Lecteur inscrit avec succès !');
            }
            setIsModalOpen(false);
            fetchLecteurs();
        } catch (error) {
            console.error('Erreur détaillée lors de la soumission:', error.response?.data || error.message);
            showToast('Erreur: ' + (error.response?.data?.message || 'Vérifiez les données'), 'error');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce lecteur ?')) {
            try {
                await api.delete(`/lecteurs/${id}`);
                showToast('Lecteur supprimé !');
                fetchLecteurs();
            } catch (error) {
                console.error('Erreur suppression:', error);
                showToast('Erreur lors de la suppression', 'error');
            }
        }
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
                        {lecteurs.map((lecteur) => (
                            <tr key={lecteur.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold uppercase">
                                            {lecteur.prenom[0]}{lecteur.nom[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">
                                                {lecteur.prenom} {lecteur.nom}
                                            </p>
                                            <p className="text-xs text-gray-400">ID: LCT-00{lecteur.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Mail className="w-3 h-3 text-gray-400" />
                                            <span>{lecteur.email}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Phone className="w-3 h-3 text-gray-400" />
                                            <span>{lecteur.telephone || 'Non renseigné'}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    <span className="font-semibold">{lecteur.emprunts_count || 0}</span> livres
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleOpenModal(lecteur)}
                                            className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="Modifier"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(lecteur.id)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                            title="Supprimer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {lecteurs.length === 0 && (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                    Aucun lecteur n'a été trouvé.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Lecteur */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
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
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="Dupont"
                                        value={formData.nom}
                                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                                    <input 
                                        type="text" 
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        placeholder="Jean"
                                        value={formData.prenom}
                                        onChange={(e) => setFormData({...formData, prenom: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input 
                                    type="email" 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="jean.dupont@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                                <input 
                                    type="tel" 
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    placeholder="06 00 00 00 00"
                                    value={formData.telephone}
                                    onChange={(e) => setFormData({...formData, telephone: e.target.value})}
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
