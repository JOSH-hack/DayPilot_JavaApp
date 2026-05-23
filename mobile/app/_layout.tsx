import { useEffect } from 'react'
import { Stack } from 'expo-router'
import useAuthStore from '../store/authStore'
import { useState } from 'react'
import SplashScreen from './splash'

export default function RootLayout() {
  //Tous les hooks d'abord
  const { restoreSession } = useAuthStore()
  const [showSplash, setShowSplash] = useState(true)

  //useEffect après les hooks
  useEffect(() => {
    restoreSession()
  }, [])

  //Returns conditionnels ensuite
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  )
}
