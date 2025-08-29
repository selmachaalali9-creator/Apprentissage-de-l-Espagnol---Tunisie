
import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import type { Topic, Level, Difficulty, View, TopicFilter } from './types';
import { courseData } from './data/courseData';
import { generateExercise } from './services/geminiService';
import { AuthModal } from './components/AuthModal';

const App: React.FC = () => {
    const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
    const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
    const [generatedExercise, setGeneratedExercise] = useState<Topic | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [difficulty, setDifficulty] = useState<Difficulty>('Moyen');
    const [view, setView] = useState<View>('topic');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = window.localStorage.getItem('theme');
            if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const handleLevelSelect = (level: Level) => {
        setSelectedLevel(level);
        setSelectedTopicId(null);
        setGeneratedExercise(null);
        setView('topic');
        setTopicFilter('all');
        setIsSidebarOpen(false); // Close on mobile
    };

    const handleTopicSelect = (topicId: string) => {
        setSelectedTopicId(topicId);
        setGeneratedExercise(null);
        setView('topic');
        // Don't reset filter here to keep the user's filtered view
        setIsSidebarOpen(false); // Close on mobile
    };
    
    const handleShowExams = () => {
        setSelectedTopicId('bac-exams');
        setGeneratedExercise(null);
        setView('exams');
        setTopicFilter('all'); // Reset filter when showing exams
        setIsSidebarOpen(false); // Close on mobile
    };

    const handleTopicFilterChange = (filter: TopicFilter) => {
        setTopicFilter(filter);
        if (view === 'exams') {
           setView('topic');
           setSelectedTopicId(null);
        }
        // On mobile, opening the sidebar shows the filtered list
        setIsSidebarOpen(true);
    };

    const handleGenerateExercise = async () => {
        if (!selectedLevel) return;
        
        setIsSidebarOpen(false); // Close on mobile
        const topicsForLevel = courseData[selectedLevel].map(t => t.title).join(', ');
        const promptTopic = `un des sujets suivants: ${topicsForLevel}`;

        setIsLoading(true);
        setError(null);
        setGeneratedExercise(null);
        setSelectedTopicId('generated-exercise');
        setView('topic');
        
        try {
            const exerciseData = await generateExercise(promptTopic, selectedLevel === '3A' ? '3ème Année' : 'Baccalauréat', difficulty);
            const newExercise: Topic = {
                id: `gen-${Date.now()}`,
                title: `${exerciseData.title} (${difficulty})`,
                type: 'exercise',
                content: exerciseData,
            };
            setGeneratedExercise(newExercise);
        } catch (err) {
            setError('Une erreur est survenue lors de la génération de l\'exercice. Veuillez réessayer.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };


    const selectedTopic = useMemo(() => {
        if (selectedTopicId === 'generated-exercise') {
            return generatedExercise;
        }
        if (!selectedLevel || !selectedTopicId || selectedTopicId === 'bac-exams') return null;
        return courseData[selectedLevel].find(topic => topic.id === selectedTopicId) || null;
    }, [selectedLevel, selectedTopicId, generatedExercise]);

    return (
        <>
            <div className="relative min-h-screen lg:flex font-sans">
                 {/* Overlay for mobile */}
                {isSidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-hidden="true"
                    ></div>
                )}
                <Sidebar
                    selectedLevel={selectedLevel}
                    selectedTopicId={selectedTopicId}
                    onSelectLevel={handleLevelSelect}
                    onSelectTopic={handleTopicSelect}
                    onShowExams={handleShowExams}
                    onGenerateExercise={handleGenerateExercise}
                    isGenerating={isLoading}
                    selectedDifficulty={difficulty}
                    onSelectDifficulty={setDifficulty}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    topicFilter={topicFilter}
                    theme={theme}
                    toggleTheme={toggleTheme}
                    onOpenAuthModal={() => setIsAuthModalOpen(true)}
                />
                <MainContent 
                    topic={selectedTopic} 
                    isLoading={isLoading} 
                    error={error} 
                    view={view}
                    onMenuClick={() => setIsSidebarOpen(true)}
                    selectedLevel={selectedLevel}
                    topicFilter={topicFilter}
                    onTopicFilterChange={handleTopicFilterChange}
                    onShowExams={handleShowExams}
                />
            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        </>
    );
};

export default App;