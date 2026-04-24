import React from 'react';
import { BookOpen, Users, Clock, CheckCircle } from 'lucide-react';

const Dashboard = () => {
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Dernières Activités</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
                                    L
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">Livre "Le Petit Prince" emprunté</p>
                                    <p className="text-xs text-gray-400">Par Jean Dupont • Il y a 2 heures</p>
                                </div>
                            </div>
                            <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-600 rounded">Info</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
