
import type { User } from '../types';

// This is a mock authentication service that uses localStorage.
// In a real application, this would make API calls to a backend server.

const USERS_KEY = 'espagnol_facile_users';
const SESSION_KEY = 'espagnol_facile_session';

// Helper to get users from localStorage
const getUsers = (): Record<string, User> => {
    try {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : {};
    } catch (e) {
        return {};
    }
};

// Helper to save users to localStorage
const saveUsers = (users: Record<string, User>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authService = {
    async signup(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => { // Simulate network delay
                const users = getUsers();
                if (Object.values(users).some(user => user.email === email)) {
                    return reject(new Error('Un utilisateur avec cet email existe déjà.'));
                }

                const id = `user_${Date.now()}`;
                const newUser: User = { id, email };
                // NOTE: In a real app, you would hash the password. We are not storing it here for simplicity.
                users[email] = newUser; 
                saveUsers(users);

                // Automatically log in the user after signup
                localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));

                resolve(newUser);
            }, 500);
        });
    },

    async login(email: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => { // Simulate network delay
                const users = getUsers();
                const user = users[email];
                // NOTE: In a real app, you would validate the hashed password.
                if (user) {
                    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
                    resolve(user);
                } else {
                    reject(new Error('Email ou mot de passe invalide.'));
                }
            }, 500);
        });
    },

    async logout(): Promise<void> {
        return new Promise((resolve) => {
            localStorage.removeItem(SESSION_KEY);
            resolve();
        });
    },

    getCurrentUser(): User | null {
         try {
            const session = localStorage.getItem(SESSION_KEY);
            return session ? JSON.parse(session) : null;
        } catch (e) {
            return null;
        }
    },
};
