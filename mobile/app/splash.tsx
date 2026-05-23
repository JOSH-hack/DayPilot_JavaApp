import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    Easing,
    interpolate,
    Extrapolation,
    SharedValue
} from 'react-native-reanimated'
import { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../constants/colors'
import Gouvernail from '../assets/images/icones/gouvernail.svg'


function LetterComponent({ 
  letter, 
  index, 
  letterCount 
}: { 
  letter: string
  index: number
  letterCount: SharedValue<number> 
}) {
  const style = useAnimatedStyle(() => ({
    opacity: letterCount.value > index ? 1 : 0,
  }))

  return (
    <Animated.Text style={[styles.text, style]}>
      {letter}
    </Animated.Text>
  )
}

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const rotation = useSharedValue(0)      // pour le gouvernail
    const progress = useSharedValue(0)      // pour la barre
    const letterCount = useSharedValue(0)   // pour le texte
    const letters = 'DAYPILOT'.split('')
    const BAR_WIDTH = Dimensions.get('window').width * 0.6

    // Animations des styles
    const rotationStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotation.value}deg` }],
    }))

    const progressStyle = useAnimatedStyle(() => ({
        width: interpolate(progress.value, [0, 1], [0, BAR_WIDTH], Extrapolation.CLAMP),
    }))

    useEffect(() => {
        // Lancer les animations
        rotation.value = withRepeat(
            withTiming(360, { duration: 2000 }),
            -1
        )

        progress.value = withTiming(1, { duration: 3000 })

        letterCount.value = withTiming(8, {
            duration: 2500,
            easing: Easing.linear
        })

        // Appeler onFinish après 3s
        const timer = setTimeout(() => onFinish(), 3000)

        return () => clearTimeout(timer)
    }, [])

    return (
        <View style={styles.container}>
            {/* Gouvernail animé */}
            <Animated.View style={rotationStyle}>
                <Gouvernail width={200} height={200} />
            </Animated.View>

            {/* Barre de progression */}
            <View style={styles.progressBarContainer}>
                <Animated.View style={[styles.progressBar, progressStyle]} />
            </View>

            {/* Texte "DAYPILOT" */}
            <View style={styles.textContainer}>
                {letters.map((letter, index) => (
                 <LetterComponent key={index} letter={letter} index={index} letterCount={letterCount} />
              ))}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bgPrincipal,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    wheelContainer: {
        width: 200,
        height: 200,
        marginBottom: 60,
    },
    progressBarContainer: {
        width: '60%',
        height: 4,
        backgroundColor: Colors.bgCard,
        borderRadius: 2,
        marginBottom: 60,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.progressionDebut,
        borderRadius: 2,
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.textPrincipal,
        letterSpacing: 3,
        fontFamily: 'JimNightshade',
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: 40,
},
})