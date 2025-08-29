import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { XIcon } from './Icons';
import { AuthForm } from './AuthForm';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { login, signup } = useAuth();

    const handleAuthSubmit = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
            onClose();
        } catch (err: any) {
            setError(err.message || 'Une erreur est survenue.');
        } finally {
            setLoading(false);
        }
    };

    const handleTabChange = (loginTab: boolean) => {
        if (isLogin !== loginTab) {
            setIsLogin(loginTab);
            setError(null); // Clear errors when switching tabs
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4"
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 transform transition-all"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold font-display text-primary dark:text-blue-400">
                        {isLogin ? 'Connexion' : 'Inscription'}
                    </h2>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                    <button onClick={() => handleTabChange(true)} className={`w-1/2 py-3 text-sm font-semibold transition-colors ${isLogin ? 'border-b-2 border-primary text-primary dark:border-blue-400 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400'}`}>
                        Connexion
                    </button>
                    <button onClick={() => handleTabChange(false)} className={`w-1/2 py-3 text-sm font-semibold transition-colors ${!isLogin ? 'border-b-2 border-primary text-primary dark:border-blue-400 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400'}`}>
                        Inscription
                    </button>
                </div>
                
                <AuthForm 
                    isLogin={isLogin}
                    onSubmit={handleAuthSubmit}
                    loading={loading}
                    error={error}
                />
            </div>
        </div>
    );
};