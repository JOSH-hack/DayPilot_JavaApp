import axios from 'axios'
import { Config } from '../constants/config'
import * as SecureStore from 'expo-secure-store'

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,  // en millisecondes — combien de temps attendre avant d'abandonner ?
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(async (config) => {
  try {
    const token = await SecureStore.getItemAsync('Config.SECURE_STORE_KEY)')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch (error) {
    console.warn('Erreur récupération JWT:', error)
  }
  return config
})

api.interceptors.response.use(
  (response) => response,  // Si succès, retourner la réponse
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await SecureStore.removeItemAsync('Config.SECURE_STORE_KEY)')
      } catch (err) {
        console.warn('Erreur suppression JWT:', err)
      }
    }
    return Promise.reject(error)
  }
)