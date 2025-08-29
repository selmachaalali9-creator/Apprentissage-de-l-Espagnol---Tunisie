
import React, { useState, useEffect } from 'react';
import type { ListeningExerciseData, Question } from '../types';
import { CheckCircleIcon, XCircleIcon, SpeakerWaveIcon, RefreshIcon, InformationCircleIcon } from './Icons';

interface ListeningExerciseProps {
    data: ListeningExerciseData;
}

export const ListeningExercise: React.FC<ListeningExerciseProps> = ({ data }) => {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [showTranscription, setShowTranscription] = useState<boolean>(false);

    useEffect(() => {
        setAnswers({});
        setIsSubmitted(false);
        setScore(0);
        setShowTranscription(false);
    }, [data]);

    const handleAnswerChange = (questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    };

    const checkIsCorrect = (question: Question, answer: string | undefined): boolean => {
        if (answer === undefined) return false;
        const userAnswer = answer.trim().toLowerCase();
        const correctAnswer = Array.isArray(question.answer) ? question.answer.map(a => a.toLowerCase()) : question.answer.toLowerCase();
        
        if (Array.isArray(correctAnswer)) {
            return correctAnswer.includes(userAnswer);
        } else {
            return userAnswer === correctAnswer;
        }
    };

    const handleSubmit = () => {
        let currentScore = 0;
        data.questions.forEach(q => {
            if (checkIsCorrect(q, answers[q.id])) {
                currentScore++;
            }
        });
        setScore(currentScore);
        setIsSubmitted(true);
    };

    const handleRetry = () => {
        setAnswers({});
        setIsSubmitted(false);
        setScore(0);
    };

    const getValidationClass = (question: Question): string => {
        if (!isSubmitted) return 'border-gray-300 dark:border-gray-600';
        return checkIsCorrect(question, answers[question.id]) ? 'border-green-500 bg-green-50 dark:border-green-500 dark:bg-green-900/40' : 'border-red-500 bg-red-50 dark:border-red-500 dark:bg-red-900/40';
    };

    const percentage = data.questions.length > 0 ? Math.round((score / data.questions.length) * 100) : 0;

    return (
        <div>
            <header className="mb-8 border-b-2 border-primary dark:border-blue-400 pb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-primary dark:text-blue-400 font-display flex items-center">
                    <SpeakerWaveIcon className="h-8 w-8 md:h-10 md:w-10 mr-3 md:mr-4"/>
                    {data.title}
                </h1>
            </header>

            <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Écoutez l'audio et répondez aux questions :</p>
                    <audio controls className="w-full">
                        <source src={data.audioSrc} type="audio/mpeg" />
                        Votre navigateur ne supporte pas l'élément audio.
                    </audio>
                </div>
                
                <button 
                    onClick={() => setShowTranscription(!showTranscription)}
                    className="text-sm font-semibold text-primary dark:text-blue-400 hover:underline"
                >
                    {showTranscription ? 'Cacher la transcription' : 'Afficher la transcription'}
                </button>

                {showTranscription && (
                    <div className="p-4 bg-yellow-50 dark:bg-amber-900/30 border-l-4 border-secondary dark:border-secondary rounded-md prose prose-sm dark:prose-invert max-w-none">
                        <h4 className="font-bold not-prose">Transcription</h4>
                        <pre className="whitespace-pre-wrap font-sans text-sm bg-transparent p-0">{data.transcription.trim()}</pre>
                    </div>
                )}


                {data.questions.map((q, index) => {
                    const isCorrect = isSubmitted && checkIsCorrect(q, answers[q.id]);
                    const isIncorrect = isSubmitted && !isCorrect;

                    return (
                        <div key={q.id} className={`p-4 sm:p-6 rounded-xl border-2 transition-colors ${getValidationClass(q)}`}>
                            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-4">{index + 1}. {q.question}</p>
                            {q.type === 'mcq' && q.options && (
                                <div className="space-y-2">
                                    {q.options.map(option => (
                                        <label key={option} className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                            <input
                                                type="radio"
                                                name={q.id}
                                                value={option}
                                                checked={answers[q.id] === option}
                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                disabled={isSubmitted}
                                                className="h-5 w-5 text-primary focus:ring-primary dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800 disabled:opacity-50"
                                            />
                                            <span className="ml-3 text-gray-700 dark:text-gray-300">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            {q.type === 'fill-in-the-blank' && (
                                <input
                                    type="text"
                                    value={answers[q.id] || ''}
                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                    disabled={isSubmitted}
                                    className="mt-2 block w-full md:w-1/2 p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:focus:ring-blue-400 dark:focus:border-blue-400 disabled:bg-gray-100 dark:disabled:bg-gray-600 disabled:opacity-50"
                                    placeholder="Votre réponse..."
                                />
                            )}
                            {isSubmitted && (
                                <div className="mt-4 space-y-3">
                                    <div className="p-3 rounded-md text-sm flex items-center bg-gray-100 dark:bg-gray-700">
                                        {isCorrect ? 
                                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2"/> : 
                                            <XCircleIcon className="h-5 w-5 text-red-600 mr-2"/>
                                        }
                                        <span className="font-semibold">Réponse correcte :</span>
                                        <span className="ml-2 italic">{Array.isArray(q.answer) ? q.answer.join(' / ') : q.answer}</span>
                                    </div>
                                    {isIncorrect && q.explanation && (
                                        <div className="p-4 rounded-md flex items-start bg-yellow-50 dark:bg-yellow-900/40 border-l-4 border-yellow-400 dark:border-yellow-500 text-yellow-800 dark:text-yellow-200">
                                            <InformationCircleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <h4 className="font-bold">Explication :</h4>
                                                <p className="mt-1 leading-relaxed">{q.explanation}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                {!isSubmitted ? (
                    <button
                        onClick={handleSubmit}
                        className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all transform hover:scale-105"
                    >
                        Vérifier mes réponses
                    </button>
                ) : (
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-lg sm:text-xl font-bold bg-secondary text-dark px-4 py-3 rounded-lg shadow-md flex items-baseline w-full sm:w-auto justify-center">
                            <span>Score: {score} / {data.questions.length}</span>
                            <span className="ml-3 sm:ml-4 text-base sm:text-lg font-semibold opacity-80">({percentage}%)</span>
                        </div>
                        <button
                            onClick={handleRetry}
                            className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-400 transition-all transform hover:scale-105"
                        >
                            <RefreshIcon className="h-5 w-5 mr-2" />
                            Réessayer
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};