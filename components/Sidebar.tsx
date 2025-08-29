
import React, { useState, useEffect } from 'react';
import type { Level, Difficulty, TopicFilter } from '../types';
import { courseData } from '../data/courseData';
import { BookOpenIcon, ChevronDownIcon, GemIcon, AcademicCapIcon, DocumentTextIcon, ArchiveIcon, XIcon, SpeakerWaveIcon, SunIcon, MoonIcon, UserCircleIcon, LogoutIcon, SearchIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
    selectedLevel: Level | null;
    selectedTopicId: string | null;
    onSelectLevel: (level: Level) => void;
    onSelectTopic: (topicId: string) => void;
    onShowExams: () => void;
    onGenerateExercise: () => void;
    isGenerating: boolean;
    selectedDifficulty: Difficulty;
    onSelectDifficulty: (difficulty: Difficulty) => void;
    isOpen: boolean;
    onClose: () => void;
    topicFilter: TopicFilter;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    onOpenAuthModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
    selectedLevel, 
    selectedTopicId, 
    onSelectLevel, 
    onSelectTopic, 
    onShowExams,
    onGenerateExercise, 
    isGenerating,
    selectedDifficulty,
    onSelectDifficulty,
    isOpen,
    onClose,
    topicFilter,
    theme,
    toggleTheme,
    onOpenAuthModal,
}) => {
    const { currentUser, logout } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    
    useEffect(() => {
        setSearchQuery(''); // Clear search when level changes
    }, [selectedLevel]);

    const LevelButton: React.FC<{ level: Level; label: string }> = ({ level, label }) => (
        <button
            onClick={() => onSelectLevel(level)}
            className={`w-full text-left p-4 rounded-lg flex items-center justify-between transition-all duration-200 ${
                selectedLevel === level ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md'
            }`}
        >
            <span className="flex items-center">
                <AcademicCapIcon className="h-6 w-6 mr-3"/>
                <span className="font-bold text-lg font-display">{label}</span>
            </span>
            <ChevronDownIcon className={`h-6 w-6 transform transition-transform ${selectedLevel === level ? 'rotate-180' : ''}`} />
        </button>
    );

    const TopicIcon: React.FC<{ type: 'lesson' | 'exercise' | 'listening_exercise' }> = ({ type }) => {
        const className = "h-5 w-5 mr-3 text-primary dark:text-blue-400";
        if (type === 'lesson') return <BookOpenIcon className={className} />;
        if (type === 'listening_exercise') return <SpeakerWaveIcon className={className} />;
        return <DocumentTextIcon className={className} />;
    };

    const difficulties: Difficulty[] = ['Facile', 'Moyen', 'Difficile'];

    const filteredTopics = selectedLevel ? courseData[selectedLevel]
        .filter(topic => {
            if (topicFilter === 'all') return true;
            if (topicFilter === 'lessons') return topic.type === 'lesson';
            if (topicFilter === 'exercises') return topic.type === 'exercise' || topic.type === 'listening_exercise';
            return false;
        })
        .filter(topic =>
            topic.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];
    
    return (
        <aside className={`fixed inset-y-0 left-0 bg-gray-200 dark:bg-gray-800 p-6 flex flex-col space-y-6 shadow-xl z-30 transform transition-transform duration-300 ease-in-out w-4/5 max-w-sm lg:relative lg:translate-x-0 lg:w-1/3 lg:max-w-sm ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
            <header className="flex items-center justify-between pb-4 border-b-2 border-gray-300 dark:border-gray-700">
                 <div className="flex items-center space-x-3">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Flag_of_Tunisia.svg/320px-Flag_of_Tunisia.svg.png" alt="Drapeau Tunisien" className="h-8 w-8 object-contain"/>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/320px-Flag_of_Spain.svg.png" alt="Drapeau Espagnol" className="h-8 w-8 object-contain"/>
                    <h1 className="text-2xl font-bold text-primary dark:text-blue-400 font-display">Espagnol Facile</h1>
                 </div>
                 <button onClick={onClose} className="lg:hidden p-1 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400" aria-label="Fermer le menu">
                     <XIcon className="h-6 w-6"/>
                 </button>
            </header>
            
            <div className="space-y-4">
                <LevelButton level="3A" label="3ème Année" />
                <LevelButton level="BAC" label="Baccalauréat" />
            </div>

            {selectedLevel && (
                <nav className="flex-1 flex flex-col bg-white dark:bg-gray-900/70 p-4 rounded-lg shadow-inner min-h-0">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300 font-display border-b pb-2 dark:border-gray-700">Contenu du cours</h2>
                    
                    <div className="relative mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher un sujet..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400"
                            aria-label="Rechercher un sujet de cours"
                        />
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    </div>

                    <ul className="space-y-2 overflow-y-auto">
                        {filteredTopics.map(topic => (
                            <li key={topic.id}>
                                <button
                                    onClick={() => onSelectTopic(topic.id)}
                                    className={`w-full text-left p-3 rounded-md flex items-center transition-colors duration-200 ${
                                        selectedTopicId === topic.id ? 'bg-secondary text-dark font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <TopicIcon type={topic.type} />
                                    {topic.title}
                                </button>
                            </li>
                        ))}
                        {filteredTopics.length === 0 && searchQuery && (
                            <li className="p-3 text-center text-gray-500 dark:text-gray-400">
                                Aucun sujet trouvé pour "{searchQuery}".
                            </li>
                        )}
                         {selectedLevel === 'BAC' && (
                            <li>
                                <button
                                    onClick={onShowExams}
                                    className={`w-full text-left p-3 rounded-md flex items-center transition-colors duration-200 ${
                                        selectedTopicId === 'bac-exams' ? 'bg-secondary text-dark font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                                >
                                    <ArchiveIcon className="h-5 w-5 mr-3 text-primary dark:text-blue-400" />
                                    Annales du Bac
                                </button>
                            </li>

                        )}
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Difficulté de l'exercice IA :
                            </label>
                            <div className="flex justify-between rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
                                {difficulties.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => onSelectDifficulty(d)}
                                        className={`w-full py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-900 ${
                                            selectedDifficulty === d
                                                ? 'bg-primary text-white shadow'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button
                            onClick={onGenerateExercise}
                            disabled={isGenerating}
                            className="w-full flex items-center justify-center p-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            <GemIcon className="h-5 w-5 mr-2" />
                            {isGenerating ? 'Génération en cours...' : 'Générer un exercice (IA)'}
                        </button>
                    </div>
                </nav>
            )}

            <footer className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-700 space-y-4">
                {currentUser ? (
                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-900/50 flex items-center justify-between">
                        <div className="flex items-center space-x-3 overflow-hidden">
                            <UserCircleIcon className="h-8 w-8 text-primary dark:text-blue-400 flex-shrink-0" />
                            <span className="text-sm font-medium truncate">{currentUser.email}</span>
                        </div>
                        <button 
                            onClick={logout} 
                            title="Déconnexion"
                            className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                            <LogoutIcon className="h-5 w-5" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={onOpenAuthModal}
                        className="w-full flex items-center justify-center p-3 rounded-lg bg-primary/10 dark:bg-blue-400/10 text-primary dark:text-blue-400 font-bold hover:bg-primary/20 dark:hover:bg-blue-400/20 transition-colors"
                    >
                         <UserCircleIcon className="h-5 w-5 mr-2" />
                        Connexion / Inscription
                    </button>
                )}

                 <button 
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-center space-x-2 p-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-dark dark:text-light hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                >
                    {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                    <span className="font-semibold text-sm">{theme === 'light' ? 'Mode Sombre' : 'Mode Clair'}</span>
                </button>
                <div className="text-center pt-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Créé par</p>
                    <p className="font-signature text-2xl text-primary dark:text-blue-400">Selma Chaalali</p>
                </div>
            </footer>
        </aside>
    );
};