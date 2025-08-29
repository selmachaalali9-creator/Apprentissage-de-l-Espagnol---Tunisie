import React from 'react';
// Fix: Import Jest globals to make them available in the test file.
import { describe, it, expect, jest } from '@jest/globals';
// Fix: Import 'screen' from '@testing-library/dom' to resolve module export errors.
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { MainContent } from './MainContent';
import type { Topic } from '../types';

// Mock des composants enfants pour isoler la logique de MainContent
jest.mock('./Lesson', () => ({ Lesson: ({ data }: { data: { title: string } }) => <div>Leçon: {data.title}</div> }));
jest.mock('./Exercise', () => ({ Exercise: ({ data }: { data: { title: string } }) => <div>Exercice: {data.title}</div> }));
jest.mock('./ListeningExercise', () => ({ ListeningExercise: ({ data }: { data: { title: string } }) => <div>Exercice d'écoute: {data.title}</div> }));
jest.mock('./BacExams', () => ({ BacExams: () => <div>Page des Annales du Bac</div> }));
jest.mock('./LoadingSpinner', () => ({ LoadingSpinner: () => <div>Chargement...</div> }));

describe('MainContent', () => {
    const defaultProps = {
        topic: null,
        isLoading: false,
        error: null,
        view: 'topic' as const,
        onMenuClick: jest.fn(),
        selectedLevel: null,
        topicFilter: 'all' as const,
        onTopicFilterChange: jest.fn(),
        onShowExams: jest.fn(),
    };

    it('affiche l\'écran d\'accueil lorsqu\'aucun sujet n\'est sélectionné', () => {
        render(<MainContent {...defaultProps} />);
        expect(screen.getByRole('heading', { name: /bienvenue !/i })).toBeInTheDocument();
    });

    it('affiche une leçon lorsqu\'un sujet de type leçon est fourni', () => {
        const lessonTopic: Topic = {
            id: 'lecon1',
            title: 'Leçon Test',
            type: 'lesson',
            content: { title: 'Titre de la Leçon Test', introduction: '', sections: [] }
        };
        render(<MainContent {...defaultProps} topic={lessonTopic} />);
        expect(screen.getByText('Leçon: Titre de la Leçon Test')).toBeInTheDocument();
    });

    it('affiche un exercice lorsqu\'un sujet de type exercice est fourni', () => {
        const exerciseTopic: Topic = {
            id: 'ex1',
            title: 'Exercice Test',
            type: 'exercise',
            content: { title: 'Titre de l\'Exercice Test', questions: [] }
        };
        render(<MainContent {...defaultProps} topic={exerciseTopic} />);
        expect(screen.getByText('Exercice: Titre de l\'Exercice Test')).toBeInTheDocument();
    });

    it('affiche le spinner de chargement lorsque isLoading est vrai', () => {
        render(<MainContent {...defaultProps} isLoading={true} />);
        expect(screen.getByText('Chargement...')).toBeInTheDocument();
        expect(screen.getByText(/génération de votre exercice personnalisé.../i)).toBeInTheDocument();
    });

    it('affiche un message d\'erreur lorsqu\'une erreur est fournie', () => {
        const errorMessage = 'Une erreur est survenue';
        render(<MainContent {...defaultProps} error={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
    
    it('affiche le composant BacExams lorsque la vue est "exams"', () => {
        render(<MainContent {...defaultProps} view="exams" />);
        expect(screen.getByText('Page des Annales du Bac')).toBeInTheDocument();
    });

    it('affiche la barre de navigation inférieure mobile lorsqu\'un niveau est sélectionné', () => {
        const { rerender } = render(<MainContent {...defaultProps} />);
        // Pas de navigation lorsqu'aucun niveau n'est sélectionné
        expect(screen.queryByRole('button', {name: "Tout"})).not.toBeInTheDocument();
        
        rerender(<MainContent {...defaultProps} selectedLevel="3A" />);
        expect(screen.getByRole('button', {name: "Tout"})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: "Leçons"})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: "Exercices"})).toBeInTheDocument();
    });
});