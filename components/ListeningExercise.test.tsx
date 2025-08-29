import React from 'react';
import { describe, it, expect } from '@jest/globals';
// Fix: Import 'screen' from '@testing-library/dom' to resolve module export errors.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ListeningExercise } from './ListeningExercise';
import type { ListeningExerciseData } from '../types';

const mockListeningData: ListeningExerciseData = {
    title: 'Compréhension Orale: Au Marché',
    audioSrc: 'https://example.com/marche.mp3',
    transcription: 'Vendedor: ¡Buenos días! ¿Qué le pongo?',
    questions: [
        {
            id: 'lq1',
            type: 'mcq',
            question: 'Où a lieu la conversation ?',
            options: ['Au marché', 'À la banque'],
            answer: 'Au marché',
            explanation: 'Ils parlent de fruits et légumes.'
        },
        {
            id: 'lq2',
            type: 'fill-in-the-blank',
            question: 'Le vendeur dit "¡Buenos ____!"',
            answer: 'días',
            explanation: 'C\'est une salutation courante le matin.'
        }
    ]
};

describe('ListeningExercise', () => {
    it('affiche le titre et le lecteur audio', () => {
        render(<ListeningExercise data={mockListeningData} />);
        expect(screen.getByRole('heading', { name: /compréhension orale: au marché/i })).toBeInTheDocument();
        const audioPlayer = screen.getByRole('audio', { hidden: true }); // JSDOM doesn't render audio, so we look for the element
        expect(audioPlayer).toBeInTheDocument();
        expect(audioPlayer.querySelector('source')).toHaveAttribute('src', mockListeningData.audioSrc);
    });

    it('affiche et masque la transcription au clic du bouton', async () => {
        const user = userEvent.setup();
        render(<ListeningExercise data={mockListeningData} />);

        const toggleButton = screen.getByRole('button', { name: /afficher la transcription/i });
        
        // La transcription est initialement masquée
        expect(screen.queryByText(mockListeningData.transcription)).not.toBeInTheDocument();

        // Cliquer pour afficher
        await user.click(toggleButton);
        expect(await screen.findByText(mockListeningData.transcription)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cacher la transcription/i })).toBeInTheDocument();

        // Cliquer pour masquer
        await user.click(toggleButton);
        expect(screen.queryByText(mockListeningData.transcription)).not.toBeInTheDocument();
    });

    it('permet à l\'utilisateur de répondre, de soumettre et de voir le score', async () => {
        const user = userEvent.setup();
        render(<ListeningExercise data={mockListeningData} />);

        // Répondre correctement à la Q1
        await user.click(screen.getByLabelText('Au marché'));
        // Répondre correctement à la Q2
        await user.type(screen.getByPlaceholderText(/votre réponse.../i), 'días');

        // Soumettre
        await user.click(screen.getByRole('button', { name: /vérifier mes réponses/i }));

        // Vérifier le score
        expect(await screen.findByText(/score: 2 \/ 2/i)).toBeInTheDocument();
        expect(screen.getByText(/\(100%\)/i)).toBeInTheDocument();
    });

    it('affiche la rétroaction correcte et les explications après la soumission', async () => {
        const user = userEvent.setup();
        render(<ListeningExercise data={mockListeningData} />);

        // Répondre incorrectement
        await user.click(screen.getByLabelText('À la banque'));
        await user.type(screen.getByPlaceholderText(/votre réponse.../i), 'noches');

        await user.click(screen.getByRole('button', { name: /vérifier mes réponses/i }));

        // Rétroaction pour Q1 (incorrect)
        const q1Container = screen.getByText(/où a lieu la conversation \?/i).closest('div');
        expect(q1Container).toHaveClass('border-red-500');
        expect(screen.getByText('Explication : Ils parlent de fruits et légumes.')).toBeInTheDocument();

        // Rétroaction pour Q2 (incorrect)
        const q2Container = screen.getByText(/le vendeur dit "¡buenos ____!"/i).closest('div');
        expect(q2Container).toHaveClass('border-red-500');
        expect(screen.getByText('Explication : C\'est une salutation courante le matin.')).toBeInTheDocument();
    });

    it('réinitialise l\'exercice lorsque "Réessayer" est cliqué', async () => {
        const user = userEvent.setup();
        render(<ListeningExercise data={mockListeningData} />);
        
        await user.click(screen.getByLabelText('À la banque'));
        await user.click(screen.getByRole('button', { name: /vérifier mes réponses/i }));

        expect(await screen.findByText(/score: 0 \/ 2/i)).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /réessayer/i }));
        
        expect(screen.queryByText(/score: 0 \/ 2/i)).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: /vérifier mes réponses/i })).toBeInTheDocument();
        expect(screen.getByLabelText('À la banque')).not.toBeChecked();
        expect(screen.getByPlaceholderText(/votre réponse.../i)).toHaveValue('');
    });
});