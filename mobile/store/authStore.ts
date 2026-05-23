import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Config } from '../constants/config';

export interface User {
    id_utilisateur: number, 
    nom: string,
    email: string,
    theme_prefere?: 'clair' | 'sombre' | 'auto' | null,
    photo_url?: string,
}

interface AuthState {
    // État
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;

    // Actions
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
    // État initial
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,

    // Actions
    login: async (token: string, user: User) => {
        try {
            // Sauvegarder le token dans SecureStore
            await SecureStore.setItemAsync(Config.SECURE_STORE_KEY, token);
            // Mettre à jour le state
            set({
                token,
                user,
                isAuthenticated: true,
                isLoading: false,
            });
        } catch (error) {
            console.error('Erreur lors de la sauvegarde du token:', error);
            set({ isLoading: false });
        }
    },

    logout: async () => {
        try {
            // Supprimer le token de SecureStore
            await SecureStore.deleteItemAsync(Config.SECURE_STORE_KEY);
            // Remettre l'état à zéro
            set({
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            });
        } catch (error) {
            console.error('Erreur lors de la suppression du token:', error);
        }
    },

    restoreSession: async () => {
        try {
            // Vérifier si un JWT existe déjà dans SecureStore
            const savedToken = await SecureStore.getItemAsync(Config.SECURE_STORE_KEY);
            if (savedToken) {
                set({
                    token: savedToken,
                    isAuthenticated: true,
                    isLoading: false,
                });
                // TODO: Récupérer les données utilisateur depuis l'API si nécessaire
            } else {
                set({
                    token: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            }
        } catch (error) {
            console.error('Erreur lors de la restauration de la session:', error);
            set({
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        }
    },
}));

export default useAuthStore;