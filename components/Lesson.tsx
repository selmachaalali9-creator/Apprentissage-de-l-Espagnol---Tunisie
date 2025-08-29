
import React, { useState } from 'react';
import type { LessonData } from '../types';
// Fix: The 'PlayCircleIcon' component was not exported from './Icons'. Replaced it with 'SpeakerWaveIcon' for consistency with other audio components.
import { BookOpenIcon, SpeakerWaveIcon } from './Icons';

interface LessonProps {
    data: LessonData;
}

export const Lesson: React.FC<LessonProps> = ({ data }) => {
    const [showTranscription, setShowTranscription] = useState(false);

    return (
        <div className="prose dark:prose-invert max-w-none prose-h1:font-display prose-h2:font-display">
            <header className="mb-8 border-b-2 border-primary dark:border-blue-400 pb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-blue-400 flex items-center not-prose">
                    <BookOpenIcon className="h-8 w-8 md:h-10 md:w-10 mr-3 md:mr-4"/>
                    <span>{data.title}</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 not-prose">{data.introduction}</p>
            </header>

            {data.audioSrc && (
                 <section className="not-prose bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-display flex items-center mb-3">
                        <SpeakerWaveIcon className="h-6 w-6 mr-2 text-primary dark:text-blue-400" />
                        Écouter la leçon
                    </h3>
                    <audio controls className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-blue-400 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800/50">
                        <source src={data.audioSrc} type="audio/mpeg" />
                        Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                    {data.audioTranscription && (
                        <div className="mt-4">
                            <button 
                                onClick={() => setShowTranscription(!showTranscription)}
                                className="text-sm font-semibold text-primary dark:text-blue-400 hover:underline mb-2"
                            >
                                {showTranscription ? 'Cacher la transcription' : 'Afficher la transcription'}
                            </button>
                            {showTranscription && (
                                <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-md">
                                    <pre className="whitespace-pre-wrap font-sans text-sm text-gray-600 dark:text-gray-400">{data.audioTranscription.trim()}</pre>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            )}


            <div className="space-y-8">
                {data.sections.map((section, index) => (
                    <section key={index} className="not-prose bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 font-display mb-3 not-prose">{section.title}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
                        {section.examples && section.examples.length > 0 && (
                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-600 dark:text-gray-400 not-prose">Exemples :</h3>
                                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-800 dark:text-gray-200">
                                    {section.examples.map((example, i) => (
                                        <li key={i} className="italic bg-yellow-50 dark:bg-amber-900/30 p-2 rounded-md border-l-4 border-secondary dark:border-secondary">{example}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
};
