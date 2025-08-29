import React from 'react';
import { describe, it, expect } from '@jest/globals';
// Fix: Import 'screen' from '@testing-library/dom' to resolve module export errors.
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Lesson } from './Lesson';
import type { LessonData } from '../types';

const mockLessonData: LessonData = {
    title: 'Le Présent de l\'Indicatif',
    introduction: 'Le présent est utilisé pour parler d\'actions habituelles.',
    audioSrc: 'https://example.com/present.mp3',
    audioTranscription: 'Ceci est la transcription audio.',
    sections: [
        {
            title: 'Verbes en -AR',
            content: 'On enlève la terminaison -ar.',
            examples: ['hablo', 'hablas', 'habla']
        },
        {
            title: 'Verbes en -ER',
            content: 'On enlève la terminaison -er.',
            examples: ['como', 'comes', 'come']
        }
    ]
};

const mockLessonDataWithoutAudio: LessonData = {
    title: 'Ser et Estar',
    introduction: 'Deux verbes pour "être".',
    sections: [
        {
            title: 'Utilisation de Ser',
            content: 'Pour les caractéristiques permanentes.',
            examples: ['Yo soy tunecino.']
        }
    ]
};


describe('Lesson', () => {
    it('affiche le titre et l\'introduction', () => {
        render(<Lesson data={mockLessonData} />);
        expect(screen.getByRole('heading', { name: /le présent de l'indicatif/i })).toBeInTheDocument();
        expect(screen.getByText(/le présent est utilisé pour parler d'actions habituelles./i)).toBeInTheDocument();
    });

    it('affiche le lecteur audio et la transcription s\'ils sont fournis', () => {
        render(<Lesson data={mockLessonData} />);
        const audioPlayer = screen.getByRole('region', { name: /écouter la leçon/i });
        expect(audioPlayer).toBeInTheDocument();
        const audioElement = audioPlayer.querySelector('audio');
        expect(audioElement).toBeInTheDocument();
        expect(audioElement?.querySelector('source')).toHaveAttribute('src', mockLessonData.audioSrc);
        expect(screen.getByText('Ceci est la transcription audio.')).toBeInTheDocument();
    });

    it('n\'affiche pas le lecteur audio si audioSrc n\'est pas fourni', () => {
        render(<Lesson data={mockLessonDataWithoutAudio} />);
        expect(screen.queryByRole('region', { name: /écouter la leçon/i })).not.toBeInTheDocument();
    });

    it('affiche les sections avec titres, contenu et exemples', () => {
        render(<Lesson data={mockLessonData} />);
        
        // Section 1
        expect(screen.getByRole('heading', { name: /verbes en -ar/i })).toBeInTheDocument();
        expect(screen.getByText('On enlève la terminaison -ar.')).toBeInTheDocument();
        expect(screen.getByText('hablo')).toBeInTheDocument();
        expect(screen.getByText('hablas')).toBeInTheDocument();

        // Section 2
        expect(screen.getByRole('heading', { name: /verbes en -er/i })).toBeInTheDocument();
        expect(screen.getByText('On enlève la terminaison -er.')).toBeInTheDocument();
        expect(screen.getByText('como')).toBeInTheDocument();
        expect(screen.getByText('comes')).toBeInTheDocument();
    });
});