
import React from 'react';
import type { Topic, View, TopicFilter, Level } from '../types';
import { Lesson } from './Lesson';
import { Exercise } from './Exercise';
import { ListeningExercise } from './ListeningExercise';
import { LoadingSpinner } from './LoadingSpinner';
import { AcademicCapIcon, BookOpenIcon, DocumentTextIcon, MenuIcon, SpeakerWaveIcon, CollectionIcon, ArchiveIcon } from './Icons';
import { Tabs, TabList, Tab, TabContent } from './Tabs';
import { BacExams } from './BacExams';

interface MainContentProps {
    topic: Topic | null;
    isLoading: boolean;
    error: string | null;
    view: View;
    onMenuClick: () => void;
    selectedLevel: Level | null;
    topicFilter: TopicFilter;
    onTopicFilterChange: (filter: TopicFilter) => void;
    onShowExams: () => void;
}

export const MainContent: React.FC<MainContentProps> = ({ 
    topic, 
    isLoading, 
    error, 
    view, 
    onMenuClick,
    selectedLevel,
    topicFilter,
    onTopicFilterChange,
    onShowExams
}) => {
    
    const WelcomeScreen: React.FC = () => (
        <div className="flex flex-col items-center justify-center h-full text-center bg-white dark:bg-gray-800 p-6 sm:p-12 rounded-2xl shadow-lg">
            <AcademicCapIcon className="h-16 sm:h-24 w-16 sm:w-24 text-primary dark:text-blue-400 mb-6" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-dark dark:text-light font-display mb-4">Bienvenue !</h2>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Sélectionnez un niveau dans le menu pour commencer votre apprentissage.
            </p>
        </div>
    );

    const TopicIcon: React.FC<{ type: 'lesson' | 'exercise' | 'listening_exercise' }> = ({ type }) => {
        const className = "h-5 w-5 mr-2";
        if (type === 'lesson') return <BookOpenIcon className={className} />;
        if (type === 'listening_exercise') return <SpeakerWaveIcon className={className} />;
        return <DocumentTextIcon className={className} />;
    };

    let mobileTitle = "Espagnol Facile";
    if (view === 'exams') {
        mobileTitle = "Annales du Bac";
    } else if (topic) {
        mobileTitle = topic.title;
    }

    const NavButton: React.FC<{
        label: string;
        icon: React.ReactNode;
        isActive: boolean;
        onClick: () => void;
    }> = ({ label, icon, isActive, onClick }) => (
        <button 
            onClick={onClick} 
            className={`flex flex-col items-center justify-center space-y-1 w-full h-full text-sm font-medium transition-colors ${
                isActive ? 'text-primary dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400'
            }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
    
    return (
        <div className="flex-1 flex flex-col min-w-0 h-screen lg:h-auto">
            {/* Mobile Header */}
            <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 z-10">
                <button onClick={onMenuClick} className="p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400" aria-label="Ouvrir le menu">
                    <MenuIcon className="h-6 w-6"/>
                </button>
                 <h2 className="text-lg font-bold text-primary dark:text-blue-400 truncate mx-2">
                    {mobileTitle}
                </h2>
                <div className="w-6 h-6"></div>
            </header>
            
            <main className="flex-1 p-4 sm:p-6 lg:p-12 overflow-y-auto pb-20 lg:pb-12">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-primary dark:text-blue-400">
                        <LoadingSpinner />
                        <p className="text-lg sm:text-xl mt-4 font-semibold">Génération de votre exercice personnalisé...</p>
                    </div>
                )}
                
                {error && (
                     <div className="flex items-center justify-center h-full text-center bg-red-50 dark:bg-red-900/40 p-4 sm:p-8 rounded-2xl border-2 border-red-200 dark:border-red-500/30">
                         <p className="text-lg sm:text-xl text-accent dark:text-red-400 font-semibold">{error}</p>
                     </div>
                )}

                {!isLoading && !error && view === 'topic' && !topic && <WelcomeScreen />}
                
                {!isLoading && !error && ( (view === 'topic' && topic) || view === 'exams') && (
                     <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg h-full flex flex-col">
                        {view === 'exams' && <BacExams />}
                        {view === 'topic' && topic && (
                            <Tabs key={topic.id} defaultTab={topic.id}>
                                <TabList aria-label="Contenu du cours">
                                    <Tab id={topic.id}>
                                        <TopicIcon type={topic.type} />
                                        {topic.title}
                                    </Tab>
                                </TabList>
                                
                                <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 md:p-8">
                                     <TabContent id={topic.id}>
                                        {topic.type === 'lesson' && <Lesson data={topic.content as any} />}
                                        {topic.type === 'exercise' && <Exercise data={topic.content as any} />}
                                        {topic.type === 'listening_exercise' && <ListeningExercise data={topic.content as any} />}
                                    </TabContent>
                                </div>
                            </Tabs>
                        )}
                    </div>
                )}
            </main>
             {/* Mobile Bottom Navigation */}
             {selectedLevel && (
                <footer className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-t-lg z-10">
                    <nav className="flex justify-around items-center h-16">
                        <NavButton 
                            label="Tout" 
                            icon={<CollectionIcon className="h-6 w-6"/>}
                            isActive={topicFilter === 'all' && view === 'topic'}
                            onClick={() => onTopicFilterChange('all')}
                        />
                         <NavButton 
                            label="Leçons" 
                            icon={<BookOpenIcon className="h-6 w-6"/>}
                            isActive={topicFilter === 'lessons' && view === 'topic'}
                            onClick={() => onTopicFilterChange('lessons')}
                        />
                         <NavButton 
                            label="Exercices" 
                            icon={<DocumentTextIcon className="h-6 w-6"/>}
                            isActive={topicFilter === 'exercises' && view === 'topic'}
                            onClick={() => onTopicFilterChange('exercises')}
                        />
                        {selectedLevel === 'BAC' && (
                            <NavButton
                                label="Annales"
                                icon={<ArchiveIcon className="h-6 w-6" />}
                                isActive={view === 'exams'}
                                onClick={onShowExams}
                            />
                        )}
                    </nav>
                </footer>
            )}
        </div>
    );
};