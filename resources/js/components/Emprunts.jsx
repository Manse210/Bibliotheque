import React, { useState, useEffect } from 'react';
import { Plus, Search, Calendar, User, Book, X, CheckCircle, Clock, Trash2, RotateCcw } from 'lucide-react';
import api from '../api';

const Emprunts = () => {
    const [emprunts, setEmprunts] = useState([]);
    const [lecteurs, setLecteurs] = useState([]);
    const [livres, setLivres] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmprunt, setSelectedEmprunt] = useState(null);
    const [formData, setFormData] = useState({
        lecteur_id: '',
        livre_id: '',
        date_emprunt: new Date().toISOString().split('T')[0],
        date_retour_prevue: ''
    });

    // Charger les données au démarrage
    useEffect(() => {
        fetchEmprunts();
        fetchLecteurs();
        fetchLivres();
    }, []);

    const fetchEmprunts = async () => {
        try {
            const response = await api.get('/emprunts');
            setEmprunts(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Erreur chargement emprunts:', error);
            setEmprunts([]);
        }
    };
    const fetchLecteurs = async () => {
        try {
            const response = await api.get('/lecteurs');
            setLecteurs(response.data);
        } catch (error) {
            console.error('Erreur chargement lecteurs:', error);
        }
    };

    const fetchLivres = async () => {
        try {
            const response = await api.get('/livres');
            setLivres(response.data);
        } catch (error) {
            console.error('Erreur chargement livres:', error);
        }
    };

    const handleOpenModal = (emprunt = null) => {
        if (emprunt) {
            setSelectedEmprunt(emprunt);
            setFormData({
                lecteur_id: emprunt.lecteur_id,
                livre_id: emprunt.livre_id,
                date_emprunt: emprunt.date_emprunt,
                date_retour_prevue: emprunt.date_retour_prevue
            });
        } else {
            setSelectedEmprunt(null);
            setFormData({
                lecteur_id: '',
                livre_id: '',
                date_emprunt: new Date().toISOString().split('T')[0],
                date_retour_prevue: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedEmprunt) {
                await api.put(`/emprunts/${selectedEmprunt.id}`, formData);
                alert('Emprunt modifié avec succès !');
            } else {
                await api.post('/emprunts', formData);
                alert('Emprunt créé avec succès !');
            }
            setIsModalOpen(false);
            fetchEmprunts(); // Recharger la liste
        } catch (error) {
            console.error('Erreur:', error.response?.data || error.message);
            alert('Erreur: ' + (error.response?.data?.message || 'Vérifiez les données'));
        }
    };

    const handleRetour = async (id) => {
        if (confirm('Marquer ce livre comme retourné ?')) {
            try {
                await api.put(`/emprunts/${id}/retour`);
                alert('Retour enregistré avec succès !');
                fetchEmprunts();
            } catch (error) {
                console.error('Erreur retour:', error);
                alert('Erreur lors du retour');
            }
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Supprimer cet emprunt ?')) {
            try {
                await api.delete(`/emprunts/${id}`);
                alert('Emprunt supprimé !');
                fetchEmprunts();
            } catch (error) {
                console.error('Erreur suppression:', error);
                alert('Erreur lors de la suppression');
            }
        }
    };

    const getStatut = (emprunt) => {
        if (emprunt.date_retour_reelle) {
            return { text: 'Rendu', color: 'green', icon: CheckCircle };
        }
        return { text: 'En cours', color: 'blue', icon: Clock };
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Emprunts</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Nouvel Emprunt</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Livre & Lecteur</th>
                            <th className="px-6 py-4">Date Emprunt</th>
                            <th className="px-6 py-4">Retour Prévu</th>
                            <th className="px-6 py-4">Retour Effectif</th>
                            <th className="px-6 py-4">Statut</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {emprunts.map((emprunt) => {
                            const statut = getStatut(emprunt);
                            const StatutIcon = statut.icon;
                            return (
                                <tr key={emprunt.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm font-bold text-gray-800">
                                                <Book className="w-4 h-4 text-purple-500" />
                                                <span>{emprunt.livre?.titre} - {emprunt.livre?.auteur}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <User className="w-3 h-3" />
                                                <span>{emprunt.lecteur?.nom}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(emprunt.date_emprunt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {new Date(emprunt.date_retour_prevue).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {emprunt.date_retour_reelle ? new Date(emprunt.date_retour_reelle).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 bg-${statut.color}-50 text-${statut.color}-600 rounded-full text-xs font-semibold flex items-center gap-1 w-fit`}>
                                            <StatutIcon className="w-3 h-3" />
                                            {statut.text}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            {!emprunt.date_retour_reelle && (
                                                <button
                                                    onClick={() => handleRetour(emprunt.id)}
                                                    className="p-2 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                                    title="Marquer comme rendu"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleOpenModal(emprunt)}
                                                className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                title="Modifier"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(emprunt.id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Supprimer"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal Nouvel Emprunt */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800">
                                {selectedEmprunt ? 'Modifier l\'Emprunt' : 'Nouvel Emprunt'}
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner un Lecteur</label>
                                <select
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={formData.lecteur_id}
                                    onChange={(e) => setFormData({ ...formData, lecteur_id: e.target.value })}
                                    required
                                >
                                    <option value="">Choisir un lecteur...</option>
                                    {lecteurs.map(lecteur => (
                                        <option key={lecteur.id} value={lecteur.id}>
                                            {lecteur.nom} - {lecteur.email}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Sélectionner un Livre</label>
                                <select
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                    value={formData.livre_id}
                                    onChange={(e) => setFormData({ ...formData, livre_id: e.target.value })}
                                    required
                                >
                                    <option value="">Choisir un livre...</option>
                                    {livres.map(livre => (
                                        <option key={livre.id} value={livre.id}>
                                            {livre.titre} - {livre.auteur} {!livre.disponible ? '(Indisponible)' : ''}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date de retour prévue</label>
                                <div className="relative">
                                    <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                                        value={formData.date_retour_prevue}
                                        onChange={(e) => setFormData({ ...formData, date_retour_prevue: e.target.value })}
                                        required
                                        min={formData.date_emprunt}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
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