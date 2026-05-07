import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Clock, CheckCircle, Plus } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const stats = [
        { label: 'Livres Totaux', value: '1,240', icon: BookOpen, color: 'bg-blue-500' },
        { label: 'Lecteurs Actifs', value: '458', icon: Users, color: 'bg-purple-500' },
        { label: 'Emprunts en cours', value: '42', icon: Clock, color: 'bg-orange-500' },
        { label: 'Retours aujourd\'hui', value: '12', icon: CheckCircle, color: 'bg-green-500' },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-8">Tableau de Bord</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                            <div className={`${stat.color} p-3 rounded-lg text-white`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-purple-500" />
                        Dernières Activités
                    </h2>
                    <div className="space-y-6">
                        {[
                            { title: 'Livre "L\'Étranger" emprunté', user: 'Jean Dupont', time: 'Il y a 2 heures', type: 'Emprunt', color: 'text-blue-600 bg-blue-50' },
                            { title: 'Livre "1984" retourné', user: 'Marie Simon', time: 'Il y a 5 heures', type: 'Retour', color: 'text-green-600 bg-green-50' },
                            { title: 'Nouveau lecteur inscrit', user: 'Alice Legrand', time: 'Hier', type: 'Inscription', color: 'text-purple-600 bg-purple-50' },
                            { title: 'Livre "Le Petit Prince" ajouté', user: 'Admin', time: 'Hier', type: 'Catalogue', color: 'text-orange-600 bg-orange-50' },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-center justify-between group cursor-default">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${activity.color}`}>
                                        {activity.user[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">{activity.title}</p>
                                        <p className="text-xs text-gray-400">{activity.user} • {activity.time}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md ${activity.color}`}>
                                    {activity.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
                        <h2 className="text-lg font-bold mb-4">Actions Rapides</h2>
                        <div className="grid grid-cols-1 gap-3">
                            <button 
                                onClick={() => navigate('/emprunts')}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all text-sm font-medium text-left w-full"
                            >
                                <Plus className="w-5 h-5" />
                                Nouvel Emprunt
                            </button>
                            <button 
                                onClick={() => navigate('/lecteurs')}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all text-sm font-medium text-left w-full"
                            >
                                <Users className="w-5 h-5" />
                                Inscrire un Lecteur
                            </button>
                            <button 
                                onClick={() => navigate('/catalogue')}
                                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-lg transition-all text-sm font-medium text-left w-full"
                            >
                                <BookOpen className="w-5 h-5" />
                                Ajouter au Catalogue
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">État du Stock</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">Livres Disponibles</span>
                                    <span className="text-gray-800 font-bold">85%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full w-[85%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">En cours de prêt</span>
                                    <span className="text-gray-800 font-bold">12%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-blue-500 h-full w-[12%]" />
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">En retard</span>
                                    <span className="text-gray-800 font-bold">3%</span>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full w-[3%]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
