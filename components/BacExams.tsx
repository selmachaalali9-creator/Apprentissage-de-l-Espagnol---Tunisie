
import React from 'react';
import { bacExamsData } from '../data/examData';
import { ArchiveIcon, FilePdfIcon, FileWordIcon } from './Icons';

export const BacExams: React.FC = () => {

    const handleDownload = (fileType: 'PDF' | 'Word', year: number, session: string) => {
        alert(`Le téléchargement du fichier ${fileType} pour la ${session} de ${year} sera bientôt disponible !`);
    };

    const DownloadButton: React.FC<{ type: 'PDF' | 'Word', year: number, session: string }> = ({ type, year, session }) => {
        const isPdf = type === 'PDF';
        const Icon = isPdf ? FilePdfIcon : FileWordIcon;
        const bgColor = isPdf ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700';
        const textColor = 'text-white';

        return (
            <button
                onClick={() => handleDownload(type, year, session)}
                className={`flex-1 flex items-center justify-center p-3 rounded-md font-semibold transition-all duration-200 transform hover:scale-105 ${bgColor} ${textColor}`}
            >
                <Icon className="h-5 w-5 mr-2" />
                Sujet {type}
            </button>
        );
    };

    return (
        <>
            <header className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary dark:text-blue-400 font-display flex items-center">
                    <ArchiveIcon className="h-8 w-8 sm:h-10 sm:w-10 mr-3 sm:mr-4"/>
                    Annales du Baccalauréat
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mt-2">Téléchargez les sujets des années précédentes pour vous entraîner.</p>
            </header>
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-8">
                {bacExamsData.map(examYear => (
                    <section key={examYear.year} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 font-display mb-4">Année {examYear.year}</h2>
                        <div className="space-y-4">
                            {examYear.sessions.map(session => (
                                <div key={session.name} className="bg-white dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600 flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
                                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{session.name}</h3>
                                    <div className="w-full sm:w-auto flex items-center space-x-3">
                                        <DownloadButton type="PDF" year={examYear.year} session={session.name} />
                                        <DownloadButton type="Word" year={examYear.year} session={session.name} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </>
    );
};
