import { api } from './api';
import { User } from '../store/authStore';

// Envoie le token Google au backend et récupère le JWT DayPilot + profil utilisateur

export const loginWithGoogle = async (accessToken: string): Promise<{ token: string; user: User }> => {
    const response = await api.post('/auth/mobile-token', { access_token: accessToken })
    return response.data;
};

// Récupère le profil de l'utilisateur connecté depuis /api/utilisateurs/me

export const getMe = async (): Promise<User> => {
    const response = await api.get('/api/utilisateurs/me');
    return response.data;
};

// Met à jour le profil utilisateur (nom, thème, etc.)

export const updateMe = async (updates: Partial<User>): Promise<User> => {
    const response = await api.put('/api/utilisateurs/me', updates);
    return response.data;
};

//Appelle le endpoint de logout côté serveur

export const logout = async (): Promise<void> => {
    await api.post('/auth/logout', {});
};
