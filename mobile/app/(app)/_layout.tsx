import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import useAuthStore from '../../store/authStore'

export default function AppLayout() {
    const { isAuthenticated, isLoading } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace('/')
        }
    }, [isLoading, isAuthenticated, router])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A1628' }}>                
                <ActivityIndicator size="large" color="#2ECC8F" />
            </View>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="dashboard" />
            <Stack.Screen name="taches" />
            <Stack.Screen name="rappels" />
            <Stack.Screen name="profil" />
            <Stack.Screen name="gamification" />
            <Stack.Screen name="widget" />
        </Stack>
    )
}
