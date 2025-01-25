import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import LottieView from 'lottie-react-native';

const WelcomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const scaleAnim = useRef(
    Array.from({ length: 4 }, () => new Animated.Value(0.8))
  ).current;

  const rotateAnim = useRef(
    Array.from({ length: 4 }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      const initialAnimations = scaleAnim.map((anim, index) =>
        Animated.sequence([
          Animated.spring(anim, {
            toValue: 1,
            friction: 1,
            tension: 160,
            useNativeDriver: true,
          }),
        ])
      );
      Animated.stagger(200, initialAnimations).start(() => {
        startStrongTwistAnimation();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const startStrongTwistAnimation = () => {
    rotateAnim.forEach((anim, index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: -1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../assets/load.json')} // Fixed path
          autoPlay
          loop
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>مرحبًا بك في اللعبة</Text>

      <View style={styles.letterBoxContainer}>
        {['و', 'ر', 'د', 'ل'].map((letter, index) => (
          <Animated.View
            key={index}
            style={[
              styles.letterBox,
              styles[`box${index + 1}`],
              {
                transform: [
                  { scale: scaleAnim[index] },
                  {
                    rotate: rotateAnim[index].interpolate({
                      inputRange: [-1, 1],
                      outputRange: ['-30deg', '30deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.letterText}>{letter}</Text>
          </Animated.View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.button, styles.playButton]}
        onPress={() => navigation.navigate('GameScreen')}
      >
        <Text style={styles.buttonText}>العب</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.smallButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('RegisterScreen')}
        >
          <Text style={styles.buttonText}>تسجيل جديد</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.smallButton, styles.secondaryButton]}
          onPress={() => navigation.navigate('LoginScreen')} // Fixed navigation target
        >
          <Text style={styles.buttonText}>الدخول</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e6',
  },
  loadingAnimation: {
    width: 150,
    height: 150,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff8e6',
    padding: 20,
  },
  letterBoxContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  letterBox: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  box1: {
    backgroundColor: '#ff6f61',
  },
  box2: {
    backgroundColor: '#4CAF50',
  },
  box3: {
    backgroundColor: '#3F51B5',
  },
  box4: {
    backgroundColor: '#FFC107',
  },
  letterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '80%',
  },
  playButton: {
    backgroundColor: '#fe6100',
  },
  smallButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    width: '48%',
  },
  secondaryButton: {
    backgroundColor: '#232b6e',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
});

export default WelcomeScreen;