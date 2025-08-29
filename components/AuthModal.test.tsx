import React from 'react';
// Fix: Import Jest globals to make them available in the test file.
import { describe, it, expect, jest, beforeEach } from '@jest/globals';
// Fix: Import 'screen' and 'waitFor' from '@testing-library/dom' to resolve module export errors.
import { render } from '@testing-library/react';
import { screen, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { AuthModal } from './AuthModal';
import { AuthProvider } from '../contexts/AuthContext';
import { authService } from '../services/authService';
import '@testing-library/jest-dom';

// Mock the authService to control its behavior in tests
jest.mock('../services/authService');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

// A custom wrapper to provide the necessary context for the component
const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <AuthProvider>
            {ui}
        </AuthProvider>
    );
};

describe('AuthModal', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
        // Mock the session check
        mockedAuthService.getCurrentUser.mockReturnValue(null);
    });

    it('ne doit pas s\'afficher lorsque isOpen est faux', () => {
        renderWithProviders(<AuthModal isOpen={false} onClose={() => {}} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('doit afficher le formulaire de connexion par défaut', () => {
        renderWithProviders(<AuthModal isOpen={true} onClose={() => {}} />);
        expect(screen.getByRole('heading', { name: /connexion/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /se connecter/i })).toBeInTheDocument();
    });

    it('doit passer au formulaire d\'inscription lorsque l\'onglet d\'inscription est cliqué', async () => {
        const user = userEvent.setup();
        renderWithProviders(<AuthModal isOpen={true} onClose={() => {}} />);
        
        const signupTab = screen.getByRole('button', { name: /inscription/i });
        await user.click(signupTab);

        expect(screen.getByRole('heading', { name: /inscription/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
    });

    it('doit appeler la fonction de connexion lors de la soumission en mode connexion', async () => {
        const user = userEvent.setup();
        const handleClose = jest.fn();
        mockedAuthService.login.mockResolvedValue({ id: '1', email: 'test@test.com' });
        
        renderWithProviders(<AuthModal isOpen={true} onClose={handleClose} />);
        
        await user.type(screen.getByLabelText(/email/i), 'test@test.com');
        await user.type(screen.getByLabelText(/mot de passe/i), 'password123');
        await user.click(screen.getByRole('button', { name: /se connecter/i }));

        await waitFor(() => {
            expect(mockedAuthService.login).toHaveBeenCalledWith('test@test.com', 'password123');
        });
        await waitFor(() => {
            expect(handleClose).toHaveBeenCalledTimes(1);
        });
    });

    it('doit appeler la fonction d\'inscription lors de la soumission en mode inscription', async () => {
        const user = userEvent.setup();
        const handleClose = jest.fn();
        mockedAuthService.signup.mockResolvedValue({ id: '1', email: 'new@test.com' });

        renderWithProviders(<AuthModal isOpen={true} onClose={handleClose} />);

        await user.click(screen.getByRole('button', { name: /inscription/i }));

        await user.type(screen.getByLabelText(/email/i), 'new@test.com');
        await user.type(screen.getByLabelText(/mot de passe/i), 'password123');
        await user.click(screen.getByRole('button', { name: /s'inscrire/i }));
        
        await waitFor(() => {
            expect(mockedAuthService.signup).toHaveBeenCalledWith('new@test.com', 'password123');
        });
        await waitFor(() => {
            expect(handleClose).toHaveBeenCalledTimes(1);
        });
    });

    it('doit afficher un message d\'erreur en cas d\'échec de la connexion', async () => {
        const user = userEvent.setup();
        const errorMessage = 'Email ou mot de passe invalide.';
        mockedAuthService.login.mockRejectedValue(new Error(errorMessage));

        renderWithProviders(<AuthModal isOpen={true} onClose={() => {}} />);
        
        await user.type(screen.getByLabelText(/email/i), 'wrong@test.com');
        await user.type(screen.getByLabelText(/mot de passe/i), 'wrongpassword');
        await user.click(screen.getByRole('button', { name: /se connecter/i }));
        
        expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    });
});