import React from 'react';
// Fix: Import Jest globals to make them available in the test file.
import { describe, it, expect } from '@jest/globals';
// Fix: Import 'screen' from '@testing-library/dom' to resolve module export errors.
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Exercise } from './Exercise';
import type { ExerciseData } from '../types';

const mockExerciseData: ExerciseData = {
    title: 'Test Exercise',
    questions: [
        {
            id: 'q1',
            type: 'mcq',
            question: 'Quelle est la couleur du ciel ?',
            options: ['Bleu', 'Vert', 'Rouge'],
            answer: 'Bleu',
            explanation: 'Le ciel est bleu à cause de la diffusion de la lumière du soleil.'
        },
        {
            id: 'q2',
            type: 'fill-in-the-blank',
            question: 'La capitale de la Tunisie est ____.',
            answer: 'Tunis',
            explanation: 'Tunis est la capitale de la Tunisie.'
        }
    ]
};

describe('Exercise', () => {
    it('affiche le titre de l\'exercice et les questions', () => {
        render(<Exercise data={mockExerciseData} />);
        expect(screen.getByRole('heading', { name: /test exercise/i })).toBeInTheDocument();
        expect(screen.getByText(/quelle est la couleur du ciel \?/i)).toBeInTheDocument();
        expect(screen.getByText(/la capitale de la tunisie est ____\./i)).toBeInTheDocument();
    });

    it('permet à l\'utilisateur de répondre aux questions et de soumettre', async () => {
        const user = userEvent.setup();
        render(<Exercise data={mockExerciseData} />);

        // Répondre à Q1 correctement
        await user.click(screen.getByLabelText('Bleu'));

        // Répondre à Q2 incorrectement
        await user.type(screen.getByPlaceholderText(/votre réponse.../i), 'Sfax');

        // Soumettre
        await user.click(screen.getByRole('button', { name: /vérifier mes réponses/i }));

        // Vérifier le score
        expect(await screen.findByText(/score: 1 \/ 2/i)).toBeInTheDocument();
        expect(screen.getByText(/\(50%\)/i)).toBeInTheDocument();
    });
    
    it('affiche les bonnes rétroactions et explications après la soumission', async () => {
        const user = userEvent.setup();
        render(<Exercise data={mockExerciseData} />);

        // Réponse correcte pour Q1
        await user.click(screen.getByLabelText('Bleu'));
        // Réponse incorrecte pour Q2
        await user.type(screen.getByPlaceholderText(/votre réponse.../i), 'Sfax');

        await user.click(screen.getByRole('button', { name: /vérifier mes réponses/i }));

        // Rétroaction pour Q1 (correct)
        const q1Container = screen.getByText(/quelle est la couleur du ciel \?/i).closest('div');
        expect(q1Container).toHaveClass('border-green-500');
        expect(screen.queryByText('Explication : Le ciel est bleu...')).not.toBeInTheDocument();
        
        // Rétroaction pour Q2 (incorrect)
        const q2Container = screen.getByText(/la capitale de la tunisie est ____\./i).closest('div');
        expect(q2Container).toHaveClass('border-red-500');
        expect(screen.getByText(/réponse correcte :/i)).toHaveTextContent('Réponse correcte : Tunis');
        expect(screen.getByText('Explication : Tunis est la capitale de la Tunisie.')).toBeInTheDocument();

        // Vérifier que les champs sont désactivés
        expect(screen.getByLabelText('Bleu')).toBeDisabled();
        expect(screen.getByPlaceholderText(/votre réponse.../i)).toBeDisabled();
    });

    it('réinitialise l\'exercice lorsque "Réessayer" est cliqué', async () => {
        const user = userEvent.setup();
        render(<Exercise data={mockExerciseData} />);

        // Répondre et soumettre
        await user.click(screen.getByLabelText('Bleu'));
        await user.click(screen.getByRole('button', { name: /vérifier mes réponses/i }));

        // Le score est visible
        expect(await screen.findByText(/score: 1 \/ 2/i)).toBeInTheDocument();
        
        // Cliquer sur réessayer
        const retryButton = screen.getByRole('button', { name: /réessayer/i });
        await user.click(retryButton);

        // Le score doit disparaître, le bouton de soumission doit réapparaître
        expect(screen.queryByText(/score: 1 \/ 2/i)).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: /vérifier mes réponses/i })).toBeInTheDocument();

        // Les champs doivent être activés et vides/décochés
        expect(screen.getByLabelText('Bleu')).toBeEnabled();
        expect(screen.getByLabelText('Bleu')).not.toBeChecked();
        expect(screen.getByPlaceholderText(/votre réponse.../i)).toBeEnabled();
        expect(screen.getByPlaceholderText(/votre réponse.../i)).toHaveValue('');
    });
});