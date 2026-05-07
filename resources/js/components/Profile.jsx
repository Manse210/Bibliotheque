import React from 'react';
import { User, Mail, Shield } from 'lucide-react';

const Profile = () => {
    return (
        <div className="max-w-3xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Profil</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-lg font-semibold text-gray-800">Admin</p>
                        <p className="text-sm text-gray-500">Bibliothécaire</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-700">
                        <Mail className="w-5 h-5 text-purple-500" />
                        <span>admin@bibliotheque.local</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                        <Shield className="w-5 h-5 text-purple-500" />
                        <span>Rôle : Administrateur</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
