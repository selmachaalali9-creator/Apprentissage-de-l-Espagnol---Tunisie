import React from 'react';
// Fix: Import Jest globals to make them available in the test file.
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
// Fix: Import 'screen' from '@testing-library/dom' to resolve module export errors.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { AuthProvider } from '../contexts/AuthContext';

// Mock du hook useAuth
jest.mock('../contexts/AuthContext');
const mockUseAuth = useAuth as jest.Mock;

describe('Sidebar', () => {
    const defaultProps = {
        selectedLevel: null,
        selectedTopicId: null,
        onSelectLevel: jest.fn(),
        onSelectTopic: jest.fn(),
        onShowExams: jest.fn(),
        onGenerateExercise: jest.fn(),
        isGenerating: false,
        selectedDifficulty: 'Moyen' as const,
        onSelectDifficulty: jest.fn(),
        isOpen: true,
        onClose: jest.fn(),
        topicFilter: 'all' as const,
        theme: 'light' as const,
        toggleTheme: jest.fn(),
        onOpenAuthModal: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('quand l\'utilisateur n\'est pas authentifié', () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({ currentUser: null, logout: jest.fn() });
        });

        it('affiche les boutons de niveau', () => {
            render(<Sidebar {...defaultProps} />);
            expect(screen.getByRole('button', { name: /3ème année/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /baccalauréat/i })).toBeInTheDocument();
        });

        it('affiche un bouton de connexion/inscription et appelle onOpenAuthModal au clic', async () => {
            const user = userEvent.setup();
            render(<Sidebar {...defaultProps} />);
            const loginButton = screen.getByRole('button', { name: /connexion \/ inscription/i });
            expect(loginButton).toBeInTheDocument();
            
            await user.click(loginButton);
            expect(defaultProps.onOpenAuthModal).toHaveBeenCalledTimes(1);
        });
    });

    describe('quand l\'utilisateur est authentifié', () => {
        const mockUser = { email: 'selma@test.com' };
        const mockLogout = jest.fn();
        
        beforeEach(() => {
            mockUseAuth.mockReturnValue({ currentUser: mockUser, logout: mockLogout });
        });

        it('affiche l\'email de l\'utilisateur et un bouton de déconnexion', () => {
            render(<Sidebar {...defaultProps} />);
            expect(screen.getByText('selma@test.com')).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /déconnexion/i })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: /connexion \/ inscription/i })).not.toBeInTheDocument();
        });

        it('appelle logout lorsque le bouton de déconnexion est cliqué', async () => {
            const user = userEvent.setup();
            render(<Sidebar {...defaultProps} />);
            
            const logoutButton = screen.getByRole('button', { name: /déconnexion/i });
            await user.click(logoutButton);
            
            expect(mockLogout).toHaveBeenCalledTimes(1);
        });
    });

    describe('logique d\'affichage du contenu', () => {
        beforeEach(() => {
            mockUseAuth.mockReturnValue({ currentUser: null, logout: jest.fn() });
        });
        
        it('affiche les sujets lorsqu\'un niveau est sélectionné', () => {
            render(<Sidebar {...defaultProps} selectedLevel="3A" />);
            expect(screen.getByRole('heading', { name: /contenu du cours/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /le présent de l'indicatif/i })).toBeInTheDocument();
        });

        it('affiche "Annales du Bac" uniquement pour le niveau BAC', () => {
            const { rerender } = render(<Sidebar {...defaultProps} selectedLevel="3A" />);
            expect(screen.queryByRole('button', { name: /annales du bac/i })).not.toBeInTheDocument();
            
            rerender(<Sidebar {...defaultProps} selectedLevel="BAC" />);
            expect(screen.getByRole('button', { name: /annales du bac/i })).toBeInTheDocument();
        });
        
        it('filtre les sujets en fonction de la prop topicFilter', () => {
            render(<Sidebar {...defaultProps} selectedLevel="3A" topicFilter="lessons" />);
            
            expect(screen.getByRole('button', { name: /les articles/i })).toBeInTheDocument();
            expect(screen.queryByRole('button', { name: /exercice: les articles/i })).not.toBeInTheDocument();
        });
    });
});